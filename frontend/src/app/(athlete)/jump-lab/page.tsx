import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function JumpLabPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 max-w-5xl space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
          <div>
            <Badge variant="gold" className="mb-1">Manual Jump Assessment</Badge>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              VERTEX Jump Lab
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Transparent vertical jump calculations. No fabricated measurements or unverified PRs.
            </p>
          </div>

          <Link href="/onboarding">
            <Button variant="primary" size="sm">
              Record New Jump Test
            </Button>
          </Link>
        </div>

        {/* JUMP METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard
            label="Standing Vertical"
            value={null}
            unit="cm"
            statusLabel="Standing Touch - Reach"
            subtext="Calculated from manual test"
            isPlatformDerived={false}
          />
          <MetricCard
            label="Approach Vertical"
            value={null}
            unit="cm"
            statusLabel="Approach Touch - Reach"
            subtext="Full approach jump"
            isPlatformDerived={false}
          />
          <MetricCard
            label="Approach Advantage"
            value={null}
            unit="cm"
            statusLabel="Approach - Standing"
            subtext="Kinetic conversion index"
            isPlatformDerived={true}
          />
        </div>

        {/* JUMP TEST HISTORY & CAMERA PLACEHOLDER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Historical Jump Log</CardTitle>
              <CardDescription>Verified manual test records in chronological order</CardDescription>
            </CardHeader>
            <CardContent>
              <EmptyState
                title="Insufficient data"
                description="No historical jump tests recorded yet. Record your standing reach and touches in Phase 2."
              />
            </CardContent>
          </Card>

          <Card className="opacity-80">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Computer Vision Camera Test</CardTitle>
                <Badge variant="secondary">Feature-Flagged</Badge>
              </div>
              <CardDescription>Pose estimation and jump event detection</CardDescription>
            </CardHeader>
            <CardContent>
              <EmptyState
                title="Coming soon"
                description="Automatic camera-based jump tracking is currently behind the VIDEO_ANALYSIS feature flag."
              />
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
