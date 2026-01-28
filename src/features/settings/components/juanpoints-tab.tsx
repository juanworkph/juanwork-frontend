"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Coins,
  Zap,
  Gift,
  History,
  Info,
  PlayCircle,
  Rocket,
  Star,
  BadgeCheck,
  Plus,
  UserCheck,
  ShoppingBag,
  Sparkles,
  ChevronLeft,
  ChevronRight,
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

export function JuanPointsTab({
  juanPoints,
  pointsHistory,
  availableRewards,
  onWatchAd,
  onRedeemReward,
}: JuanPointsTabProps) {
  const [isWatchingAd, setIsWatchingAd] = useState(false);

  const progressToNextLevel = ((juanPoints.currentPoints % 1000) / 1000) * 100;
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
    toast.success("You earned 50 JuanPoints!");
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
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header Specific to JuanPoints */}
      {/* <header className="mb-0 hidden">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-md border border-border bg-card shadow-sm">
            <Coins className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            JuanPoints Dashboard
          </h1>
        </div>
        <p className="text-muted-foreground text-sm font-light">
          Manage your rewards, track your activity, and redeem exclusive perks.
        </p>
      </header> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Balance Card */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Total Balance
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-6xl font-bold tracking-tighter text-foreground">
                  {juanPoints.currentPoints.toLocaleString()}
                </h2>
                <span className="text-xl font-medium text-primary uppercase">
                  pts
                </span>
              </div>
            </div>
            <div>
              <Badge
                variant="outline"
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold border-primary/30 bg-primary/10 text-primary uppercase"
              >
                Level {juanPoints.level}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-muted-foreground">
                Level Progress
              </span>
              <span className="font-medium text-foreground">
                {juanPoints.currentPoints % 1000}{" "}
                <span className="text-muted-foreground">/</span> 1,000 pts
              </span>
            </div>
            <Progress
              value={progressToNextLevel}
              className="h-2 bg-secondary"
            />
            <p className="text-[13px] text-muted-foreground flex items-center gap-2">
              <Info className="h-3.5 w-3.5" />
              Earn {1000 - (juanPoints.currentPoints % 1000)} more points to
              unlock Level {juanPoints.level + 1} and exclusive benefits.
            </p>
          </div>
        </div>

        {/* Daily Actions Card */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col transition-all hover:shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary fill-primary/10" />
            <h3 className="font-semibold text-lg text-foreground">
              Daily Actions
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Complete quick tasks to boost your points daily and maintain your
            streak.
          </p>

          <div className="mt-auto space-y-6 pt-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-medium text-muted-foreground">
                <span>Daily Goal Progress</span>
                <span className="text-foreground">
                  {juanPoints.dailyWatched} / {juanPoints.dailyLimit} Tasks
                </span>
              </div>
              <Progress
                value={(juanPoints.dailyWatched / juanPoints.dailyLimit) * 100}
                className="h-1.5 bg-secondary"
              />
            </div>
            <Button
              onClick={handleWatchAd}
              disabled={!canWatchMore || isWatchingAd}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-6 rounded-md font-medium transition-colors text-sm shadow-sm"
            >
              {isWatchingAd ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <PlayCircle className="h-[18px] w-[18px]" />
              )}
              {isWatchingAd ? "Watching..." : "Watch Ad (+50 pts)"}
            </Button>
          </div>
        </div>

        {/* Available Rewards Grid */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6 mt-6">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-xl text-foreground">
                Available Rewards
              </h3>
            </div>
            <button className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
              Browse Shop
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRewards.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                canRedeem={juanPoints.currentPoints >= reward.pointsCost}
                onRedeem={() => handleRedeemReward(reward)}
              />
            ))}
          </div>
        </div>

        {/* Points History Table */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-2 mb-6 mt-8">
            <History className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-xl text-foreground">
              Points History
            </h3>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                      Activity
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                      Date
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest text-right">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {pointsHistory.map((item) => (
                    <HistoryRow key={item.id} item={item} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-muted/10 border-t border-border flex justify-between items-center">
              <span className="text-[12px] text-muted-foreground font-medium">
                Showing latest activities
              </span>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 text-muted-foreground"
                  disabled
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 text-muted-foreground"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RewardCard({
  reward,
  canRedeem,
  onRedeem,
}: {
  reward: Reward;
  canRedeem: boolean;
  onRedeem: () => void;
}) {
  const getRewardIcon = (type: Reward["type"]) => {
    switch (type) {
      case "boost":
        return <Rocket className="h-5 w-5 text-primary" />;
      case "feature":
        return <Star className="h-5 w-5 text-primary fill-primary/20" />;
      case "badge":
        return <BadgeCheck className="h-5 w-5 text-primary" />;
      case "discount":
        return <ShoppingBag className="h-5 w-5 text-primary" />;
      default:
        return <Gift className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-all group shadow-sm hover:shadow-md">
      <div className="flex gap-4 mb-6">
        <div className="bg-secondary p-3 rounded-md h-12 w-12 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/5 transition-colors">
          {getRewardIcon(reward.type)}
        </div>
        <div>
          <h4 className="font-semibold text-base mb-1 text-foreground">
            {reward.name}
          </h4>
          <p className="text-sm text-muted-foreground font-light leading-relaxed">
            {reward.description}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-primary px-2 py-1 bg-primary/10 border border-primary/20 rounded uppercase tracking-wider">
          {reward.pointsCost} PTS
        </span>
        <Button
          size="sm"
          disabled={!canRedeem || !reward.available}
          onClick={onRedeem}
          className={cn(
            "text-xs font-semibold px-4 py-2 rounded-md transition-all",
            canRedeem && reward.available
              ? "bg-foreground text-background hover:bg-foreground/90 shadow-sm"
              : "bg-muted text-muted-foreground cursor-not-allowed border border-border",
          )}
        >
          {reward.available ? (canRedeem ? "Redeem" : "Locked") : "Sold Out"}
        </Button>
      </div>
    </div>
  );
}

function HistoryRow({ item }: { item: JuanPointsHistory }) {
  const getIcon = (type: JuanPointsHistory["type"]) => {
    switch (type) {
      case "earned":
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Plus className="text-emerald-500 h-4 w-4" />
          </div>
        );
      case "redeemed":
        return (
          <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
            <ShoppingBag className="text-rose-500 h-4 w-4" />
          </div>
        );
      case "bonus":
        return (
          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Sparkles className="text-primary h-4 w-4" />
          </div>
        );
      case "expired":
        return (
          <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
            <History className="text-muted-foreground h-4 w-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <UserCheck className="text-primary h-4 w-4" />
          </div>
        );
    }
  };

  const pointsColor = item.points > 0 ? "text-emerald-500" : "text-rose-500";

  return (
    <tr className="hover:bg-muted/30 transition-colors group">
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          {getIcon(item.type)}
          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            {item.description}
          </span>
        </div>
      </td>
      <td className="px-6 py-5 text-sm text-muted-foreground">
        {formatDate(item.date)}
      </td>
      <td className="px-6 py-5 text-right">
        <span className={cn("text-sm font-bold", pointsColor)}>
          {item.points > 0 ? "+" : ""}
          {item.points}
        </span>
      </td>
    </tr>
  );
}
