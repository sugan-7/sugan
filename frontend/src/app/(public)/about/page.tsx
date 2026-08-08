import React from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-16 max-w-4xl">
        <Badge variant="gold" className="mb-4">Evidence-Informed Foundation</Badge>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase mb-6">
          Training Principles & Evidence Taxonomy
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-10 text-base">
          VERTEX is built on established sports science principles: progressive overload, rate of force development (RFD), stretch-shortening cycle (SSC) elasticity, and basketball workload management. We do not invent citations or make unsupported medical claims.
        </p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Resistance Training & Maximal Strength</CardTitle>
              <CardDescription>
                Lower-body maximal strength establishes the structural foundation for explosive force production. Squat variations, trap-bar pulls, and unilateral split work increase motor unit recruitment.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground border-t border-border/40 pt-4">
              <strong>Principle Classification:</strong> Research-Supported Principle. Load prescription is individualized based on reported resistance training experience.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Plyometrics & Stretch-Shortening Cycle (SSC)</CardTitle>
              <CardDescription>
                Fast eccentric-to-concentric transitions enhance tendon stiffness and elastic energy storage. Beginners progress through low-impact pogos and box jumps before advancing to depth drops.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground border-t border-border/40 pt-4">
              <strong>Safety Guardrail:</strong> High-impact depth jumps are strictly gated behind experience and safety screening. Athletes reporting current pain are restricted to low-impact preparatory movements.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Basketball Workload Spacing</CardTitle>
              <CardDescription>
                Court practice and competitive games produce high eccentric landing volume. High-intensity jump workouts are never scheduled on consecutive days or immediately following double-game days.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground border-t border-border/40 pt-4">
              <strong>Platform Heuristic:</strong> In-season programs prioritize neuromuscular maintenance and jump expression over high-volume hypertrophy.
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
