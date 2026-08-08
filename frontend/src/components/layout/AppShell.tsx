"use client";

import React, { useState } from "react";
import { DesktopSidebar } from "./DesktopSidebar";
import { ResponsiveHeader } from "./ResponsiveHeader";
import { MobileBottomNav } from "./MobileBottomNav";
import { ToastProvider } from "../ui/Toast";

export interface AppShellProps {
  children: React.ReactNode;
  athleteName?: string;
  streakDays?: number;
  readinessScore?: number | null;
}

export function AppShell({
  children,
  athleteName = "Elite Athlete",
  streakDays = 0,
  readinessScore = null,
}: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-court-dark text-foreground">
        {/* Desktop Sidebar */}
        <DesktopSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-6">
          <ResponsiveHeader
            athleteName={athleteName}
            streakDays={streakDays}
            readinessScore={readinessScore}
            onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in-50 duration-200">
            {children}
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
    </ToastProvider>
  );
}
