# My Projects Feature

## Overview

The My Projects feature allows Clients to view and manage their posted projects. It provides a comprehensive dashboard with filtering, sorting, searching, and statistical insights.

## Features

### 1. Project Management Dashboard

- **Route**: `/client/projects`
- **Display**: Responsive grid of project cards.
- **Statistics**: Summary cards showing:
  - Total Projects
  - Active Projects
  - In Progress Projects
  - Total Bids

### 2. Search & Filter

- **Search**: Real-time search by project title, description, category, or skills (debounced 300ms).
- **Filtering**: Filter by project status (All, Draft, Pending, Active, Completed, Paused, Cancelled).
- **Sorting**:
  - Newest/Oldest
  - Most/Least Bidders
  - Name A-Z/Z-A

### 3. Project Interactions

Each project card provides quick access to:

- **View**: Navigate to project details.
- **Edit**: Navigate to project edition.
- **Duplicate**: Clone an existing project (pre-fills Post Project wizard).
- **Delete**: Remove/Archive a project with confirmation dialog.

### 4. Responsive Design

- **Mobile**: Single column layout, stacked header controls.
- **Tablet**: 2-column grid.
- **Desktop**: 3-column grid.

## Technical Implementation

### Components

- `MyProjectsLayout`: Main container handling state and layout.
- `MyProjectsGrid`: Renders the list of `MyProjectCard` components.
- `MyProjectCard`: Individual project display with actions.
- `ProjectStats`: Statistical summary component.

### Data Fetching

- **Action**: `getUserProjects()`
- **Endpoint**: `GET /projects/user/me`
- **Behavior**: Fetches on mount; handles loading and error states using `useAuth` context context.

### State Management

- Local state handles the projects list.
- `useMemo` is used for high-performance filtering and sorting on the client side.
- `useDebouncedValue` optimizes search input.

## Dependencies

- `lucide-react` for icons.
- `shadcn/ui` for base components (Card, Button, Dropdown, Alert).
- `date-fns` for date formatting.
