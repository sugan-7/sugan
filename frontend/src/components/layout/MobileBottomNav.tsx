"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Flame,
  Activity,
  BarChart3,
  Dumbbell,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Jump Lab", href: "/jump-lab", icon: Activity },
    { label: "Workout", href: "/workout", icon: Dumbbell, isPrimary: true },
    { label: "Analytics", href: "/progress", icon: BarChart3 },
    { label: "Exercises", href: "/exercises", icon: Flame },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-court-dark/95 backdrop-blur-xl border-t border-court-border/80 px-2 py-1.5 shadow-2xl safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          if (item.isPrimary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center -mt-5 relative group"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 border-2",
                    isActive
                      ? "bg-gradient-to-r from-court-orange to-amber-500 text-white border-amber-300 shadow-glow-orange"
                      : "bg-court-orange text-white border-orange-400 shadow-orange-950/60"
                  )}
                >
                  <Icon className="w-5 h-5 fill-white stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-athletic uppercase tracking-wider font-bold text-court-orange mt-1">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-1 px-2 rounded-xl transition-colors font-athletic",
                isActive
                  ? "text-court-orange"
                  : "text-muted-foreground hover:text-white"
              )}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
