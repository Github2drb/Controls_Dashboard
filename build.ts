import { build } from 'esbuild';
import { readdir } from 'fs/promises';
import { join } from 'path';

async function buildServer() {
  try {
    console.log('🔨 Building server...');
    
    await build({
      entryPoints: ['server/index.ts'],
      bundle: true,
      platform: 'node',
      target: 'node20',
      outfile: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
      external: [
        'express',
        'ws',
        'pg',
        '@neondatabase/serverless',
        'drizzle-orm',
        'passport',
        'express-session',
        'memorystore',
        'multer',
        '@microsoft/microsoft-graph-client',
        '@octokit/rest',
        '@asposecloud/aspose-tasks-cloud',
      ],
    });
    
    console.log('✅ Server build complete!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildServer();