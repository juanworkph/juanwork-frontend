# Discover Freelancers Feature

## Overview

The **Discover Freelancers** feature allows clients to search, filter, and view freelancer profiles. It includes a comprehensive filtering system, responsive design, and integration with the real backend database.

## Implementation Details

### Components

- **Page**: `src/app/client/hire-talent/discover-freelancers/page.tsx`
- **Filter Sidebar**: `FreelancerFilterSidebar` - Contains all filter controls (Category, Skills, Hourly Rate, etc.).
- **Freelancer List**: Dependencies: `FreelancerList`, `FreelancerCard`.
- **Actions**: `src/features/users/actions/discover-freelancers.ts` - Handles API data fetching.

### Filtering System

The feature supports extensive filtering capabilities:

1.  **Search**: Text search for name, title, bio (Debounced ~300ms).
2.  **Category**: Dropdown selection; triggers dynamic skills fetching.
3.  **Skills**: Multi-select with autocomplete.
4.  **Hourly Rate**: Range slider (PHP currency).
5.  **Experience Level**: Beginner, Intermediate, Expert.
6.  **Availability**: Status filter (e.g., "Available Now").
7.  **Languages**: Multi-select.
8.  **Rating**: Minimum star rating.
9.  **Location**: Text search.

### State Management

- Filters are managed in the parent Page component and passed down.
- Category changes trigger updates to available skills.
- "Clear Filters" resets all states to defaults.

### Data Integration

- **API Source**: Real database via `/users` endpoint (filtered by `role=freelancer`).
- **Transformers**: `transformAPIFreelancerToFrontend` handles data mapping and provides graceful fallbacks for missing fields (e.g., default avatars, placeholders for ratings).
- **Pagination**: Infinite scroll or standard pagination support (currently implementing standard).

### Responsive Design

- **Desktop**: Persistent sidebar on the left.
- **Mobile/Tablet**: Sidebar moves to a collapsible Sheet/Drawer.

## Tech Stack

- **UI**: Tailwind CSS, Shadcn UI (Sheet, Slider, Select, etc.).
- **Icons**: Lucide React.
- **Validation**: Zod schemas for filters.

## Troubleshooting

- **API Errors**: Check network tab for `/users` calls.
- **Missing Data**: Ensure the backend database has users with `role='freelancer'`.
- **Response Structure**: The frontend handles both nested (`data.users`) and flat (`data[]`) API responses for compatibility.
