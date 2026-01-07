# JuanWork Frontend

## Overview

This is the Next.js frontend for the JuanWork freelancing platform.

### Reference Documentation

Technical documentation has been consolidated in the `docs/` directory:

- **[Features](docs/features/)**: Implementation details for Auth, Project Submission, etc.
- **[Testing](docs/TESTING.md)**: Manual testing strategies.
- **[Deployment](docs/DEPLOYMENT.md)**: Security and operations.
- **[Changelog](docs/CHANGELOG.md)**: Recent fixes and updates.

### Navigation System

The application uses a role-based navigation system that automatically displays different navigation items based on the user's role:

- **Guest**: Public navigation for unauthenticated users
- **Client**: Navigation for clients looking to hire freelancers
- **Freelancer**: Navigation for freelancers looking for work
- **Admin**: Navigation for system administrators

**Automatic Role Switching**:
The navbar detects roles via Auth Context or URL path (e.g., `/client/*`). A dev-only role switcher is available in the bottom-right corner.

## Getting Started

1. **Install Dependencies**:

   ```bash
   pnpm install
   ```

2. **Run Development Server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Latest Changes (Jan 2026)

- **Project Post**: Unified budget fields for Fixed/Hourly projects; smooth animation for Delivery Days.
- **Type Safety**: Resolved ESLint/TypeScript errors across form actions and validators.
- **Auth**: Secure client-side token handling.

## Deploy

Deploy easily on [Vercel](https://vercel.com/new). See `docs/DEPLOYMENT.md` for production configuration.
