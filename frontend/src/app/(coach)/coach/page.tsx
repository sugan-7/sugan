import React from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { FeatureGuard } from "@/components/common/FeatureGuard";

export default function CoachPortalPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
        <FeatureGuard
          featureName="Coach Portal"
          isAvailable={false}
          comingSoonDescription="Multi-athlete management, roster analytics, and coach program override controls are protected behind the COACH_MODE feature flag."
        >
          <div className="text-xl font-bold">Coach Portal Active</div>
        </FeatureGuard>
      </main>

      <Footer />
    </div>
  );
}
