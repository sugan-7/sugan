import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-16 max-w-4xl text-center">
        <Badge variant="gold" className="mb-4">Platform Roadmap & Access</Badge>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase mb-4">
          Transparent Athlete Access
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-12 max-w-xl mx-auto text-base">
          VERTEX is in active platform development. MVP features are currently open for registered athletes during early testing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
          <Card className="border-court-gold/60 glow-gold relative">
            <div className="absolute top-4 right-4">
              <Badge variant="gold">MVP Active</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Athlete Baseline</CardTitle>
              <CardDescription>Full access to the core VERTEX training loop</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-black font-mono">Free <span className="text-sm font-normal text-muted-foreground">(MVP Testing)</span></div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>✓ Multi-step physical & basketball onboarding</li>
                <li>✓ Safety & contraindication screening</li>
                <li>✓ Manual Jump Lab touch & vertical tracking</li>
                <li>✓ 8-week deterministic program generation</li>
                <li>✓ Mobile workout player & rest timers</li>
                <li>✓ Daily recovery check-ins & RPE tracking</li>
              </ul>
              <Link href="/register" className="block pt-4">
                <Button variant="primary" className="w-full">
                  Create Athlete Account
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="opacity-80">
            <div className="absolute top-4 right-4">
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Pro & Coach Lab</CardTitle>
              <CardDescription>Future computer vision and team management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-black font-mono text-muted-foreground">TBD</div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>• Pose-estimation camera jump analysis</li>
                <li>• Multi-athlete team & roster portal</li>
                <li>• Coach program override controls</li>
                <li>• Wearable biometric sync (Garmin / Apple)</li>
              </ul>
              <div className="pt-4">
                <Button variant="outline" disabled className="w-full">
                  Future Roadmap
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
