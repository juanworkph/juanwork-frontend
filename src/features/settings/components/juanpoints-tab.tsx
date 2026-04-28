"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Zap,
  Gift,
  History,
  Info,
  PlayCircle,
  Rocket,
  Star,
  BadgeCheck,
  Plus,
  Minus,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Percent,
  ShieldCheck,
  Tv,
  Headphones,
} from "lucide-react";
import { JuanPoints, JuanPointsHistory, Reward, formatDate } from "../schema";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface JuanPointsTabProps {
  juanPoints: JuanPoints;
  pointsHistory: JuanPointsHistory[];
  availableRewards: Reward[];
  onWatchAd: () => void;
  onRedeemReward: (rewardId: string) => void;
}

/**
 * JuanPoints Rewards Dashboard
 * Premium dashboard-style UI for managing loyalty points, daily activities, and rewards.
 */
export function JuanPointsTab({
  juanPoints,
  pointsHistory,
  availableRewards,
  onWatchAd,
  onRedeemReward,
}: JuanPointsTabProps) {
  const [isWatchingAd, setIsWatchingAd] = useState(false);

  const canWatchMore = juanPoints.dailyWatched < juanPoints.dailyLimit;

  const handleWatchAd = async () => {
    if (!canWatchMore) {
      toast.error("Daily limit reached. Come back tomorrow!");
      return;
    }

    setIsWatchingAd(true);
    // Simulate watching ad
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onWatchAd();
    setIsWatchingAd(false);
    toast.success("You earned 20 JuanPoints!");
  };

  const handleRedeemReward = (reward: Reward) => {
    if (juanPoints.currentPoints < reward.pointsCost) {
      toast.error("Not enough JuanPoints!");
      return;
    }
    onRedeemReward(reward.id);
    toast.success(`${reward.name} redeemed successfully!`);
  };

  return (
    <main className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
      <div className="space-y-10">
        {/* Hero Section: Points + Daily Goal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Current Points Card */}
          <div className="md:col-span-8 p-10 rounded-[32px] shadow-lg relative overflow-hidden bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
            {/* Abstract decorative shapes */}
            <div className="absolute w-1 h-24 top-0 right-24 rotate-12 bg-black/10 rounded" />
            <div className="absolute w-1 h-32 bottom-0 right-32 -rotate-45 bg-black/10 rounded" />
            <div className="absolute w-24 h-1 top-1/2 -right-8 bg-black/10 rounded" />

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  CURRENT POINTS
                </h3>
                <div className="flex items-center gap-4 text-white">
                  <Zap className="h-14 w-14 fill-white" />
                  <div className="flex items-baseline gap-2">
                    <span className="text-7xl font-display font-bold  tracking-tight">
                      {juanPoints.currentPoints.toLocaleString()}
                    </span>
                    <span className=" font-bold text-2xl">PTS</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  className="bg-black text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-all mb-6"
                  aria-label="Buy JuanPoints"
                  tabIndex={0}
                >
                  Buy Points
                </Button>
                <div className="flex items-start gap-2 max-w-md">
                  <Info className="h-4 w-4 text-white/90 mt-0.5 flex-shrink-0" />
                  <p className="text-xs font-medium text-white/90 leading-relaxed">
                    Points can be used to unlock premium features, boost your
                    profile visibility, and gain exclusive badges to stand out
                    from other freelancers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Goal Card */}
          <div className="md:col-span-4 p-8 bg-card border border-border rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  Daily Goal
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Complete your daily milestones to earn points and stay
                competitive.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  <span>Tasks Completed</span>
                  <span className="text-primary">
                    {juanPoints.dailyWatched} / {juanPoints.dailyLimit}
                  </span>
                </div>
                <Progress
                  value={
                    (juanPoints.dailyWatched / juanPoints.dailyLimit) * 100
                  }
                  className="h-1.5 bg-secondary"
                />
              </div>
              <Button
                onClick={handleWatchAd}
                disabled={!canWatchMore || isWatchingAd}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 active:scale-[0.98]"
                aria-label="Watch advertisement to earn 20 points"
                tabIndex={0}
              >
                {isWatchingAd ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <PlayCircle className="h-[18px] w-[18px]" />
                )}
                {isWatchingAd ? "Watching..." : "Watch Ad (+20 pts)"}
              </Button>
            </div>
          </div>
        </div>

        {/* Available Rewards Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                <h2 className="font-display font-bold text-2xl text-foreground">
                  Available Rewards
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Redeem your hard-earned points for platform benefits
              </p>
            </div>
            <button
              className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-1"
              aria-label="Browse rewards shop"
              tabIndex={0}
            >
              Browse Shop{" "}
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {availableRewards.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                canRedeem={juanPoints.currentPoints >= reward.pointsCost}
                onRedeem={() => handleRedeemReward(reward)}
              />
            ))}
          </div>
        </section>

        {/* Points History Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <h2 className="font-display font-bold text-2xl text-foreground">
              Points History
            </h2>
          </div>

          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground border-b border-border bg-muted/30">
                  <th className="px-8 py-5">Activity</th>
                  <th className="px-8 py-5">Date &amp; Time</th>
                  <th className="px-8 py-5 text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pointsHistory.map((item) => (
                  <HistoryRow key={item.id} item={item} />
                ))}
              </tbody>
            </table>

            <div className="px-8 py-5 border-t border-border flex items-center justify-between bg-muted/10">
              <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">
                Showing last {pointsHistory.length} transactions
              </span>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="w-10 h-10 rounded-xl"
                  disabled
                  aria-label="Previous page"
                  tabIndex={0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="w-10 h-10 rounded-xl"
                  aria-label="Next page"
                  tabIndex={0}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/** Reward Card Component */
interface RewardCardProps {
  reward: Reward;
  canRedeem: boolean;
  onRedeem: () => void;
}

function RewardCard({ reward, canRedeem, onRedeem }: RewardCardProps) {
  /**
   * Returns icon and color configuration based on reward type and name
   */
  const getRewardConfig = (reward: Reward) => {
    // Name-based matching for specific rewards
    const nameLower = reward.name.toLowerCase();

    if (nameLower.includes("analytics")) {
      return {
        icon: <BarChart3 className="h-5 w-5 text-purple-600" />,
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
      };
    }
    if (nameLower.includes("priority") || nameLower.includes("support")) {
      return {
        icon: <Headphones className="h-5 w-5 text-indigo-500" />,
        bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      };
    }
    if (nameLower.includes("ad-free") || nameLower.includes("ad free")) {
      return {
        icon: <Tv className="h-5 w-5 text-cyan-500" />,
        bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
      };
    }
    if (nameLower.includes("skill") || nameLower.includes("verification")) {
      return {
        icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />,
        bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      };
    }

    // Type-based fallback
    switch (reward.type) {
      case "boost":
        return {
          icon: <Rocket className="h-5 w-5 text-blue-500" />,
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
        };
      case "feature":
        return {
          icon: <Star className="h-5 w-5 text-yellow-500" />,
          bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
        };
      case "badge":
        return {
          icon: <BadgeCheck className="h-5 w-5 text-primary" />,
          bgColor: "bg-orange-50 dark:bg-orange-900/20",
        };
      case "discount":
        return {
          icon: <Percent className="h-5 w-5 text-green-500" />,
          bgColor: "bg-green-50 dark:bg-green-900/20",
        };
      default:
        return {
          icon: <Gift className="h-5 w-5 text-primary" />,
          bgColor: "bg-orange-50 dark:bg-orange-900/20",
        };
    }
  };

  const config = getRewardConfig(reward);

  return (
    <div className="p-6 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-md transition-all group flex flex-col h-full">
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
          config.bgColor,
        )}
      >
        {config.icon}
      </div>
      <h4 className="font-bold text-sm mb-1 text-foreground">{reward.name}</h4>
      <p className="text-[11px] text-muted-foreground mb-6 flex-grow leading-relaxed">
        {reward.description}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <span className="text-primary font-bold text-sm">
          {reward.pointsCost} PTS
        </span>
        <Button
          size="sm"
          disabled={!canRedeem || !reward.available}
          onClick={onRedeem}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
            canRedeem && reward.available
              ? "bg-foreground text-background hover:bg-primary hover:text-white"
              : "bg-muted text-muted-foreground cursor-not-allowed",
          )}
          aria-label={`Redeem ${reward.name} for ${reward.pointsCost} points`}
          tabIndex={0}
        >
          {reward.available ? (canRedeem ? "Redeem" : "Locked") : "Sold Out"}
        </Button>
      </div>
    </div>
  );
}

