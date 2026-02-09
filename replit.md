# DRB TechVerse Dashboard

## Overview
A modern, responsive team dashboard for DRB TechVerse that serves as a central hub for project tracking, team collaboration, and resource management. This is an enhanced version of the original drbtechverse.in website with improved UI/UX, dark mode support, and interactive features.

## Recent Changes
- **Jan 25, 2026**: Added Engineer Authentication System
  - Individual engineer login with username/password credentials
  - Credentials stored in GitHub (engineers_auth.json)
  - 25 engineers initialized (24 engineers + 1 admin)
  - Default password: drb@123, Admin: username "admin", password "admin@drb"
  - Password reset functionality on login page
  - Project filtering: non-admin engineers only see their assigned projects
  - Engineer Management page (/engineer-management) for admin-only credential management
  - Server-side authentication with X-Admin-Auth header verification
  - Inactive engineers blocked from logging in
- **Jan 25, 2026**: Added Skill Matrix and Manager Overview features
  - Created Skill Matrix page (/skill-matrix) for tracking engineer performance
  - Performance levels: Expert (90%+), Proficient (75-89%), Developing (50-74%), Learning (<50%)
  - Summary cards showing team size, efficiency, top performers, needs attention
  - Top performers highlight section and engineers needing support section
  - Manager Overview component on dashboard with quick-view cards:
    - Team Status (active engineers, utilization rate)
    - Today's Progress (activities, tasks, completion rate)
    - Projects Status (active, completed, in-progress counts)
    - Alerts (overdue assignments, blocked projects)
  - Weekly Schedule Overview with visual timeline grid
    - Color-coded status blocks per day per engineer
    - Legend for status interpretation (In Progress, Completed, On Hold, Blocked, Not Started)
    - Quick summary metrics (Active Projects, Completed, On Hold, Blocked)
  - Added navigation card to Skill Matrix from dashboard
- **Jan 2, 2026**: Updated Team Project Tracker page with new format
  - Columns: Project Name, Engineer, Resource Locked From/Till, Resource Lock Days (calculated), Internal Target, Customer Target, Current Status, Constraints
  - Project name displays only once per project (merged rows)
  - Resource Lock Days calculated automatically from locked from/till dates
  - Removed Week-wise Project Assignment for each engineer section
  - Added new schema fields: resourceLockedFrom, resourceLockedTill, internalTarget, customerTarget
- **Jan 1, 2026**: Created Team Project Tracker page
  - New internal page at /project-tracker replacing external GitHub link
  - Shows unique projects with assigned engineers in clean table view
  - Stats cards: total projects, engineers assigned, active projects
  - Search and status filter functionality
- **Jan 1, 2026**: Added Project Coordination Summary
  - New collapsible section showing running projects, engineers involved, understaffed projects, overloaded engineers
  - Project-to-engineer matrix table with resource sufficiency indicators
  - Highlights overloaded engineers (3+ projects) with warning badge
  - Shows which projects need more resources (< 2 engineers assigned)
- **Dec 31, 2025**: Removed MS Project Reports feature
  - Deleted server/msproject.ts and client/src/pages/msproject-reports.tsx
  - Removed all MS Project API routes and Aspose integration
  - Removed navigation card from dashboard
- **Dec 31, 2025**: Added Weekly Engineer Assignments Table
  - New component: client/src/components/weekly-assignments-table.tsx
  - Shows engineer assignments grouped by week with expandable task details
  - CRUD for assignments: engineer, project, target date, status, notes, constraint
  - Task management: add/edit/delete tasks with target/completion dates and status
  - Data persisted to GitHub (weekly-assignments.json)
  - API endpoints: GET/POST/PATCH/DELETE /api/weekly-assignments, task endpoints
  - POST /api/weekly-assignments/save-all for batch saving
  - Admin-only editing with status dropdowns for assignments and tasks
  - Summary table view with columns: Engineer Name, Task, Target Date, Completion Date, Constraint
  - Integrated at top of dashboard page
