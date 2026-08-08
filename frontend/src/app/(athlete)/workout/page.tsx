"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  CheckCircle2,
  Clock,
  RotateCcw,
  SkipForward,
  AlertCircle,
  Dumbbell,
  Sparkles,
  Trophy,
  Activity,
  HeartPulse,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Timer } from "@/components/ui/Timer";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { Drawer } from "@/components/ui/Drawer";

interface ExerciseItem {
  id: string;
  name: string;
  category: "PLYOMETRIC" | "STRENGTH" | "ISOMETRIC" | "HYPERTROPHY";
  sets: number;
  reps: string;
  load: string;
  cue: string;
  mistake: string;
  equipment: string;
  completedSets: boolean[];
}

const INITIAL_EXERCISES: ExerciseItem[] = [
  {
    id: "ex-1",
    name: "Low-Amplitude Pogo Hops",
    category: "PLYOMETRIC",
    sets: 3,
    reps: "15 hops",
    load: "Bodyweight",
    cue: "Keep ankles stiff like springs. Minimum heel contact with the floor.",
    mistake: "Letting heels drop and absorb elastic force.",
    equipment: "None",
    completedSets: [false, false, false],
  },
  {
    id: "ex-2",
    name: "Depth Drops to Stick Landing",
    category: "PLYOMETRIC",
    sets: 4,
    reps: "4 reps",
    load: "20-inch Box",
    cue: "Step off the box, do not jump. Land silently in athletic universal position.",
    mistake: "Stiff-legged landing or valgus knee collapse.",
    equipment: "Plyo Box",
    completedSets: [false, false, false, false],
  },
  {
    id: "ex-3",
    name: "Trap Bar Deadlift (Speed Focus)",
    category: "STRENGTH",
    sets: 4,
    reps: "5 reps",
    load: "70% 1RM (Accelerative)",
    cue: "Drive feet through the court floor. Explosive hip extension.",
    mistake: "Rounding upper back or slow lockout.",
    equipment: "Trap Bar, Plates",
    completedSets: [false, false, false, false],
  },
  {
    id: "ex-4",
    name: "Isometric Split Squat Hold",
    category: "ISOMETRIC",
    sets: 3,
    reps: "30 sec / leg",
    load: "Bodyweight / Dumbbells",
    cue: "Front shin vertical. 90-degree knee flexion. Maximum patellar tendon loading.",
    mistake: "Leaning torso excessively forward.",
    equipment: "Dumbbells",
    completedSets: [false, false, false],
  },
  {
    id: "ex-5",
    name: "Seated Soleus Calf Raise",
    category: "HYPERTROPHY",
    sets: 3,
    reps: "12 reps",
    load: "Moderate / Controlled",
    cue: "Full stretch at the bottom. 2-second pause to isolate soleus tendon stiffness.",
    mistake: "Bouncing weights at top.",
    equipment: "Seated Bench, Dumbbells",
    completedSets: [false, false, false],
  },
];

