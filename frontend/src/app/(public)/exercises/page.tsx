"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, Dumbbell, PlayCircle, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { ExerciseCard } from "@/components/ui/ExerciseCard";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function ExercisesPublicPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const exerciseDatabase = [
    {
      id: "ex-1",
      name: "Low-Amplitude Pogo Hops",
      category: "PLYOMETRIC" as const,
      movementPattern: "Ankle Plantarflexion",
      targetSets: 3,
      targetReps: "15 reps",
      loadGuidance: "Bodyweight",
      coachingCue: "Stiff ankles like springs. Minimum ground contact time.",
      equipment: ["None"],
      videoAvailable: true,
    },
    {
      id: "ex-2",
      name: "Depth Drops to Stick",
      category: "PLYOMETRIC" as const,
      movementPattern: "Landing Deceleration",
      targetSets: 4,
      targetReps: "4 reps",
      loadGuidance: "20-in Box",
      coachingCue: "Step off, do not jump. Land silently in athletic position.",
      equipment: ["Plyo Box"],
      videoAvailable: true,
    },
    {
      id: "ex-3",
      name: "Trap Bar Deadlift (RFD Speed)",
      category: "STRENGTH" as const,
      movementPattern: "Hip Hinge",
      targetSets: 4,
      targetReps: "5 reps",
      loadGuidance: "70% 1RM Accelerative",
      coachingCue: "Drive feet through floor. Explosive hip lockout.",
      equipment: ["Trap Bar", "Plates"],
      videoAvailable: true,
    },
    {
      id: "ex-4",
      name: "Isometric Split Squat",
      category: "ISOMETRIC" as const,
      movementPattern: "Knee Dominant Hold",
      targetSets: 3,
      targetReps: "30s hold",
      loadGuidance: "Bodyweight",
      coachingCue: "Front shin vertical. 90-degree knee flexion.",
      equipment: ["None"],
      videoAvailable: false,
    },
    {
      id: "ex-5",
      name: "Seated Soleus Calf Raise",
      category: "HYPERTROPHY" as const,
      movementPattern: "Soleus Isolation",
      targetSets: 3,
      targetReps: "12 reps",
      loadGuidance: "Moderate Weight",
      coachingCue: "Full stretch at bottom. 2-second pause.",
      equipment: ["Dumbbells", "Bench"],
      videoAvailable: false,
    },
    {
      id: "ex-6",
      name: "Penultimate Step Approach Bounds",
      category: "PLYOMETRIC" as const,
      movementPattern: "Horizontal to Vertical Conversion",
      targetSets: 4,
      targetReps: "3 per side",
      loadGuidance: "Max Speed",
      coachingCue: "Low penultimate plant foot, punch the block foot.",
      equipment: ["Court / Open Space"],
      videoAvailable: true,
    },
  ];

  const categories = ["ALL", "PLYOMETRIC", "STRENGTH", "ISOMETRIC", "HYPERTROPHY"];

  const filteredExercises = exerciseDatabase.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || ex.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-court-dark text-foreground">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 max-w-6xl space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-court-border/80 pb-6">
          <div>
            <Badge variant="orange" size="sm" className="mb-1">
              Biomechanical Movement Library
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black font-athletic uppercase tracking-tight text-white">
              Exercise Database
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Validated movement patterns with coaching cues, load parameters, and video demonstrations.
            </p>
          </div>

          <Link href="/register">
            <Button variant="primary" size="sm" className="shadow-glow-orange">
              Start Assessment
            </Button>
          </Link>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search exercise name or cue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "primary" : "secondary"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="text-xs"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              id={ex.id}
              name={ex.name}
              category={ex.category}
              movementPattern={ex.movementPattern}
              targetSets={ex.targetSets}
              targetReps={ex.targetReps}
              loadGuidance={ex.loadGuidance}
              coachingCue={ex.coachingCue}
              equipment={ex.equipment}
              videoAvailable={ex.videoAvailable}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