- **Dec 14, 2025**: Added SharePoint Integration for Team Performance Tracking
  - Created server/sharepoint.ts with Microsoft Graph API integration
  - New endpoint: GET /api/analytics/performance with weighted scoring
  - Performance scoring: 25% attendance, 35% task completion, 25% projects, 15% @mentions
  - Updated getAnalytics() to use real data from GitHub instead of random values
  - Data sources: SharePoint (attendance), GitHub (projects, activities)
- **Dec 8, 2025**: Redesigned Project Status to Project Activity Tracking
  - Changed from engineer-project matrix to project-centric activity log
  - Date range updated to December 1, 2025 through February 28, 2026
  - Activities entered as text notes per date (instead of status dropdowns)
  - Right column shows Current Status with admin-editable dropdown
  - New API endpoints: GET/POST /api/project-activities, POST /api/project-activities/status
  - Data persisted to GitHub (project-activities.json)
  - Filtering hides completed projects (shows 40 active, hides 8 completed)
- **Dec 5, 2024**: Added Project Status Tracking feature (legacy)
  - Original page with engineer, project, daily status columns
  - Date range tracking from December 5, 2024 to February 28, 2025 (86 days)
  - Data persisted to GitHub (project-status.json)
- **Nov 30, 2024**: Initial implementation with modern dashboard design
  - Added responsive header with search and theme toggle
  - Created hero section with welcome message
  - Built stats widgets showing key metrics
  - Implemented navigation cards linking to external tools
  - Added team member directory with status indicators
  - Created project preview section with progress tracking
  - Implemented dark/light mode toggle with localStorage persistence
  - Added real-time search filtering for projects and team members

## User Preferences
- Focus on clean, modern design with good visual hierarchy
- Preference for functional dashboard over decorative elements
- Links to external tools (GitHub pages, team sheets)

## Project Architecture

### Tech Stack
- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI components
- **Backend**: Express.js with TypeScript
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Styling**: TailwindCSS with custom design tokens

### Directory Structure
```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Shadcn UI base components
│   │   ├── header.tsx       # Main navigation header
│   │   ├── hero-section.tsx # Welcome banner
│   │   ├── stats-widget.tsx # Dashboard statistics
│   │   ├── navigation-cards.tsx # Quick access links
│   │   ├── team-section.tsx # Team member directory
│   │   ├── project-preview.tsx # Recent projects
│   │   ├── theme-provider.tsx # Theme context
│   │   └── theme-toggle.tsx # Dark/light mode toggle
│   ├── pages/
│   │   └── dashboard.tsx    # Main dashboard page
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and configurations
│   └── App.tsx              # Root component
server/
├── routes.ts               # API endpoints
├── storage.ts              # In-memory data storage
└── index.ts                # Server entry point
shared/
└── schema.ts               # TypeScript types and Zod schemas
```

### API Endpoints
- `GET /api/stats` - Dashboard statistics
- `GET /api/team-members` - List all team members
- `GET /api/projects` - List all projects
- `POST /api/team-members` - Create team member
- `POST /api/projects` - Create project
- `GET /api/project-status-tracking` - Get all project status tracking data
- `POST /api/project-status-tracking` - Update status for engineer/project on specific date
- `GET /api/project-assignments` - Get project assignments from GitHub

### Key Features
1. **Dashboard Stats**: Total projects, active members, completion rate, recent activities
2. **Navigation Cards**: Quick links to Project Status Tracking, Project Assignment, Team Sheet, and more
3. **Team Directory**: Team member cards with status indicators and contact buttons
4. **Project Preview**: Project cards with progress bars, priority badges, and status
5. **Search**: Filter team members and projects in real-time
6. **Theme Toggle**: Dark/light mode with localStorage persistence
7. **Project Status Tracking**: Track daily project status from Dec 5 to Feb 28 with admin-only editing, completion percentage calculation, and GitHub persistence

### External Links
- Project Assignment: https://github2drb.github.io/Controls_Team_Tracker/
- Team Excel Sheet: /teamsheet/

## Running the Project
The application runs with `npm run dev` which starts both the Express backend and Vite frontend on port 5000.
