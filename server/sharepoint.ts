// SharePoint Integration for Team Performance Data
// Uses Microsoft Graph API via Replit SharePoint connector

import { Client } from '@microsoft/microsoft-graph-client';

let connectionSettings: any;

async function getAccessToken(): Promise<string> {
  if (connectionSettings && connectionSettings.settings?.expires_at && 
      new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  if (!hostname) {
    throw new Error('REPLIT_CONNECTORS_HOSTNAME not set');
  }

  const response = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=sharepoint',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  );

  const data = await response.json();
  connectionSettings = data.items?.[0];

  const accessToken = connectionSettings?.settings?.access_token || 
                      connectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('SharePoint not connected. Please set up the SharePoint integration.');
  }
  
  return accessToken;
}

export async function getSharePointClient(): Promise<Client> {
  const accessToken = await getAccessToken();

  return Client.initWithMiddleware({
    authProvider: {
      getAccessToken: async () => accessToken
    }
  });
}

export async function isSharePointConnected(): Promise<boolean> {
  try {
    await getAccessToken();
    return true;
  } catch {
    return false;
  }
}

export interface AttendanceRecord {
  engineerName: string;
  date: string;
  status: string;
  updatedAt?: string;
}

export interface EngineerAttendanceStats {
  engineerName: string;
  totalDays: number;
  updatedDays: number;
  updateRate: number;
  lastUpdate?: string;
}

export async function getAttendanceData(): Promise<EngineerAttendanceStats[]> {
  try {
    const client = await getSharePointClient();
    
    // The file URL provided is a OneDrive for Business link
    // We need to access it via Microsoft Graph API
    // Format: /me/drive/root:/path/to/file:/workbook/worksheets/{id}/usedRange
    
    // First, try to get the file from the shared link
    // The shared link format suggests it's in a personal OneDrive
    const fileId = 'EeKNvRpu-l1EnPEMeoBHi60BqNxSjxcthBpLTzZ4dYDlYg';
    
    // Try to access the workbook via the sharing link
    // This requires decoding the share link and accessing via /shares endpoint
    const shareToken = Buffer.from(
      'u!' + 'https://3dcadglobal-my.sharepoint.com/:x:/g/personal/rameshbabu_d_3dcad-global_com/EeKNvRpu-l1EnPEMeoBHi60BqNxSjxcthBpLTzZ4dYDlYg'
    ).toString('base64').replace(/=/g, '').replace(/\//g, '_').replace(/\+/g, '-');

    try {
      // Try to access via shares endpoint
      const driveItem = await client.api(`/shares/${shareToken}/driveItem`).get();
      
      if (driveItem) {
        // Get the workbook data
        const worksheets = await client
          .api(`/shares/${shareToken}/driveItem/workbook/worksheets`)
          .get();
        
        if (worksheets.value && worksheets.value.length > 0) {
          const firstSheet = worksheets.value[0];
          const range = await client
            .api(`/shares/${shareToken}/driveItem/workbook/worksheets/${firstSheet.id}/usedRange`)
            .get();
          
          return parseAttendanceData(range.values);
        }
      }
    } catch (shareError) {
      console.log('Could not access via share link, trying direct access...');
    }

    // If share link doesn't work, return empty with a message
    console.log('SharePoint file access requires proper permissions. Using fallback data.');
    return [];
    
  } catch (error) {
    console.error('Error fetching attendance data from SharePoint:', error);
    return [];
  }
}

function parseAttendanceData(values: any[][]): EngineerAttendanceStats[] {
  if (!values || values.length < 2) {
    return [];
  }

  // Assume first row is headers
  const headers = values[0];
  const nameColumnIndex = headers.findIndex((h: string) => 
    h?.toLowerCase().includes('name') || h?.toLowerCase().includes('engineer')
  );
  
  if (nameColumnIndex === -1) {
    console.log('Could not find name column in attendance data');
    return [];
  }

  // Find date columns (assuming they are after the name column)
  const dateColumns = headers.slice(nameColumnIndex + 1).filter((h: string) => h);
  const totalDays = dateColumns.length;

  const engineerStats: Map<string, EngineerAttendanceStats> = new Map();

  // Process each row (skip header)
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const engineerName = row[nameColumnIndex]?.toString().trim();
    
    if (!engineerName) continue;

    let updatedDays = 0;
    let lastUpdate: string | undefined;

    // Count non-empty cells in date columns
    for (let j = nameColumnIndex + 1; j < row.length && j <= nameColumnIndex + totalDays; j++) {
      const cellValue = row[j];
      if (cellValue && cellValue.toString().trim()) {
        updatedDays++;
        lastUpdate = headers[j];
      }
    }

    engineerStats.set(engineerName, {
      engineerName,
      totalDays,
      updatedDays,
      updateRate: totalDays > 0 ? Math.round((updatedDays / totalDays) * 100) : 0,
      lastUpdate
    });
  }

  return Array.from(engineerStats.values());
}

export interface PerformanceMetrics {
  engineerName: string;
  attendanceScore: number;
  taskCompletionScore: number;
  projectsCompletedScore: number;
  dataEntryScore: number;
  overallScore: number;
}

export function calculatePerformanceScore(
  attendanceRate: number,
  taskCompletionRate: number,
  projectsCompleted: number,
  dataEntries: number
): number {
  // Weighted scoring:
  // - Attendance updates: 25%
  // - Task completion: 35%
  // - Projects completed: 25%
  // - Data entries (@): 15%
  
  const attendanceScore = Math.min(attendanceRate, 100);
  const taskScore = Math.min(taskCompletionRate, 100);
  const projectScore = Math.min(projectsCompleted * 10, 100); // 10 points per project, max 100
  const dataScore = Math.min(dataEntries * 5, 100); // 5 points per entry, max 100
  
  const overall = (
    attendanceScore * 0.25 +
    taskScore * 0.35 +
    projectScore * 0.25 +
    dataScore * 0.15
  );
  
  return Math.round(overall);
}
