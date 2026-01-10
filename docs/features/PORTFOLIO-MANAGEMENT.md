# Portfolio Management Feature

## Overview

The Portfolio Management feature allows Freelancers to showcase their work through a comprehensive portfolio system. It includes capabilities to create, manage, and display projects with rich media support, categorization, and skill tagging.

## Features

### 1. Portfolio Dashboard

- **Route**: `/freelancer/portfolio`
- **Display**: Responsive grid or list view of portfolio projects.
- **Statistics**: Summary cards showing:
  - Total Projects
  - Completed Projects
  - Featured Projects
  - Average Rating
  - Total Clients

### 2. Project Management

- **Create**: Comprehensive wizard for adding new projects with validation.
- **Edit**: Update existing project details.
- **Delete**: Remove projects with confirmation.
- **Duplicate**: Clone projects to quickly create similar entries.
- **Feature Toggle**: Mark projects as "Featured" to highlight them.

### 3. Search & Filter

- **Search**: Real-time search by title, description, technologies, skills, or client (debounced 300ms).
- **Filtering**:
  - By Category (Web Dev, Mobile App, UI/UX, etc.)
  - By Status (Draft, In Progress, Completed, Archived)
  - By Featured status
- **View Modes**: Toggle between Grid and List views.

### 4. Rich Data Support

- **Images**: Thumbnail and Gallery support with URL validation and placeholders.
- **Timeline**: Start and End dates with duration calculation.
- **Testimonials**: Client ratings and feedback.
- **Tech Stack**: Tagging projects with used technologies and skills.
- **Metrics**: Budget, Team Size, and Delivery Time tracking.

### 5. Responsive Design

- **Mobile**: Single column layout, stacked form fields.
- **Tablet**: 2-column grid.
- **Desktop**: 3-column grid.

## Technical Implementation

### Components

- `PortfolioPage`: Main container.
- `PortfolioGrid`: Renders `PortfolioCard` components.
- `PortfolioCard`: Displays project summary and actions.
- `PortfolioProjectFormModal`: Complex form with Zod schema validation.
- `PortfolioHeader`: Statistics, search, and view controls.

### Data Fetching

- **Action**: `getFreelancerPortfolio()`
- **Endpoint**: `GET /portfolio/user/me` (or equivalent)
- **State**: Managed via local state with `useMemo` for filtering/sorting.

### Form Validation

- **Schema**: Zod schema in `portfolio-form.schema.ts`.
- **Validation**:
  - Required fields check.
  - URL format validation.
  - Date range validation.
  - Rating limits (1-5).
  - Unsaved changes detection.

## Dependencies

- `react-hook-form` & `zod` for forms.
- `lucide-react` for icons.
- `shadcn/ui` for UI components.
- `s3` or similar for image storage (currently URL based).
