import React from "react";

/**
 * Props for ProjectDetailLayout component
 */
interface ProjectDetailLayoutProps {
  /**
   * Content for the left column (main content area)
   * Takes 2/3 width on desktop (lg:col-span-2)
   */
  leftColumn: React.ReactNode;

  /**
   * Content for the right column (sidebar area)
   * Takes 1/3 width on desktop (lg:col-span-1)
   */
  rightColumn: React.ReactNode;
}

/**
 * ProjectDetailLayout Component
 *
 * Provides a responsive two-column layout for the project detail page.
 *
 * Layout behavior:
 * - Desktop (>1024px): Two columns with 2/3 + 1/3 split
 * - Mobile/Tablet (<1024px): Single column, stacked vertically
 *
 * @param leftColumn - Content for the main content area (project details, bids)
 * @param rightColumn - Content for the sidebar (time remaining, quick actions, insights)
 *
 * @example
 * ```tsx
 * <ProjectDetailLayout
 *   leftColumn={<ProjectContent />}
 *   rightColumn={<ProjectSidebar />}
 * />
 * ```
 */
export const ProjectDetailLayout = ({
  leftColumn,
  rightColumn,
}: ProjectDetailLayoutProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Main Content Area (2/3 width on desktop) */}
      <div className="lg:col-span-2 space-y-6">{leftColumn}</div>

      {/* Right Column - Sidebar Area (1/3 width on desktop) */}
      <div className="space-y-6">{rightColumn}</div>
    </div>
  );
};
