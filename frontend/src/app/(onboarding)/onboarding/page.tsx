import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function OnboardingPlaceholderPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 max-w-2xl">
        <div className="mb-6">
          <Badge variant="gold" className="mb-2">Phase 2 Athlete Journey Boundary</Badge>
          <h1 className="text-2xl sm:text-3xl font-black uppercase">Resumable Athlete Onboarding</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Step 1 of 8: Baseline Profile Setup
          </p>
          <ProgressBar value={12} className="mt-4" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Physical & Circumstantial Profile</CardTitle>
            <CardDescription>
              We collect your baseline physical data, timezone, basketball schedule, training history, and equipment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              The multi-step flow is scheduled for completion in <strong>Phase 2 (MVP Athlete Journey)</strong>, incorporating:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Step 1: Identity, age, height, weight, timezone</li>
              <li>Step 2: Basketball position, competitive level, games/week</li>
              <li>Step 3: Resistance & plyometric experience level</li>
              <li>Step 4: Equipment profile (dumbbells, barbells, full gym)</li>
              <li>Step 5: Manual jump assessment (standing reach, max touch)</li>
              <li>Step 6: Primary & secondary athletic goals</li>
              <li>Step 7: Training availability (days/week, duration)</li>
              <li>Step 8: Safety screening & movement contraindications</li>
            </ul>
            <div className="pt-4 flex justify-between items-center">
              <Link href="/login">
                <Button variant="ghost" size="sm">Back to Login</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="primary" size="sm">Preview Dashboard Shell</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
