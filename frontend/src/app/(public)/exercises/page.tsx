"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, Dumbbell, PlayCircle, ShieldCheck, Video, Info } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { ExerciseCard } from "@/components/ui/ExerciseCard";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { VERIFIED_EXERCISE_DATABASE } from "@/data/verifiedExerciseDatabase";
import { ExerciseCategory } from "@/types/exerciseVideo";

export default function ExercisesPublicPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [onlyWithVideo, setOnlyWithVideo] = useState(false);

  const categories = ["ALL", "PLYOMETRIC", "STRENGTH", "ISOMETRIC", "HYPERTROPHY", "MOBILITY"];

  const filteredExercises = VERIFIED_EXERCISE_DATABASE.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.coachingCues.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "ALL" || ex.category === selectedCategory;
    const matchesVideo = !onlyWithVideo || Boolean(ex.videoUrl);

    return matchesSearch && matchesCategory && matchesVideo;
  });

  return (
    <div className="flex flex-col min-h-screen bg-court-dark text-foreground">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 max-w-6xl space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-court-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="orange" size="sm">
                Verified Movement Library
              </Badge>
              <span className="text-xs font-mono text-emerald-400">
                {VERIFIED_EXERCISE_DATABASE.length} Evidence-Informed Exercises
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-athletic uppercase tracking-tight text-white">
              Exercise &amp; Video Database
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
              Standardized basketball performance movements with step-by-step setup instructions, evidence references, verified video demonstrations, and safety guidelines.
            </p>
          </div>

          <Link href="/register">
            <Button variant="primary" size="sm" className="shadow-glow-orange font-athletic font-bold uppercase">
              Start Assessment
            </Button>
          </Link>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search exercise name, movement cue, or equipment..."
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
                className="text-xs font-athletic uppercase font-bold"
              >
                {cat}
              </Button>
            ))}

            <button
              type="button"
              onClick={() => setOnlyWithVideo(!onlyWithVideo)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-athletic uppercase font-bold transition-colors whitespace-nowrap ${
                onlyWithVideo
                  ? "bg-court-orange/20 border-court-orange text-court-orange"
                  : "bg-court-card border-court-border text-muted-foreground hover:text-white"
              }`}
            >
              Video Only
            </button>
          </div>
        </div>

        {/* Video System Verification Banner */}
        <div className="p-3.5 rounded-2xl bg-court-charcoal/80 border border-court-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>VERTEX Standard:</strong> Every exercise video is reviewed for technical accuracy, safety regressions, and licensed source verification.
            </span>
          </div>
          <span className="text-[10px] font-mono text-court-gold shrink-0">
            Illustrative Movement Guides
          </span>
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              id={ex.id}
              name={ex.name}
              category={ex.category}
              movementPattern={ex.subcategory}
              targetSets={3}
              targetReps={ex.instructions.tempo}
              loadGuidance={ex.equipment.join(", ")}
              coachingCue={ex.coachingCues[0]}
              equipment={ex.equipment}
              videoAvailable={Boolean(ex.videoUrl)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
