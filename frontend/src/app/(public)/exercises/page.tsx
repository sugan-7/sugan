import React from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const SAMPLE_CATEGORIES = [
  { name: "Strength", count: "12 exercises", description: "Squats, Trap-Bar Deadlifts, Split Squats, RDLs" },
  { name: "Plyometrics", count: "16 exercises", description: "Pogos, Depth Drops, CMJs, Tuck Jumps, Lateral Bounds" },
  { name: "Power", count: "8 exercises", description: "Jump Squats, Loaded Jumps, MB Chest Passes" },
  { name: "Jump Technique", count: "6 exercises", description: "Approach Jumps, Penultimate Step, Arm Swing Timing" },
  { name: "Acceleration & COD", count: "8 exercises", description: "Short Sprints, Lateral Deceleration, 5-10-5 Drills" },
  { name: "Mobility & Prep", count: "10 exercises", description: "Ankle Dorsiflexion, Hip Openers, Movement Prep" },
];

export default function ExercisesPublicPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-16 max-w-5xl">
        <Badge variant="gold" className="mb-4">Curated Exercise Library</Badge>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase mb-4">
          Structured Exercise Database
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-10 text-base max-w-2xl">
          Every exercise is structured with primary objectives, movement qualities, coaching cues, common mistakes, equipment requirements, and progression/regression pathways.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAMPLE_CATEGORIES.map((cat) => (
            <Card key={cat.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{cat.name}</CardTitle>
                  <Badge variant="outline">{cat.count}</Badge>
                </div>
                <CardDescription className="pt-2">{cat.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground border-t border-border/40 pt-3">
                <span>Supported in deterministic program generation rules</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
