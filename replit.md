# DRB TechVerse Dashboard

## Overview
A modern, responsive team dashboard for DRB TechVerse that serves as a central hub for project tracking, team collaboration, and resource management. This is an enhanced version of the original drbtechverse.in website with improved UI/UX, dark mode support, and interactive features.

## Recent Changes
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

### Key Features
1. **Dashboard Stats**: Total projects, active members, completion rate, recent activities
2. **Navigation Cards**: Quick links to Project Assignment and Team Sheet (with Coming Soon placeholders)
3. **Team Directory**: Team member cards with status indicators and contact buttons
4. **Project Preview**: Project cards with progress bars, priority badges, and status
5. **Search**: Filter team members and projects in real-time
6. **Theme Toggle**: Dark/light mode with localStorage persistence

### External Links
- Project Assignment: https://github2drb.github.io/Controls_Team_Tracker/
- Team Excel Sheet: /teamsheet/

## Running the Project
The application runs with `npm run dev` which starts both the Express backend and Vite frontend on port 5000.
