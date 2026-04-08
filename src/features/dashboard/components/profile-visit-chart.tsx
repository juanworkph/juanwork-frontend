"use client";

import React, { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ProfileVisitDataPoint } from "../schema/dashboard-data";
import { cn } from "@/lib/utils";

interface ProfileVisitChartProps {
  data: ProfileVisitDataPoint[];
}

const chartConfig = {
  visits: {
    label: "Visits",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function ProfileVisitChart({ data }: ProfileVisitChartProps) {
  const [timeRange, setTimeRange] = useState<"week" | "month">("week");

  return (
    <div className="lg:col-span-2 p-6 rounded-xl bg-card-accent border border-border flex flex-col h-[400px]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Profile Visits</h2>
          <p className="text-sm text-muted-foreground">Views over the last week</p>
        </div>
        <div className="flex bg-secondary/50 rounded-lg p-1 border border-border">
          <button
            onClick={() => setTimeRange("week")}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-md transition-colors",
              timeRange === "week"
                ? "bg-background text-foreground shadow-xs border border-border/50"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange("month")}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-md transition-colors",
              timeRange === "month"
                ? "bg-background text-foreground shadow-xs border border-border/50"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
          >
            Month
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-visits)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-visits)" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                dy={10}
              />
              <ChartTooltip
                cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1, strokeDasharray: "4 4" }}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                type="monotone"
                dataKey="visits"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorVisits)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
