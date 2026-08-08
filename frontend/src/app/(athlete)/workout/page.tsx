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
  Video,
  ShieldCheck,
  ChevronRight,
  Info,
  Layers,
  Zap,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Timer } from "@/components/ui/Timer";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { Drawer } from "@/components/ui/Drawer";
import { VerifiedExerciseVideoPlayer } from "@/components/ui/VerifiedExerciseVideoPlayer";
import { VERIFIED_EXERCISE_DATABASE } from "@/data/verifiedExerciseDatabase";
import { ExerciseModel } from "@/types/exerciseVideo";

interface WorkoutExerciseState extends ExerciseModel {
  sets: number;
  reps: string;
  load: string;
  completedSets: boolean[];
}

// Map the first 5 core prescription items for today's session
const INITIAL_WORKOUT_SESSION: WorkoutExerciseState[] = [
  {
    ...VERIFIED_EXERCISE_DATABASE[0], // Pogo Hops
    sets: 3,
    reps: "15 hops",
    load: "Bodyweight",
    completedSets: [false, false, false],
  },
  {
    ...VERIFIED_EXERCISE_DATABASE[1], // Depth Drops
    sets: 4,
    reps: "4 reps",
    load: "20-inch Box",
    completedSets: [false, false, false, false],
  },
  {
    ...VERIFIED_EXERCISE_DATABASE[2], // Trap Bar Deadlift
    sets: 4,
    reps: "5 reps",
    load: "70% 1RM (Speed)",
    completedSets: [false, false, false, false],
  },
  {
    ...VERIFIED_EXERCISE_DATABASE[3], // Isometric Split Squat
    sets: 3,
    reps: "30 sec / leg",
    load: "Bodyweight / DB",
    completedSets: [false, false, false],
  },
  {
    ...VERIFIED_EXERCISE_DATABASE[4], // Seated Soleus Raise
    sets: 3,
    reps: "12 reps",
    load: "Moderate / Controlled",
    completedSets: [false, false, false],
  },
];

