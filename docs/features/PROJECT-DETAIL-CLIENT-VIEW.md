# Project Detail Client View Feature

## Overview

The Project Detail Client View is a comprehensive page that allows clients to manage their projects, view bids, and monitor performance. It provides real-time updates and detailed insights for the project owner.

## Features

### 1. Dashboard Components

- **Time Remaining Card**: Real-time countdown timer with urgent/expired states.
- **Freelancer Bids Section**:
  - List of all bids with filtering (All, Shortlisted, Interviewed).
  - Detailed bid cards with freelancer info, rating, and verification badges.
  - Action menu for managing bids (Shortlist, Interview, Reject).
- **Project Insights**: Statistics on views, proposals, and average bid amount.
- **Budget Range**: Clear display of project budget and payment type (Hourly/Fixed).

### 2. Management Actions

- **Project Actions**: Edit, Delete, Duplicate, Share.
- **Bid Management**:
  - **Shortlist/Interview**: Move bids through the hiring pipeline.
  - **Reject**: Remove bids with confirmation dialog.
  - **Message/Profile**: Quick access to freelancer communication.
- **Close Bidding**: Manually close the project for new proposals.

### 3. Real-time Updates

- **Polling**: Updates bid list every 30 seconds.
- **Countdown**: Second-by-second update for project deadline.
- **Reconnection Logic**: Handles network interruptions gracefully.

### 4. Sharing & Social

- **Social Sharing**: One-click sharing to Facebook, Twitter, LinkedIn, and Email.
- **Link Generation**: Auto-generates shareable project URLs.

### 5. Responsive Design

- **Desktop**: 3-column layout (Content + Sidebar).
- **Tablet**: Single column with sidebar below content.
- **Mobile**: Stacked layout optimized for smaller screens.

## Technical Implementation

### Components

- `ProjectDetailPage`: Main page wrapper.
- `ProjectDetailView`: Core layout tab manager.
- `FreelancerBidsSection`: Complex list component with filtering (uses `useMemo`).
- `BidCard`: Optimized component with custom comparison for performance.
- `TimeRemainingCard`: `React.memo` component handling intervals.

### Data Management

- **Mock Data**: Currently uses structured mock data in `project-detail-data.ts`.
- **Actions**: `project-detail.actions.ts` handles logic (ready for API integration).
- **State**: React state manages UI interactions (tabs, dialogs, filters).

### Verification

- **Accessibility**: Full ARIA support, keyboard navigation, and focus management.
- **Error Handling**: Retry mechanisms for data loading failures.
- **Performance**: Heavy use of `useCallback`, `useMemo`, and `React.memo` to minimize re-renders.

## Dependencies

- `shadcn/ui` for foundational components.
- `lucide-react` for icons.
- `date-fns` for time formatting.
