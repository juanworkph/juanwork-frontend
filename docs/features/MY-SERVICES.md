# My Services Feature

## Overview

The My Services feature allows Freelancers to view and manage their offered services. It provides a comprehensive dashboard with filtering, sorting, searching, and statistical insights.

## Features

### 1. Service Management Dashboard

- **Route**: `/freelancer/services`
- **Display**: Responsive grid of service cards.
- **Statistics**: Summary cards showing:
  - Total Services
  - Approved Services
  - Pending Services
  - Total Views
  - Total Proposals

### 2. Search & Filter

- **Search**: Real-time search by service title, description, category, or skills (debounced 300ms).
- **Filtering**: Filter by service status (All, Draft, Pending, Approved, Declined, Paused, Cancelled).
- **Sorting**:
  - Newest/Oldest
  - Most/Least Views
  - Most/Least Proposals
  - Name A-Z/Z-A

### 3. Service Interactions

Each service card provides quick access to:

- **View**: Navigate to service details.
- **Edit**: Navigate to service edition.
- **Duplicate**: Clone an existing service (pre-fills Post Service wizard).
- **Pause/Activate**: Toggle availability of approved services.
- **Delete**: Remove/Archive a service with confirmation dialog.

### 4. Responsive Design

- **Mobile**: Single column layout, stacked header controls.
- **Tablet**: 2-column grid.
- **Desktop**: 3-column grid.

## Technical Implementation

### Components

- `MyServicesPage`: Main container handling state and layout.
- `MyServicesHeader`: Stats cards, search, filter, sort, and actions.
- `MyServicesGrid`: Renders the list of `MyServiceCard` components.
- `MyServiceCard`: Individual service display with actions.

### Data Fetching

- **Action**: `getFreelancerServices()`
- **Endpoint**: `GET /services/user/me`
- **Behavior**: Fetches on mount; handles loading and error states using `useAuth` context.

### State Management

- Local state handles the services list.
- `useMemo` is used for high-performance filtering and sorting on the client side.
- `useDebouncedValue` optimizes search input.

## Dependencies

- `lucide-react` for icons.
- `shadcn/ui` for base components (Card, Button, Dropdown, Alert).
- `date-fns` for date formatting.
