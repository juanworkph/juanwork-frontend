"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Palette, Smartphone, Code } from "lucide-react";
import {
  formatCurrency as formatProjectCurrency,
  getTimeLeft,
} from "@/features/projects/schema/projects-data";
import { mockProjectsData } from "@/features/projects/schema/projects-data";
import { mockServiceDetailsData } from "@/features/services/schema/single-view-data";

interface SingleViewRecommendationProps {
  currentId: string;
  category: string;
  skills: string[];
  type: "project" | "service";
  maxItems?: number;
}

export const SingleViewRecommendation = ({
  currentId,
  category,
  skills,
  type,
  maxItems = 3,
}: SingleViewRecommendationProps) => {
  const router = useRouter();

  // Filter and sort items based on matching criteria
  const recommendedItems = useMemo(() => {
    if (type === "project") {
      const allProjects = mockProjectsData.projects;
      return allProjects
        .filter((item) => item.id !== currentId && item.status === "active")
        .map((item) => {
          const itemCategory =
            typeof item.category === "string" ? item.category : item.category;
          const matchesCategory = itemCategory === category;
          const matchingSkillsCount = item.skills.filter((skill) =>
            skills.includes(skill),
          ).length;

          let matchScore = 0;
          if (matchingSkillsCount >= 3) matchScore = 300 + matchingSkillsCount;
          else if (matchesCategory && matchingSkillsCount > 0)
            matchScore = 200 + matchingSkillsCount;
          else if (matchesCategory) matchScore = 100;
          else matchScore = matchingSkillsCount;

          return { ...item, matchScore };
        })
        .sort(
          (a, b) =>
            b.matchScore - a.matchScore ||
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, maxItems);
    } else {
      // Service type
      return mockServiceDetailsData
        .filter((item) => item.id !== currentId && item.status === "active")
        .map((item) => {
          const itemCategory =
            typeof item.category === "string"
              ? item.category
              : (item.category as any).name;
          const matchesCategory = itemCategory === category;
          const matchingSkillsCount = item.skills.filter((skill) =>
            skills.includes(skill),
          ).length;

          let matchScore = 0;
          if (matchingSkillsCount >= 3) matchScore = 300 + matchingSkillsCount;
          else if (matchesCategory && matchingSkillsCount > 0)
            matchScore = 200 + matchingSkillsCount;
          else if (matchesCategory) matchScore = 100;
          else matchScore = matchingSkillsCount;

          return { ...item, matchScore };
        })
        .sort(
          (a, b) =>
            b.matchScore - a.matchScore ||
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, maxItems);
    }
  }, [currentId, category, skills, type, maxItems]);

  const handleItemClick = (id: string) => {
    const path =
      type === "project"
        ? `/freelancer/projects/${id}`
        : `/client/services/${id}`;
    router.push(path);
  };

  const getCategoryStyle = (cat: string) => {
    const lowerCat = cat.toLowerCase();
    if (
      lowerCat.includes("b2b") ||
      lowerCat.includes("saas") ||
      lowerCat.includes("design")
    ) {
      return {
        label: "UI/UX",
        gradient: "from-blue-900/20 to-card",
        iconBg: "bg-blue-500/10",
        iconBorder: "border-blue-500/20",
        iconColor: "text-blue-500",
        icon: "palette",
      };
    }
    if (lowerCat.includes("mobile") || lowerCat.includes("app")) {
      return {
        label: "Mobile",
        gradient: "from-green-900/20 to-card",
        iconBg: "bg-green-500/10",
        iconBorder: "border-green-500/20",
        iconColor: "text-green-500",
        icon: "smartphone",
      };
    }
    return {
      label: "Dev",
      gradient: "from-primary/10 to-card",
      iconBg: "bg-primary/10",
      iconBorder: "border-primary/20",
      iconColor: "text-primary",
      icon: "code",
    };
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "palette":
        return <Palette className="w-5 h-5" />;
      case "smartphone":
        return <Smartphone className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  if (recommendedItems.length === 0) return null;

  return (
    <div className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full"></span>
          Recommended For You
        </h3>
        <button className="text-xs font-bold text-primary hover:underline">
          View All {type === "project" ? "Projects" : "Services"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendedItems.map((item) => {
          const itemCategory =
            typeof item.category === "string"
              ? item.category
              : (item.category as any).name;
          const style = getCategoryStyle(itemCategory);
          const name =
            type === "project" ? (item as any).name : (item as any).serviceName;

          let priceDisplay = "";
          if (type === "project") {
            const project = item as any;
            priceDisplay =
              project.budget.type === "fixed"
                ? formatProjectCurrency(
                    project.budget.amount,
                    project.budget.currency,
                  )
                : `${formatProjectCurrency(project.budget.hourlyRate || 0, project.budget.currency)}/hr`;
          } else {
            const service = item as any;
            priceDisplay = `Starting ${formatProjectCurrency(service.pricing.starting, service.pricing.currency)}`;
          }

          const statsDisplay =
            type === "project"
              ? `${(item as any).proposalStats?.totalProposals || 0} Bid${((item as any).proposalStats?.totalProposals || 0) !== 1 ? "s" : ""}`
              : `${(item as any).totalOrders || 0} Order${((item as any).totalOrders || 0) !== 1 ? "s" : ""}`;

          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="bg-card border border-border rounded-xl overflow-hidden group cursor-pointer hover:border-primary/50 transition-all bg-card/50"
            >
              <div
                className={`h-24 bg-gradient-to-br ${style.gradient} relative p-4 flex items-end`}
              >
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold border border-border uppercase tracking-tighter">
                  {style.label}
                </div>
                <div
                  className={`w-10 h-10 rounded-lg ${style.iconBg} border ${style.iconBorder} flex items-center justify-center ${style.iconColor}`}
                >
                  {renderIcon(style.icon)}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {name}
                  </h4>
                  <span className="text-sm font-bold text-foreground whitespace-nowrap ml-2">
                    {priceDisplay}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mb-4 line-clamp-2 min-h-[2.5em]">
                  {item.description}
                </p>

                <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  <span>{statsDisplay}</span>
                  <span>{getTimeLeft(item.createdAt)} ago</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
