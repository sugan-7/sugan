"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
} from "recharts";
import { cn } from "@/lib/utils";

export interface DataPoint {
  date: string;
  vertical?: number;
  standingReach?: number;
  readiness?: number;
  volume?: number;
}

export interface ProgressChartProps {
  data: DataPoint[];
  dataKey?: string;
  color?: "orange" | "gold" | "cyan" | "emerald";
  title?: string;
  unit?: string;
  height?: number;
  className?: string;
}

export function ProgressChart({
  data,
  dataKey = "vertical",
  color = "orange",
  title,
  unit = "cm",
  height = 240,
  className,
}: ProgressChartProps) {
  const colorMap = {
    orange: { stroke: "#FF6B00", fill: "#FF6B00", gradientId: "gradOrange" },
    gold: { stroke: "#F59E0B", fill: "#F59E0B", gradientId: "gradGold" },
    cyan: { stroke: "#38BDF8", fill: "#38BDF8", gradientId: "gradCyan" },
    emerald: { stroke: "#10B981", fill: "#10B981", gradientId: "gradEmerald" },
  };

  const selectedColor = colorMap[color] || colorMap.orange;

  if (!data || data.length === 0) {
    return (
      <div
        className={cn(
          "rounded-2xl p-6 bg-court-charcoal/60 glass-panel border border-court-border text-center flex flex-col items-center justify-center space-y-2",
          className
        )}
        style={{ height }}
      >
        <span className="font-athletic text-base font-extrabold text-foreground uppercase">
          {title || "Vertical Jump Trajectory"}
        </span>
        <span className="text-xs text-muted-foreground italic font-athletic">
          Insufficient historical test data
        </span>
        <span className="text-[11px] text-muted-foreground/80 max-w-xs">
          Perform at least 2 manual jump tests to render your performance slope.
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl p-5 bg-court-charcoal/80 glass-panel border border-court-border flex flex-col justify-between relative overflow-hidden",
        className
      )}
    >
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-athletic text-lg font-black text-white uppercase tracking-tight">
            {title}
          </h4>
          <span className="text-xs font-mono font-bold text-muted-foreground">
            Unit: {unit}
          </span>
        </div>
      )}

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={selectedColor.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={selectedColor.fill} stopOpacity={0.4} />
                <stop offset="95%" stopColor={selectedColor.fill} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#232F46" opacity={0.6} />
            <XAxis
              dataKey="date"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={["dataMin - 5", "dataMax + 5"]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl p-3 bg-court-dark border border-court-border shadow-2xl text-xs font-mono">
                      <p className="text-muted-foreground">{payload[0].payload.date}</p>
                      <p className="font-black text-white text-base">
                        {payload[0].value} {unit}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={selectedColor.stroke}
              strokeWidth={3}
              fillOpacity={1}
              fill={`url(#${selectedColor.gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