export default function WorkoutPage() {
  const [exercises, setExercises] = useState<ExerciseItem[]>(INITIAL_EXERCISES);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [isWorkoutCompleted, setIsWorkoutCompleted] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isSkipDialogOpen, setIsSkipDialogOpen] = useState(false);
  const [isCueDrawerOpen, setIsCueDrawerOpen] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [autoStartTimer, setAutoStartTimer] = useState(false);

  // RPE & Recovery state
  const [sessionRpe, setSessionRpe] = useState<number>(7);
  const [sorenessScore, setSorenessScore] = useState<number>(3);

  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const completedSetsCount = exercises.reduce(
    (acc, ex) => acc + ex.completedSets.filter(Boolean).length,
    0
  );
  const progressPercent = totalSets > 0 ? Math.round((completedSetsCount / totalSets) * 100) : 0;

  const activeExercise = exercises[currentExerciseIndex] || exercises[0];

  const handleToggleSet = (exIndex: number, setIndex: number) => {
    setIsWorkoutStarted(true);

    setExercises((prevExercises) => {
      const updated = prevExercises.map((ex, i) => {
        if (i !== exIndex) return ex;
        const newSets = [...ex.completedSets];
        newSets[setIndex] = !newSets[setIndex];
        return { ...ex, completedSets: newSets };
      });

      const wasDone = prevExercises[exIndex].completedSets[setIndex];
      const isNowDone = !wasDone;

      // If user checked a set as done, trigger rest timer
      if (isNowDone) {
        setAutoStartTimer(true);
        setTimerKey((k) => k + 1);

        if (typeof window !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate(60);
        }

        // If all sets in this exercise are complete, advance to next exercise
        const thisExComplete = updated[exIndex].completedSets.every(Boolean);
        if (thisExComplete && exIndex < prevExercises.length - 1) {
          setCurrentExerciseIndex(exIndex + 1);
        }
      }

      // Check if total workout is 100% complete
      const totalDone = updated.reduce(
        (acc, ex) => acc + ex.completedSets.filter(Boolean).length,
        0
      );
      if (totalDone >= totalSets) {
        setIsWorkoutCompleted(true);
      }

      return updated;
    });
  };

  const handleFinishWorkout = () => {
    setIsWorkoutCompleted(true);
  };

  return (
    <AppShell streakDays={4} readinessScore={88}>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* WORKOUT HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-court-border/80 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="orange">Live Session Player</Badge>
              <span className="text-xs font-mono text-muted-foreground">
                Phase 1: Foundation • Day 12
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-athletic uppercase tracking-tight text-white">
              Tendon Stiffness & Kinetic Elasticity
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {!isWorkoutStarted && !isWorkoutCompleted && (
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsWorkoutStarted(true)}
                className="shadow-glow-orange font-black"
                leftIcon={<Play className="w-4 h-4 fill-white" />}
              >
                Start Workout
              </Button>
            )}
            {isWorkoutStarted && !isWorkoutCompleted && (
              <Button
                variant="gold"
                size="sm"
                onClick={handleFinishWorkout}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Finish Session
              </Button>
            )}
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="p-4 rounded-2xl bg-court-charcoal glass-panel border border-court-border">
          <ProgressBar
            value={progressPercent}
            color="orange"
            size="md"
            label={`Session Progress: ${completedSetsCount} / ${totalSets} Sets (${progressPercent}%)`}
            showPercentage
          />
        </div>

        {/* WORKOUT COMPLETION CELEBRATION */}
        {isWorkoutCompleted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-court-charcoal border-2 border-court-gold/60 glass-panel-elevated text-center space-y-6 shadow-glow-gold"
          >
            <div className="w-16 h-16 rounded-full bg-court-gold/20 border border-court-gold flex items-center justify-center mx-auto text-court-gold">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-5xl font-black font-athletic uppercase tracking-tight text-white">
                Workout Completed!
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Excellent effort. Your volume, tendon loading, and set completions are being logged to PostgreSQL.
              </p>
            </div>

            {/* RPE & Soreness Rating Form */}
            <div className="max-w-md mx-auto space-y-4 text-left p-6 rounded-2xl bg-court-card border border-court-border">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase font-athletic text-muted-foreground block">
                  Session Rate of Perceived Exertion (RPE 1-10): <strong className="text-court-gold">{sessionRpe}/10</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={sessionRpe}
                  onChange={(e) => setSessionRpe(parseInt(e.target.value))}
                  className="w-full accent-court-orange cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>1 (Very Easy)</span>
                  <span>7 (Hard)</span>
                  <span>10 (Max Effort)</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase font-athletic text-muted-foreground block">
                  Knee & Joint Soreness (1-10): <strong className="text-court-cyan">{sorenessScore}/10</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={sorenessScore}
                  onChange={(e) => setSorenessScore(parseInt(e.target.value))}
                  className="w-full accent-court-cyan cursor-pointer"
                />
              </div>

              <Link href="/dashboard" className="block pt-2">
                <Button variant="primary" size="md" className="w-full shadow-glow-orange">
                  Save Performance & Return to Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          /* ACTIVE EXERCISE LIST & REST TIMER */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Exercises Column */}
            <div className="lg:col-span-2 space-y-4">
              {exercises.map((ex, exIdx) => {
                const isSelected = exIdx === currentExerciseIndex;
                const exSetsDone = ex.completedSets.filter(Boolean).length;
                const isExAllDone = exSetsDone === ex.sets;

                return (
                  <div
                    key={ex.id}
                    onClick={() => setCurrentExerciseIndex(exIdx)}
                    className={`rounded-2xl p-5 glass-panel border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-court-orange bg-court-charcoal/90 shadow-glow-orange ring-1 ring-court-orange/40"
                        : isExAllDone
                        ? "border-emerald-500/40 bg-court-charcoal/40 opacity-90"
                        : "border-court-border bg-court-charcoal/50 hover:border-court-border/80"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={isExAllDone ? "emerald" : "orange"} size="sm">
                            {ex.category}
                          </Badge>
                          <span className="text-xs font-mono text-muted-foreground">
                            {ex.load}
                          </span>
                        </div>
                        <h3 className="font-athletic text-xl font-black text-white uppercase">
                          {ex.name}
                        </h3>
                      </div>

                      <span className={`text-xs font-metric font-bold px-2.5 py-1 rounded border ${
                        isExAllDone
                          ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-400"
                          : "bg-court-card border-court-border text-court-gold"
                      }`}>
                        {exSetsDone}/{ex.sets} sets • {ex.reps}
                      </span>
                    </div>

                    {/* Interactive Set Checkboxes */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-court-border/40">
                      {ex.completedSets.map((isDone, setIdx) => (
                        <button
                          key={setIdx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleSet(exIdx, setIdx);
                          }}
                          className={`p-3 rounded-xl border text-xs font-athletic uppercase font-bold transition-all duration-150 flex items-center justify-between cursor-pointer select-none active:scale-95 ${
                            isDone
                              ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-glow-emerald ring-1 ring-emerald-400/50"
                              : "bg-court-card border-court-border text-muted-foreground hover:text-white hover:border-court-orange hover:bg-court-cardHover"
                          }`}
                        >
                          <span className="tracking-wide">Set {setIdx + 1}</span>
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                          ) : (
                            <span className="w-4 h-4 rounded-full border-2 border-court-border/80 group-hover:border-court-orange" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Coaching Cue Snippet */}
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <p className="italic text-[11px] truncate max-w-sm">&ldquo;{ex.cue}&rdquo;</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentExerciseIndex(exIdx);
                          setIsCueDrawerOpen(true);
                        }}
                        className="text-court-orange hover:underline font-bold font-athletic uppercase text-[11px] shrink-0"
                      >
                        View Cues &amp; Form →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rest Timer & Action Column */}
            <div className="space-y-4">
              <Timer
                key={timerKey}
                initialSeconds={90}
                autoStart={autoStartTimer}
              />

              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Coaching Cues</CardTitle>
                  <CardDescription>{activeExercise.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                  <div className="p-3 rounded-xl bg-court-card border border-court-border">
                    <span className="font-athletic font-bold text-court-orange uppercase block mb-1">
                      Key Movement Cue:
                    </span>
                    <p>{activeExercise.cue}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/30 text-rose-200/80">
                    <span className="font-athletic font-bold text-rose-300 uppercase block mb-1">
                      Common Mistake to Avoid:
                    </span>
                    <p>{activeExercise.mistake}</p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setIsSkipDialogOpen(true)}
                  >
                    Skip / Modify Exercise
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Skip / Modify Exercise Dialog */}
        <ConfirmationDialog
          open={isSkipDialogOpen}
          onOpenChange={setIsSkipDialogOpen}
          title="Skip or Modify Exercise"
          description="If you are experiencing joint soreness or equipment unavailability, VERTEX will swap this movement for an isometric alternative."
          confirmLabel="Swap for Low-Impact Alternative"
          cancelLabel="Keep Exercise"
          variant="primary"
          onConfirm={() => {
            setIsSkipDialogOpen(false);
          }}
        />

        {/* Cues & Detail Drawer */}
        <Drawer
          open={isCueDrawerOpen}
          onClose={() => setIsCueDrawerOpen(false)}
          title={activeExercise.name}
        >
          <div className="space-y-4 text-xs text-muted-foreground">
            <div className="p-4 rounded-xl bg-court-card border border-court-border space-y-1">
              <span className="text-[10px] uppercase font-bold text-court-orange font-athletic block">
                Prescription
              </span>
              <p className="font-bold text-white text-sm">
                {activeExercise.sets} sets × {activeExercise.reps} ({activeExercise.load})
              </p>
            </div>

            <div className="p-4 rounded-xl bg-court-card border border-court-border space-y-1">
              <span className="text-[10px] uppercase font-bold text-court-gold font-athletic block">
                Primary Cue
              </span>
              <p className="text-white">{activeExercise.cue}</p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-1 text-rose-200">
              <span className="text-[10px] uppercase font-bold text-rose-400 font-athletic block">
                Common Mistake
              </span>
              <p>{activeExercise.mistake}</p>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full mt-4"
              onClick={() => setIsCueDrawerOpen(false)}
            >
              Resume Workout
            </Button>
          </div>
        </Drawer>
      </div>
    </AppShell>
  );
}
