# JuanWork Frontend Agent Guide

This document provides essential instructions and guidelines for agentic coding agents operating in the `juanwork-frontend` directory.

## Project Overview

The JuanWork Frontend is a **Next.js 15** application built with the App Router architecture. It serves as the user interface for the JuanWork freelancing platform, connecting clients and freelancers through a modern, responsive web application.

---

## 🛠 Technology Stack

| Category          | Technology                                           |
| :---------------- | :--------------------------------------------------- |
| **Framework**     | Next.js 15.5 (App Router)                            |
| **Core**          | React 19, TypeScript                                 |
| **Styling**       | TailwindCSS 4, `tailwindcss-animate`                 |
| **UI Components** | Shadcn UI (Radix Primitives), `lucide-react` (Icons) |
| **Forms**         | React Hook Form, Zod (validation)                    |
| **HTTP Client**   | Axios                                                |
| **Utilities**     | `date-fns`, `clsx`, `tailwind-merge`                 |

---

## 🔧 Commands

All commands use `pnpm` as the package manager.

| Action         | Command                  | Description                      |
| :------------- | :----------------------- | :------------------------------- |
| **Install**    | `pnpm install`           | Install all dependencies         |
| **Dev**        | `pnpm dev`               | Start development server (:3000) |
| **Build**      | `pnpm build`             | Create production build          |
| **Lint**       | `pnpm lint`              | Run ESLint                       |
| **Type Check** | `pnpm exec tsc --noEmit` | Run TypeScript type checking     |

---

## 📂 Directory Structure

```text
src/
├── app/                    # Next.js App Router (Pages, Layouts, API Routes)
│   ├── auth/               # Authentication pages (login, register)
│   ├── client/             # Client-role pages
│   ├── freelancer/         # Freelancer-role pages
│   ├── landing/            # Public landing pages
│   ├── globals.css         # Global stylesheets (Tailwind imports)
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Shared UI Components
│   ├── layout/             # Layout components (header, footer, sidebar)
│   ├── theme/              # Theme-related components
│   └── ui/                 # Shadcn UI primitives (button, card, dialog, etc.)
├── config/                 # App-wide configuration (constants, navigation)
├── contexts/               # Global React Contexts (Auth, Theme)
├── data/                   # Static data, constants, or mock data
├── features/               # Feature-based business logic & UI
├── hooks/                  # Global custom hooks
├── lib/                    # Library configurations
│   ├── api-client.ts       # Axios instance configuration
│   ├── network-utils.ts    # Network utility functions
│   └── utils.ts            # General utilities (cn helper)
├── types/                  # Global TypeScript definitions
└── utils/                  # Shared utility functions
```

---

## 🏗️ Feature Sliced Design (`src/features/`)

Each feature is a **self-contained, isolated module**. Features are **NOT shareable** across other features.

### Isolation Principle

| Location                                                             | Shareable? | Purpose                    |
| :------------------------------------------------------------------- | :--------- | :------------------------- |
| `src/components/`, `hooks/`, `lib/`, `contexts/`, `utils/`, `types/` | ✅ YES     | Shared globally            |
| `src/features/[name]/`                                               | ❌ NO      | Feature-specific, isolated |

### Feature Internal Structure

```text
src/features/[feature-name]/
├── actions/       # Server Actions for API calls & mutations
├── components/    # Feature-specific UI components
├── hooks/         # Feature-specific custom hooks
├── schema/        # Zod schemas, types, interfaces, mock data
└── utils/         # Helper functions, mappers, validators
```

### Import Rules

```tsx
// ✅ ALLOWED: Shared → Feature
import { Button } from "@/components/ui/button";

// ✅ ALLOWED: Within same feature
import { ProjectCard } from "../components/project-card";

// ❌ FORBIDDEN: Feature → Feature
import { ServiceCard } from "@/features/services/components/service-card";
```

> **Need to share between features?** Extract to `src/components/`, `src/hooks/`, `src/lib/`, or `src/utils/`.

### Available Features

- **Core**: `auth`, `dashboard`, `home`, `overview`, `settings`
- **Marketplace**: `projects`, `services`, `bids`, `proposals`, `findwork`
- **User**: `profile`, `portfolio`, `users`, `workstation`, `bookmarks`
- **Communication**: `messages`, `notifications`, `contact`
- **Content**: `blog`, `help`, `reviews`, `about`
- **Financial**: `payment`

---

## 🎨 Code Style Guidelines

### File Naming

- **Files**: `kebab-case.ts` or `kebab-case.tsx`
- **Components**: `PascalCase` exports (e.g., `export const MyComponent = () => {}`)

### Imports

- Use `@/` alias for imports from `src/` (e.g., `@/components/ui/button`)
- Group imports: React/Next → External libs → Internal modules → Types

### Component Patterns

```tsx
// ✅ Use const arrow functions with types
const MyComponent: React.FC<MyComponentProps> = ({ prop1, prop2 }) => {
  // Use early returns for conditional rendering
  if (!prop1) return null;

  // Event handlers with "handle" prefix
  const handleClick = () => {
    // logic
  };

  return (
    <button
      onClick={handleClick}
      tabIndex={0}
      aria-label="Action button"
      className="px-4 py-2 bg-primary text-primary-foreground"
    >
      Click me
    </button>
  );
};
```

### Styling

- **Always** use TailwindCSS classes; avoid inline styles or CSS modules
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Follow Shadcn UI patterns for component structure

### Forms

- Use **React Hook Form** with **Zod** resolvers
- Place form schemas in the same file or a dedicated `*.schema.ts` file

### State Management

- Use React Context for global state (Auth, Theme)
- Use React Query or SWR for server state (if applicable)
- Prefer local state with `useState` when possible

---

## 🔌 API Communication

### Client-Side Requests

- Use the configured Axios instance from `@/lib/api-client.ts`
- Handle errors gracefully with try/catch
- Show loading states using component state or skeleton loaders
- Display errors using `sonner` toast notifications

### Server Actions

- Prefer Server Actions for data mutations
- Ensure proper error handling and revalidation
- Use `revalidatePath()` or `revalidateTag()` after mutations

---

## 🔑 Authentication

- JWT tokens are stored and managed via the Auth context
- Protected routes should check authentication status
- Use the `useAuth()` hook from `@/contexts/auth-context` (or equivalent)
- Roles: `client`, `freelancer`, `admin`

---

## 🧪 Testing

- Manual verification as per `docs/TESTING.md`
- Use Vitest for unit tests (when configured)
- Ensure components have proper `data-testid` attributes for E2E testing

---

## 🚨 Error Handling

1. **Loading States**: Always show loading indicators during async operations
2. **Error Feedback**: Use `sonner` for toast notifications
3. **Fallback UI**: Provide graceful fallbacks for failed data fetching
4. **Form Validation**: Display inline validation errors using React Hook Form

---

## ♿ Accessibility

- Add `aria-label` attributes to interactive elements
- Use `tabIndex={0}` for focusable non-button elements
- Implement keyboard handlers (`onKeyDown`) alongside click handlers
- Follow WCAG guidelines for color contrast

---

## 📚 Resources

- **Frontend Docs**: `docs/`
- **Design System**: Shadcn UI components in `src/components/ui/`
- **API Swagger**: `http://localhost:4000/docs` (when backend is running)

---

_Note: This file is intended for AI agents. Adhere strictly to these patterns to maintain codebase consistency._