/** History Row Component */
function HistoryRow({ item }: { item: JuanPointsHistory }) {
  const getIcon = (type: JuanPointsHistory["type"]) => {
    switch (type) {
      case "earned":
        return (
          <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 text-green-500 flex items-center justify-center border border-green-100 dark:border-green-800/50">
            <Plus className="h-4 w-4" />
          </div>
        );
      case "redeemed":
        return (
          <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center border border-red-100 dark:border-red-800/50">
            <Minus className="h-4 w-4" />
          </div>
        );
      case "bonus":
        return (
          <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 text-green-500 flex items-center justify-center border border-green-100 dark:border-green-800/50">
            <Plus className="h-4 w-4" />
          </div>
        );
      case "expired":
        return (
          <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center border border-border">
            <History className="h-4 w-4" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
            <Plus className="h-4 w-4" />
          </div>
        );
    }
  };

  const pointsColor = item.points > 0 ? "text-green-500" : "text-red-500";

  return (
    <tr className="group hover:bg-muted/30 transition-colors">
      <td className="px-8 py-5">
        <div className="flex items-center gap-4">
          {getIcon(item.type)}
          <div>
            <span className="font-semibold block text-foreground">
              {item.description}
            </span>
            {item.activityType && (
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                {item.activityType}
              </span>
            )}
          </div>
        </div>
      </td>
      <td className="px-8 py-5 text-muted-foreground text-xs">
        {formatDate(item.date)}
      </td>
      <td className="px-8 py-5 text-right">
        <span className={cn("text-lg font-bold", pointsColor)}>
          {item.points > 0 ? "+" : ""}
          {item.points}
        </span>
      </td>
    </tr>
  );
}
