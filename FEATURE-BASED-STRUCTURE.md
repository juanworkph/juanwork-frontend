# Feature-Based Design Structure

This project follows a feature-based architecture where code is organized by domain features rather than technical layers.

## Core Structure

- `/src/features/` - Contains all domain-specific features, each in its own directory
- `/src/components/` - Shared UI components used across multiple features
- `/src/app/` - Next.js App Router pages and layouts
- `/src/lib/` - Shared utilities and helper functions
- `/src/config/` - Configuration files and constants
- `/src/contexts/` - React context providers
- `/src/hooks/` - Custom React hooks
- `/src/types/` - TypeScript type definitions

## Feature Module Structure

Each feature module under `/src/features/` follows this structure:

```
feature-name/
  ├── components/ - React components specific to this feature
  │   └── index.ts - Re-exports for easier imports
  └── schema/ - Data schemas, types, and mock data
      └── index.ts - Re-exports for easier imports
```

## Component Guidelines

- Components should be feature-scoped whenever possible
- Only extract to `/src/components/` when a component is used across multiple features
- Keep component files focused on a single responsibility
- Use named exports for components

## State Management

- Use React Context for feature-specific state when needed
- Keep state close to where it's used
- Shared state should be managed in `/src/contexts/`

## Naming Conventions

- Feature directories should use kebab-case (`feature-name`)
- Component files should use kebab-case (`component-name.tsx`)
- Component names should use PascalCase (`ComponentName`)
- Util/hook functions should use camelCase (`useSomeHook`)
- Data schema files should use kebab-case (`data-schema.ts`)

## Import Guidelines

- Import from feature indexes when available
- Use relative imports within a feature
- Use absolute imports from the root for cross-feature dependencies

## Code Organization

- Each component should be in its own file
- Group related components in subdirectories if needed
- Export all public components from index.ts files
