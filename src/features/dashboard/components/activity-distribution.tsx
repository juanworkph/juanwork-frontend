"use client";

import React, { useEffect, useState } from "react";
import { ActivityDistributionItem } from "../schema/dashboard-data";
import { cn } from "@/lib/utils";

interface ActivityDistributionProps {
  data: ActivityDistributionItem[];
}

export function ActivityDistribution({ data }: ActivityDistributionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // SVG parameters
  const size = 200;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const dataWithOffsets = data.reduce((acc, item) => {
    const fraction = item.value / total;
    const offset = acc.currentOffset;
    acc.currentOffset += fraction * circumference;
    acc.items.push({ ...item, fraction, offset });
    return acc;
  }, { currentOffset: 0, items: [] as (ActivityDistributionItem & { fraction: number; offset: number })[] }).items;

  return (
    <div className="p-6 rounded-xl bg-card-accent border border-border flex flex-col h-[400px]">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight">Summary Overview</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="relative w-[200px] h-[200px] flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="hsl(var(--secondary))"
              strokeWidth={strokeWidth}
            />

            {dataWithOffsets.map((item, index) => {
              const strokeDasharray = `${item.fraction * circumference} ${circumference}`;
              const strokeDashoffset = -item.offset;

              return (
                <circle
                  key={index}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className={cn("transition-all duration-1000 ease-in-out", mounted ? "opacity-100" : "opacity-0")}
                  style={{
                    // fallback animation just handles stroke initial state
                    strokeDasharray: mounted ? strokeDasharray : `0 ${circumference}`,
                  }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-extrabold tracking-tight">{total}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Total</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full max-w-[240px]">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-medium text-muted-foreground">
                  {item.label}
                </span>
              </div>
              <span className="text-xs font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
