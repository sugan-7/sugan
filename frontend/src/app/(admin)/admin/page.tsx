import React from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { FeatureGuard } from "@/components/common/FeatureGuard";

export default function AdminPortalPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
        <FeatureGuard
          featureName="System Administration"
          isAvailable={false}
          comingSoonDescription="Exercise library catalog management, training rule parameters, and compliance audit logs are restricted to platform administrators with ROLE_ADMIN."
        >
          <div className="text-xl font-bold">Admin Portal Active</div>
        </FeatureGuard>
      </main>

      <Footer />
    </div>
  );
}
