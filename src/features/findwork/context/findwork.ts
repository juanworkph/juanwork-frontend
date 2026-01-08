import { ExperienceLevel, ProjectDuration } from "../schema/findwork-data";

// ============================================================================
// Helper functions
// ============================================================================

export const formatCurrency = (
  amount: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
};

export const getExperienceLevelLabel = (level: ExperienceLevel): string => {
  switch (level) {
    case "entry":
      return "Entry Level";
    case "intermediate":
      return "Intermediate";
    case "expert":
      return "Expert";
    default:
      return level;
  }
};

export const getDurationLabel = (duration: ProjectDuration): string => {
  switch (duration) {
    case "less-than-1-month":
      return "Less than 1 month";
    case "1-3-months":
      return "1-3 months";
    case "3-6-months":
      return "3-6 months";
    case "more-than-6-months":
      return "More than 6 months";
    default:
      return duration;
  }
};

// SKILLS_BY_CATEGORY removed as we now fetch skills from API
