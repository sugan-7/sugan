"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  Dumbbell,
  BarChart3,
  Flame,
  Calendar,
  Layers,
  Sparkles,
  FileText,
  Settings,
  HelpCircle,
  Play,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import { StreakIndicator } from "../ui/StreakIndicator";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { cn } from "@/lib/utils";

export function DesktopSidebar() {
  const pathname = usePathname();

  const navigationGroups = [
    {
      title: "Core Training",
      items: [
        { label: "Athlete Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Today's Workout", href: "/workout", icon: Dumbbell, highlight: true },
        { label: "8-Week Program", href: "/program", icon: Layers },
      ],
    },
    {
      title: "Analytics & Recovery",
      items: [
        { label: "Progress & Metrics", href: "/progress", icon: BarChart3 },
        { label: "Recovery & Readiness", href: "/recovery", icon: HeartPulse },
        { label: "Exercise Library", href: "/exercises", icon: Flame },
        { label: "AI Coach Insights", href: "/ai-coach", icon: Sparkles },
        { label: "Weekly AI Report", href: "/weekly-report", icon: FileText },
      ],
    },
    {
      title: "Platform & Admin",
      items: [
        { label: "Athlete Settings", href: "/settings", icon: Settings },
        { label: "Video Verification CMS", href: "/admin/exercises", icon: ShieldCheck },
        { label: "How VERTEX Works", href: "/how-it-works", icon: HelpCircle },
      ],
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-court-border/80 bg-court-dark/95 backdrop-blur-xl h-screen sticky top-0 shrink-0 select-none z-30">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-court-border/80">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-court-orange to-amber-500 text-white font-black text-lg shadow-glow-orange border border-amber-300/40">
            V
          </span>
          <div className="flex flex-col">
            <span className="font-mono tracking-tight text-xl font-black text-white leading-none">
              VERTEX
            </span>
            <span className="text-[9px] font-athletic uppercase tracking-widest text-court-orange font-bold mt-0.5">
              Performance Lab
            </span>
          </div>
        </Link>
        <Badge variant="gold" size="sm">v2.1</Badge>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navigationGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            <h5 className="px-3 text-[10px] font-athletic uppercase font-bold tracking-widest text-muted-foreground/80 mb-2">
              {group.title}
            </h5>
            {group.items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-athletic uppercase tracking-wider font-bold transition-all duration-150",
                    isActive
                      ? "bg-gradient-to-r from-court-orange/20 to-orange-500/10 text-court-orange border border-court-orange/40 shadow-sm"
                      : "text-muted-foreground hover:text-white hover:bg-court-card/60"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive ? "text-court-orange" : "text-muted-foreground"
                    )}
                  />
                  <span>{item.label}</span>
                  {item.highlight && !isActive && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-court-orange animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer / Quick Workout Start */}
      <div className="p-4 border-t border-court-border/80 bg-court-charcoal/40 space-y-3">
        <Link href="/workout" className="block">
          <Button
            variant="primary"
            size="sm"
            className="w-full justify-center shadow-glow-orange"
            leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
          >
            Launch Workout
          </Button>
        </Link>
        <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1 font-mono">
          <span>UTC Storage</span>
          <span className="text-emerald-400 font-bold">● Engine Online</span>
        </div>
      </div>
    </aside>
  );
}
