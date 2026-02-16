# DRB TechVerse Dashboard

A modern, responsive team dashboard for DRB TechVerse that serves as a central hub for project tracking, team collaboration, and resource management.

## Features

- 🎯 Project Activity Tracking
- 👥 Team Member Directory
- 📊 Performance Analytics
- 🔐 Engineer Authentication System
- 📈 Skill Matrix Tracking
- 📅 Weekly Assignment Management
- 🌓 Dark/Light Mode Support

## Tech Stack

- **Frontend:** React, TypeScript, TailwindCSS, Shadcn UI
- **Backend:** Express.js, TypeScript
- **State Management:** TanStack Query
- **Routing:** Wouter
- **Styling:** TailwindCSS

## Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory (see `.env.example`)

4. Run development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## Build for Production
```bash
npm run build
npm start
```

## Environment Variables

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session secret key
- `GITHUB_TOKEN` - GitHub API token (for data storage)
- `GITHUB_OWNER` - GitHub repository owner
- `GITHUB_REPO` - GitHub repository name

## Project Structure
