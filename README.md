# JuanWork Frontend

## Navigation System

The application uses a role-based navigation system that automatically displays different navigation items based on the user's role:

- **Guest**: Public navigation for unauthenticated users
- **Client**: Navigation for clients looking to hire freelancers
- **Freelancer**: Navigation for freelancers looking for work
- **Admin**: Navigation for system administrators

### How it works

1. **Navigation items** are defined in `src/config/navigation.ts` and organized by user role
2. **Role detection** happens automatically in three ways (in order of priority):
   - **Authenticated user role**: If a user is logged in, their role from the auth context is used
   - **Manual role override**: Using the role switcher (for testing/development)
   - **Route-based detection**: Automatically detects role from the current URL path:
     - `/freelancer/*` → freelancer role
     - `/client/*` → client role
     - `/admin/*` → admin role
     - Everything else → guest role
3. **The Navbar component** automatically renders the appropriate navigation items, including dropdown menus
4. **The system supports** both common navigation links and feature-specific buttons

### Automatic Role Switching

When you navigate to different routes, the navbar will automatically update:
- Visiting `/freelancer` will show freelancer navigation (Dashboard, Find Work, Service Manage, Messages)
- Visiting `/client` will show client navigation (Dashboard, Hire Talent, Project Manage, Messages)
- Visiting `/admin` will show admin navigation (Dashboard, Users, Projects, Services, Messages)
- Visiting any other page will show guest navigation (Home, About Us, Our Blog, Contact Us, Help Center)

### Testing the navigation

A role switcher component is available during development to manually override the role and test how the navigation changes. Look for it in the bottom right corner of the screen. This override persists until you:
- Log in as an authenticated user
- Clear your browser's localStorage
- Use the role switcher to change to a different role

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
