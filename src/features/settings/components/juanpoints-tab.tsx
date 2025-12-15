import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Star,
  Play,
  Gift,
  TrendingUp,
  History,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
} from "lucide-react";
import {
  JuanPoints,
  JuanPointsHistory,
  Reward,
  getPointsTypeColor,
  formatDate,
} from "../schema";
import { toast } from "sonner";

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
    await new Promise((resolve) => setTimeout(resolve, 3000));
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

  const getRewardIcon = (type: Reward["type"]) => {
    switch (type) {
      case "boost":
        return <TrendingUp className="h-5 w-5" />;
      case "feature":
        return <Star className="h-5 w-5" />;
      case "badge":
        return <Trophy className="h-5 w-5" />;
      case "discount":
        return <Gift className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-purple-100 text-sm font-medium">
                Current Points
              </p>
              <Zap className="h-5 w-5 text-purple-200" />
            </div>
            <p className="text-3xl font-bold">
              {juanPoints.currentPoints.toLocaleString()}
            </p>
            <p className="text-purple-200 text-xs mt-1">
              Level {juanPoints.level}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Total Earned
              </p>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {juanPoints.totalEarned.toLocaleString()}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Rewards Redeemed
              </p>
              <Gift className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {juanPoints.rewardsRedeemed}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Total rewards
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Ads Today
              </p>
              <Play className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {juanPoints.dailyWatched}/{juanPoints.dailyLimit}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Daily limit
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress and Earn Points - 2 Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Level Progress */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Level Progress</CardTitle>
                <CardDescription>
                  {juanPoints.nextLevelPoints - juanPoints.currentPoints} points
                  to Level {juanPoints.level + 1}
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-700 text-lg px-4 py-2"
              >
                <Trophy className="h-5 w-5 mr-2" />
                Level {juanPoints.level}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progressToNextLevel} className="h-3 mb-2" />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{juanPoints.currentPoints % 1000} / 1000 points</span>
              <span>{progressToNextLevel.toFixed(0)}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Earn Points Section */}
        <Card className="border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Earn JuanPoints
            </CardTitle>
            <CardDescription>
              Watch promotional videos to earn points and unlock rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Watch an ad to earn 50 points
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {canWatchMore
                    ? `You can watch ${
                        juanPoints.dailyLimit - juanPoints.dailyWatched
                      } more ads today`
                    : "Daily limit reached. Come back tomorrow!"}
                </p>
              </div>
              <Button
                onClick={handleWatchAd}
                disabled={!canWatchMore || isWatchingAd}
                className="bg-purple-600 hover:bg-purple-700 gap-2 px-6 w-full"
                size="lg"
              >
                {isWatchingAd ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Watching Ad...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Watch Ad (+50 pts)
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Available Rewards
          </CardTitle>
          <CardDescription>
            Redeem your JuanPoints for exclusive rewards and benefits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableRewards.map((reward) => {
              const canRedeem = juanPoints.currentPoints >= reward.pointsCost;
              return (
                <div
                  key={reward.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    reward.available
                      ? canRedeem
                        ? "border-purple-300 dark:border-purple-700 bg-white dark:bg-gray-800 hover:shadow-md"
                        : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                      : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`p-2 rounded-lg ${
                        canRedeem && reward.available
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {getRewardIcon(reward.type)}
                    </div>
                    {!reward.available && (
                      <Badge variant="outline" className="text-xs">
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                  <h4 className="font-semibold text-base text-gray-900 dark:text-white mb-1">
                    {reward.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {reward.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Zap
                        className={`h-4 w-4 ${
                          canRedeem && reward.available
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`font-bold text-sm ${
                          canRedeem && reward.available
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {reward.pointsCost} pts
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant={
                        canRedeem && reward.available ? "default" : "outline"
                      }
                      onClick={() => handleRedeemReward(reward)}
                      disabled={!canRedeem || !reward.available}
                      className={
                        canRedeem && reward.available
                          ? "bg-purple-600 hover:bg-purple-700"
                          : ""
                      }
                    >
                      {canRedeem && reward.available ? "Redeem" : "Locked"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Points History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Points History
          </CardTitle>
          <CardDescription>
            Track your JuanPoints earnings and redemptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pointsHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      item.type === "earned" || item.type === "bonus"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : "bg-red-100 dark:bg-red-900/30"
                    }`}
                  >
                    {item.type === "earned" || item.type === "bonus" ? (
                      <ArrowDownRight className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(item.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-lg font-bold ${
                      item.points > 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {item.points > 0 ? "+" : ""}
                    {item.points}
                  </span>
                  <Badge
                    variant="outline"
                    className={getPointsTypeColor(item.type)}
                  >
                    {item.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
