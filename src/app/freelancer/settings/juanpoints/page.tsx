"use client";

import React, { useState } from "react";
import { JuanPointsTab } from "@/features/settings/components";
import { mockSettingsData } from "@/features/settings/schema";

export default function JuanPointsSettingsPage() {
  const [data, setData] = useState(mockSettingsData);

  const handleWatchAd = () => {
    setData((prev) => ({
      ...prev,
      juanPoints: {
        ...prev.juanPoints,
        currentPoints: prev.juanPoints.currentPoints + 50,
        dailyWatched: prev.juanPoints.dailyWatched + 1,
      },
      pointsHistory: [
        {
          id: Math.random().toString(),
          type: "earned",
          points: 50,
          description: "Watched promotional video",
          date: new Date().toISOString(),
        },
        ...prev.pointsHistory,
      ],
    }));
  };

  const handleRedeemReward = (rewardId: string) => {
    const reward = data.availableRewards.find((r) => r.id === rewardId);
    if (!reward) return;

    setData((prev) => ({
      ...prev,
      juanPoints: {
        ...prev.juanPoints,
        currentPoints: prev.juanPoints.currentPoints - reward.pointsCost,
        rewardsRedeemed: prev.juanPoints.rewardsRedeemed + 1,
      },
      pointsHistory: [
        {
          id: Math.random().toString(),
          type: "redeemed",
          points: -reward.pointsCost,
          description: `Redeemed: ${reward.name}`,
          date: new Date().toISOString(),
        },
        ...prev.pointsHistory,
      ],
    }));
  };

  return (
    <div className="pb-10">
      <JuanPointsTab
        juanPoints={data.juanPoints}
        pointsHistory={data.pointsHistory}
        availableRewards={data.availableRewards}
        onWatchAd={handleWatchAd}
        onRedeemReward={handleRedeemReward}
      />
    </div>
  );
}
