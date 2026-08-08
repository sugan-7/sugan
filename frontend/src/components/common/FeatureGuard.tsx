import React from "react";
import { EmptyState } from "../ui/EmptyState";

export interface FeatureGuardProps {
  featureName: string;
  isAvailable?: boolean;
  children: React.ReactNode;
  comingSoonDescription?: string;
}

export function FeatureGuard({
  featureName,
  isAvailable = false,
  children,
  comingSoonDescription = "This feature is currently in active development or behind a controlled rollout flag.",
}: FeatureGuardProps) {
  if (!isAvailable) {
    return (
      <div className="p-6">
        <EmptyState
          title="Coming soon"
          description={`${featureName}: ${comingSoonDescription}`}
        />
      </div>
    );
  }

  return <>{children}</>;
}