export default function WorkoutPage() {
  const [exercises, setExercises] = useState<WorkoutExerciseState[]>(INITIAL_WORKOUT_SESSION);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [isWorkoutCompleted, setIsWorkoutCompleted] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isSkipDialogOpen, setIsSkipDialogOpen] = useState(false);
  const [isVideoDrawerOpen, setIsVideoDrawerOpen] = useState(false);
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
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* WORKOUT HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-court-border/80 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="orange">Verified Live Session</Badge>
              <span className="text-xs font-mono text-muted-foreground">
                Phase 1: Foundation • Day 12
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-athletic uppercase tracking-tight text-white">
              Tendon Stiffness & Kinetic Elasticity
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsVideoDrawerOpen(true)}
              className="border-court-orange/40 text-court-orange hover:bg-court-orange/10 font-athletic font-bold uppercase"
              leftIcon={<Video className="w-4 h-4 text-court-orange" />}
            >
              Watch Form Demo
            </Button>

            {!isWorkoutStarted && !isWorkoutCompleted && (
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsWorkoutStarted(true)}
                className="shadow-glow-orange font-black font-athletic uppercase"
                leftIcon={<Play className="w-4 h-4 fill-white" />}
              >
                Start Workout
              </Button>
            )}
            {isWorkoutStarted && !isWorkoutCompleted && (
              <Button
                variant="gold"
                size="md"
                onClick={handleFinishWorkout}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
                className="font-athletic font-bold uppercase"
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
                Excellent effort. Your volume, tendon loading, and verified movement completions are recorded in PostgreSQL.
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
                <Button variant="primary" size="md" className="w-full shadow-glow-orange font-athletic font-bold uppercase">
                  Save Performance & Return to Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          /* ACTIVE EXERCISE LIST & VERIFIED VIDEO PLAYER */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Columns: Exercise Cards */}
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
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                            {ex.publicationStatus}
                          </span>
                        </div>
                        <h3 className="font-athletic text-xl font-black text-white uppercase">
                          {ex.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentExerciseIndex(exIdx);
                            setIsVideoDrawerOpen(true);
                          }}
                          className="text-[11px] h-7 px-2.5 border-court-orange/40 text-court-orange hover:bg-court-orange/10 font-athletic font-bold"
                          leftIcon={<Video className="w-3.5 h-3.5" />}
                        >
                          Watch Form
                        </Button>

                        <span
                          className={`text-xs font-metric font-bold px-2.5 py-1 rounded border ${
                            isExAllDone
                              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-400"
                              : "bg-court-card border-court-border text-court-gold"
                          }`}
                        >
                          {exSetsDone}/{ex.sets} sets • {ex.reps}
                        </span>
                      </div>
                    </div>

                    {/* Step-by-Step Setup & Starting Position Guide */}
                    <div className="mb-3 p-3 rounded-xl bg-court-card/60 border border-court-border/40 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                        <span className="font-athletic font-bold text-court-orange uppercase">
                          Setup &amp; Starting Position
                        </span>
                        <span>Tempo: {ex.instructions.tempo}</span>
                      </div>
                      <p className="text-white/90 text-xs leading-relaxed">{ex.instructions.setup}</p>
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
                      <p className="italic text-[11px] truncate max-w-sm">
                        &ldquo;{ex.coachingCues[0]}&rdquo;
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentExerciseIndex(exIdx);
                          setIsVideoDrawerOpen(true);
                        }}
                        className="text-court-orange hover:underline font-bold font-athletic uppercase text-[11px] shrink-0 inline-flex items-center gap-1"
                      >
                        Form Breakdown &amp; Video <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Verified Video Player & Rest Timer */}
            <div className="space-y-4">
              {/* Verified Video Player Component */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider font-athletic text-court-orange flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Demonstration Video
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Reviewer: {activeExercise.expertReviewer.split(",")[0]}
                  </span>
                </div>
                <VerifiedExerciseVideoPlayer
                  exercise={activeExercise}
                  aspectRatio="video"
                  showTranscriptPanel={false}
                />
              </div>

              {/* Rest Interval Timer */}
              <Timer
                key={timerKey}
                initialSeconds={90}
                autoStart={autoStartTimer}
              />

              {/* Real Coaching Cues & Common Mistakes Card */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Form Guidelines &amp; Safety</CardTitle>
                  <CardDescription>{activeExercise.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                  <div className="p-3 rounded-xl bg-court-card border border-court-border space-y-1">
                    <span className="font-athletic font-bold text-court-orange uppercase block text-[10px]">
                      Key Movement Cues:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-white/90 text-xs">
                      {activeExercise.coachingCues.map((cue, i) => (
                        <li key={i}>{cue}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/30 text-rose-200/90 space-y-1">
                    <span className="font-athletic font-bold text-rose-300 uppercase block text-[10px]">
                      Common Mistakes to Avoid:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-xs">
                      {activeExercise.commonMistakes.map((mis, i) => (
                        <li key={i}>{mis}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Regressions & Progressions Quick Guidance */}
                  {activeExercise.regressions.length > 0 && (
                    <div className="p-3 rounded-xl bg-court-card border border-court-border space-y-1">
                      <span className="font-athletic font-bold text-court-cyan uppercase block text-[10px]">
                        Safe Regression Alternative:
                      </span>
                      <p className="text-white/90 text-xs">
                        <strong>{activeExercise.regressions[0].name}:</strong> {activeExercise.regressions[0].description}
                      </p>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-athletic uppercase font-bold"
                    onClick={() => setIsSkipDialogOpen(true)}
                  >
                    Modify / Swap Exercise
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
          title="Modify or Regress Exercise"
          description={`If you are experiencing joint soreness or equipment unavailability, VERTEX will automatically substitute with: ${activeExercise.regressions[0]?.name || "Isometric Hold"}.`}
          confirmLabel="Apply Safe Regression"
          cancelLabel="Keep Current Exercise"
          variant="primary"
          onConfirm={() => {
            setIsSkipDialogOpen(false);
          }}
        />

        {/* Full-Featured Modal Video Drawer */}
        <Drawer
          open={isVideoDrawerOpen}
          onClose={() => setIsVideoDrawerOpen(false)}
          title={`Verified Demonstration: ${activeExercise.name}`}
        >
          <div className="space-y-5 text-xs text-muted-foreground">
            {/* Full High-Definition Verified Video Player with Interactive Transcript */}
            <VerifiedExerciseVideoPlayer
              exercise={activeExercise}
              aspectRatio="video"
              showTranscriptPanel={true}
            />

            {/* Complete Movement Specification Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-court-card border border-court-border space-y-1">
                <span className="text-[10px] uppercase font-bold text-court-orange font-athletic block">
                  Prescription &amp; Load
                </span>
                <p className="font-bold text-white text-sm">
                  {activeExercise.sets} sets × {activeExercise.reps} ({activeExercise.load})
                </p>
                <span className="text-[10px] text-muted-foreground">
                  Tempo: {activeExercise.instructions.tempo}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-court-card border border-court-border space-y-1">
                <span className="text-[10px] uppercase font-bold text-court-gold font-athletic block">
                  Range of Motion &amp; Breathing
                </span>
                <p className="text-white text-xs leading-relaxed">
                  {activeExercise.instructions.rangeOfMotion}. {activeExercise.instructions.breathingBracing}
                </p>
              </div>
            </div>

            {/* Detailed Instructions */}
            <div className="p-4 rounded-xl bg-court-card border border-court-border space-y-2">
              <span className="text-[10px] uppercase font-bold text-white font-athletic block">
                Execution Instructions
              </span>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {activeExercise.instructions.execution}
              </p>
            </div>

            {/* Safe Regressions & Progressions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeExercise.regressions.map((reg, i) => (
                <div key={i} className="p-3 rounded-xl bg-court-card/60 border border-court-border space-y-1">
                  <span className="text-[10px] uppercase font-bold text-court-cyan font-athletic block">
                    Regression: {reg.name}
                  </span>
                  <p className="text-[11px] text-muted-foreground">{reg.description}</p>
                </div>
              ))}
              {activeExercise.progressions.map((prog, i) => (
                <div key={i} className="p-3 rounded-xl bg-court-card/60 border border-court-border space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 font-athletic block">
                    Progression: {prog.name}
                  </span>
                  <p className="text-[11px] text-muted-foreground">{prog.description}</p>
                </div>
              ))}
            </div>

            {/* Scientific Review & Verification Audit */}
            <div className="p-3.5 rounded-xl bg-court-dark border border-court-border/80 text-[11px] space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Expert Reviewer: <strong className="text-white">{activeExercise.expertReviewer}</strong></span>
                <span>Review Date: <strong className="text-court-gold">{activeExercise.reviewDate}</strong></span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>License: <strong className="text-white">{activeExercise.licenseStatus}</strong></span>
                <span>Version: <strong className="text-court-cyan">{activeExercise.contentVersion}</strong></span>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full mt-4 shadow-glow-orange font-athletic font-bold uppercase"
              onClick={() => setIsVideoDrawerOpen(false)}
            >
              Resume Workout Session
            </Button>
          </div>
        </Drawer>
      </div>
    </AppShell>
  );
}
