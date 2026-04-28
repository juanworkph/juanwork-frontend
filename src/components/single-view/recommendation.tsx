"use client";

import React, { useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Palette,
  Smartphone,
  Code,
  PenTool,
  Megaphone,
  Database,
  Headset,
  Play,
} from "lucide-react";
import {
  formatCurrency as formatProjectCurrency,
  getTimeLeft,
} from "@/features/projects/schema/projects-data";
import { ServiceDiscoveryCard as ServiceCard } from "@/features/services/components/service-discovery-card";
import { mockServiceDetailsData } from "@/features/services/schema/single-view-data";
import { getProjects } from "@/features/findwork/actions/findwork";
import { Project } from "@/features/findwork/schema/findwork-data";

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
  const [recommendedProjects, setRecommendedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(type === "project");

  useEffect(() => {
    if (type === "project") {
      const fetchRecommendations = async () => {
        try {
          setIsLoading(true);
          // Fetch projects for recommendation
          const { projects } = await getProjects({
            limit: 50,
            status: "draft",
          });

          const scored = projects
            .filter((item) => item.id !== currentId)
            .map((item) => {
              const matchesCategory = item.category === category;
              const matchingSkillsCount = item.skills.filter((skill) =>
                skills.includes(skill),
              ).length;

              let matchScore = 0;
              if (matchingSkillsCount >= 3)
                matchScore = 300 + matchingSkillsCount;
              else if (matchesCategory && matchingSkillsCount > 0)
                matchScore = 200 + matchingSkillsCount;
              else if (matchesCategory) matchScore = 100;
              else matchScore = matchingSkillsCount;

              return { ...item, matchScore };
            })
            .sort(
              (a, b) =>
                b.matchScore - a.matchScore ||
                new Date(b.postedDate).getTime() -
                  new Date(a.postedDate).getTime(),
            )
            .slice(0, maxItems);

          setRecommendedProjects(scored);
        } catch (error) {
          console.error("Failed to fetch recommendations:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchRecommendations();
    }
  }, [currentId, category, skills, type, maxItems]);

  const recommendedServices = useMemo(() => {
    if (type === "service") {
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
    return [];
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

    // Writing/Content
    if (
      lowerCat.includes("writing") ||
      lowerCat.includes("content") ||
      lowerCat.includes("translation") ||
      lowerCat.includes("edit")
    ) {
      return {
        label: cat,
        gradient: "from-purple-900/20 to-card",
        iconBg: "bg-purple-500/10",
        iconBorder: "border-purple-500/20",
        iconColor: "text-purple-500",
        icon: "pen-tool",
      };
    }

    // Marketing/SEO
    if (
      lowerCat.includes("marketing") ||
      lowerCat.includes("seo") ||
      lowerCat.includes("social") ||
      lowerCat.includes("ad")
    ) {
      return {
        label: cat,
        gradient: "from-orange-900/20 to-card",
        iconBg: "bg-orange-500/10",
        iconBorder: "border-orange-500/20",
        iconColor: "text-orange-500",
        icon: "megaphone",
      };
    }

    // High Tech/Design
    if (
      lowerCat.includes("b2b") ||
      lowerCat.includes("saas") ||
      lowerCat.includes("design") ||
      lowerCat.includes("ui") ||
      lowerCat.includes("ux")
    ) {
      return {
        label: cat,
        gradient: "from-blue-900/20 to-card",
        iconBg: "bg-blue-500/10",
        iconBorder: "border-blue-500/20",
        iconColor: "text-blue-500",
        icon: "palette",
      };
    }

    // Data/Database
    if (
      lowerCat.includes("data") ||
      lowerCat.includes("database") ||
      lowerCat.includes("sql") ||
      lowerCat.includes("analytics")
    ) {
      return {
        label: cat,
        gradient: "from-indigo-900/20 to-card",
        iconBg: "bg-indigo-500/10",
        iconBorder: "border-indigo-500/20",
        iconColor: "text-indigo-500",
        icon: "database",
      };
    }

    // Support/Admin
    if (
      lowerCat.includes("support") ||
      lowerCat.includes("admin") ||
      lowerCat.includes("assistant") ||
      lowerCat.includes("customer")
    ) {
      return {
        label: cat,
        gradient: "from-teal-900/20 to-card",
        iconBg: "bg-teal-500/10",
        iconBorder: "border-teal-500/20",
        iconColor: "text-teal-500",
        icon: "headset",
      };
    }

    // Media/Video
    if (
      lowerCat.includes("video") ||
      lowerCat.includes("media") ||
      lowerCat.includes("audio") ||
      lowerCat.includes("anim")
    ) {
      return {
        label: cat,
        gradient: "from-red-900/20 to-card",
        iconBg: "bg-red-500/10",
        iconBorder: "border-red-500/20",
        iconColor: "text-red-500",
        icon: "play",
      };
    }

    // Mobile
    if (
      lowerCat.includes("mobile") ||
      lowerCat.includes("app") ||
      lowerCat.includes("ios") ||
      lowerCat.includes("android")
    ) {
      return {
        label: cat,
        gradient: "from-green-900/20 to-card",
        iconBg: "bg-green-500/10",
        iconBorder: "border-green-500/20",
        iconColor: "text-green-500",
        icon: "smartphone",
      };
    }

    // Default: Dev/Web
    return {
      label: cat,
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
      case "pen-tool":
        return <PenTool className="w-5 h-5" />;
      case "megaphone":
        return <Megaphone className="w-5 h-5" />;
      case "database":
        return <Database className="w-5 h-5" />;
      case "headset":
        return <Headset className="w-5 h-5" />;
      case "play":
        return <Play className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  if (type === "project" && isLoading) {
    return (
      <div className="mt-20">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8 flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full"></span>
          Recommended For You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(maxItems)].map((_, i) => (
            <div
              key={i}
              className="h-[300px] bg-zinc-100 dark:bg-zinc-800/50 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  const hasRecommendations =
    type === "project"
      ? recommendedProjects.length > 0
      : recommendedServices.length > 0;

  if (!hasRecommendations) return null;

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
        {type === "project"
          ? recommendedProjects.map((item) => {
              const style = getCategoryStyle(item.category);
              const minVal = item.budget.min || 0;
              const maxVal = item.budget.max || 0;
              const unit = item.budget.type === "hourly" ? "/hr" : "";
              const currency = item.budget.currency;

              let priceDisplay = "";
              if (minVal > 0 && maxVal > 0 && minVal !== maxVal) {
                priceDisplay = `${formatProjectCurrency(minVal, currency)} - ${formatProjectCurrency(maxVal, currency)}${unit}`;
              } else {
                priceDisplay = `${formatProjectCurrency(maxVal || minVal || item.budget.hourlyRate || 0, currency)}${unit}`;
              }

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
                        {item.title}
                      </h4>
                      <span className="text-sm font-bold text-foreground whitespace-nowrap ml-2">
                        {priceDisplay}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2 min-h-[2.5em]">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      <span>
                        {item.proposalsCount || 0} Bid
                        {(item.proposalsCount || 0) !== 1 ? "s" : ""}
                      </span>
                      <span>{getTimeLeft(item.postedDate)} ago</span>
                    </div>
                  </div>
                </div>
              );
            })
          : recommendedServices.map((item) => (
              <ServiceCard key={item.id} service={item as any} />
            ))}
      </div>
    </div>
  );
};
