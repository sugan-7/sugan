"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Activity,
  Dumbbell,
  ShieldCheck,
  Target,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Stepper } from "@/components/ui/Stepper";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { MetricCard } from "@/components/ui/MetricCard";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Athlete Profile
    age: "21",
    heightCm: "188",
    weightKg: "82",
    timezone: "UTC-5 (Eastern Time)",

    // Step 2: Basketball Profile
    position: "Shooting Guard",
    level: "Collegiate / High Level Club",
    gamesPerWeek: "2",

    // Step 3: Training Preferences
    resistanceExp: "Intermediate (1-3 years)",
    plyoExp: "Intermediate",
    daysPerWeek: "4",

    // Step 4: Equipment
    equipment: ["Full Gym", "Barbell & Plates", "Dumbbells", "Plyo Box"],

    // Step 5: Safety Screening
    kneePain: "None / Pain-free",
    ankleHistory: "Fully rehabilitated",
    backPain: "None",
    medicallyCleared: true,

    // Step 6: Manual Jump Assessment
    standingReachCm: "242.0",
    standingTouchCm: "312.0",
    approachTouchCm: "318.0",
    jumpStyle: "2-Foot Dominant",

    // Step 7: Goals
    primaryGoal: "First In-Game Dunk (10ft Rim)",
    targetVerticalCm: "85.0",
  });

  // Calculate Standing Vertical & Approach Advantage
  const standingReach = parseFloat(formData.standingReachCm) || 0;
  const standingTouch = parseFloat(formData.standingTouchCm) || 0;
  const approachTouch = parseFloat(formData.approachTouchCm) || 0;

  const standingVertical = Math.max(standingTouch - standingReach, 0);
  const approachVertical = Math.max(approachTouch - standingReach, 0);
  const approachAdvantage = Math.max(approachVertical - standingVertical, 0);
  const targetVertical = parseFloat(formData.targetVerticalCm) || 80;
  const goalGap = Math.max(targetVertical - standingVertical, 0);

  const steps = [
    { id: 1, title: "Body & Age" },
    { id: 2, title: "Basketball" },
    { id: 3, title: "Experience" },
    { id: 4, title: "Equipment" },
    { id: 5, title: "Safety" },
    { id: 6, title: "Goals" },
    { id: 7, title: "Plan Review" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Complete Onboarding and save to LocalStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("vertex_athlete_profile", JSON.stringify(formData));
        localStorage.setItem("vertex_standing_vertical", standingVertical.toFixed(1));
        localStorage.setItem("vertex_approach_vertical", approachVertical.toFixed(1));
        localStorage.setItem("vertex_approach_advantage", approachAdvantage.toFixed(1));
        localStorage.setItem("vertex_target_vertical", targetVertical.toFixed(1));
        localStorage.setItem("vertex_goal_gap", goalGap.toFixed(1));
        localStorage.setItem("vertex_onboarding_completed", "true");
      }
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const toggleEquipment = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      equipment: prev.equipment.includes(item)
        ? prev.equipment.filter((e) => e !== item)
        : [...prev.equipment, item],
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-court-dark text-foreground">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
        {/* Stepper Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="orange">Resumable Assessment</Badge>
            <span className="text-xs font-mono font-bold text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-athletic uppercase tracking-tight">
            Athlete Baseline Calibration
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Deterministic configuration for your personalized 8-week basketball athletic development program.
          </p>

          <Stepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={(idx) => setCurrentStep(idx)}
            className="mt-6"
          />
        </div>

        {/* Dynamic Step Content Card */}
        <Card variant="elevated" className="border-court-border/80 relative overflow-hidden min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* STEP 1: ATHLETE DIMENSIONS */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <CardHeader>
                    <CardTitle>Physical Dimensions & Biological Parameters</CardTitle>
                    <CardDescription>
                      Accurate height and weight ensure biomechanical load calculations and rate of force development (RFD) metrics are tailored to your mass.
                    </CardDescription>
                  </CardHeader>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Age (Years)"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      required
                    />
                    <Input
                      label="Height (Centimeters)"
                      type="number"
                      value={formData.heightCm}
                      onChange={(e) => setFormData({ ...formData, heightCm: e.target.value })}
                      helperText="e.g. 188 cm = 6'2&quot;"
                      required
                    />
                    <Input
                      label="Body Weight (Kilograms)"
                      type="number"
                      value={formData.weightKg}
                      onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
                      helperText="e.g. 82 kg = 180 lbs"
                      required
                    />
                    <Select
                      label="Athlete Timezone (For Circadian Reset)"
                      value={formData.timezone}
                      onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                      options={[
                        { value: "UTC-5 (Eastern Time)", label: "UTC-5 (Eastern Time)" },
                        { value: "UTC-6 (Central Time)", label: "UTC-6 (Central Time)" },
                        { value: "UTC-7 (Mountain Time)", label: "UTC-7 (Mountain Time)" },
                        { value: "UTC-8 (Pacific Time)", label: "UTC-8 (Pacific Time)" },
                        { value: "UTC+0 (London)", label: "UTC+0 (London / GMT)" },
                        { value: "UTC+1 (Central Europe)", label: "UTC+1 (Central Europe)" },
                        { value: "UTC+5:30 (India)", label: "UTC+5:30 (India Standard Time)" },
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: BASKETBALL PROFILE */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <CardHeader>
                    <CardTitle>Basketball Position & Competitive Load</CardTitle>
                    <CardDescription>
                      Court volume and contact frequency inform our tendon deload timing and prevent overtraining during heavy game weeks.
                    </CardDescription>
                  </CardHeader>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Primary On-Court Position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      options={[
                        { value: "Point Guard (PG)", label: "Point Guard (PG) - Speed & Deceleration" },
                        { value: "Shooting Guard (SG)", label: "Shooting Guard (SG) - Approach Jump" },
                        { value: "Small Forward (SF)", label: "Small Forward (SF) - Slashing & Power" },
                        { value: "Power Forward (PF)", label: "Power Forward (PF) - Rebounding & Post" },
                        { value: "Center (C)", label: "Center (C) - Rim Protection & Mass" },
                      ]}
                    />
                    <Select
                      label="Competitive Level"
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      options={[
                        { value: "Recreational / Pickup", label: "Recreational / Weekend Pickup" },
                        { value: "High School Varsity", label: "High School Varsity" },
                        { value: "Collegiate / High Level Club", label: "Collegiate / High Level Club" },
                        { value: "Semi-Pro / Professional", label: "Semi-Pro / Professional" },
                      ]}
                    />
                    <Select
                      label="Games / Heavy Scrimmages Per Week"
                      value={formData.gamesPerWeek}
                      onChange={(e) => setFormData({ ...formData, gamesPerWeek: e.target.value })}
                      options={[
                        { value: "0", label: "0 Games (Off-season Focus)" },
                        { value: "1", label: "1 Game / Week" },
                        { value: "2", label: "2 Games / Week (Standard)" },
                        { value: "3+", label: "3+ Games / Week (High Fatigue)" },
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: TRAINING EXPERIENCE */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <CardHeader>
                    <CardTitle>Resistance & Plyometric Experience</CardTitle>
                    <CardDescription>
                      Determines initial isometric hold times, drop jump heights, and compound lifting volume.
                    </CardDescription>
                  </CardHeader>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Resistance Training History"
                      value={formData.resistanceExp}
                      onChange={(e) => setFormData({ ...formData, resistanceExp: e.target.value })}
                      options={[
                        { value: "Beginner (<1 year)", label: "Beginner (<1 year of barbell training)" },
                        { value: "Intermediate (1-3 years)", label: "Intermediate (1-3 years consistent)" },
                        { value: "Advanced (3+ years)", label: "Advanced (3+ years heavy lifting)" },
                      ]}
                    />
                    <Select
                      label="Plyometric / Jump Training History"
                      value={formData.plyoExp}
                      onChange={(e) => setFormData({ ...formData, plyoExp: e.target.value })}
                      options={[
                        { value: "Beginner", label: "Beginner (New to depth drops & pogo hops)" },
                        { value: "Intermediate", label: "Intermediate (Familiar with box jumps & bounds)" },
                        { value: "Advanced", label: "Advanced (High intensity shock plyometrics)" },
                      ]}
                    />
                    <Select
                      label="Target Training Frequency"
                      value={formData.daysPerWeek}
                      onChange={(e) => setFormData({ ...formData, daysPerWeek: e.target.value })}
                      options={[
                        { value: "3", label: "3 Days / Week (Optimal for In-Season)" },
                        { value: "4", label: "4 Days / Week (Balanced Off-Season)" },
                        { value: "5", label: "5 Days / Week (High Volume Dedicated)" },
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: EQUIPMENT SELECTION */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <CardHeader>
                    <CardTitle>Available Training Equipment</CardTitle>
                    <CardDescription>
                      Select all equipment you have access to. Exercises will automatically adapt to your setup.
                    </CardDescription>
                  </CardHeader>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      "Full Gym",
                      "Barbell & Plates",
                      "Trap / Hex Bar",
                      "Dumbbells",
                      "Plyo Box (18-30 in)",
                      "Resistance Bands",
                      "Pull-up Bar",
                      "Bodyweight Only",
                    ].map((eq) => {
                      const isSelected = formData.equipment.includes(eq);
                      return (
                        <div
                          key={eq}
                          onClick={() => toggleEquipment(eq)}
                          className={`p-3.5 rounded-xl border text-xs font-athletic font-bold uppercase transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "bg-court-orange/15 border-court-orange text-court-orange shadow-glow-orange"
                              : "bg-court-card border-court-border text-muted-foreground hover:text-white"
                          }`}
                        >
                          <span>{eq}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-court-orange" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: SAFETY SCREENING */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <CardHeader>
                    <CardTitle>Musculoskeletal Safety & Pain Screen</CardTitle>
                    <CardDescription>
                      Essential safety filter. If you report knee or tendon pain, high-impact shock plyometrics are swapped for isometric tendon loading.
                    </CardDescription>
                  </CardHeader>

                  <div className="space-y-3">
                    <Select
                      label="Patellar Tendon / Knee Pain Level"
                      value={formData.kneePain}
                      onChange={(e) => setFormData({ ...formData, kneePain: e.target.value })}
                      options={[
                        { value: "None / Pain-free", label: "None / Pain-free - Full Plyometrics Approved" },
                        { value: "Mild Stiffness", label: "Mild Morning Stiffness - Warmup Focused" },
                        { value: "Moderate / Soreness", label: "Moderate Soreness - Isometric Modulation" },
                      ]}
                    />

                    <div className="p-4 rounded-xl bg-amber-950/20 border border-court-gold/40 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5">
                      <AlertTriangle className="w-5 h-5 text-court-gold shrink-0 mt-0.5" />
                      <span>
                        <strong>Safety Guarantee:</strong> VERTEX adapts your workouts when joint soreness is detected. We never force jump volume through acute musculoskeletal pain.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: ATHLETIC GOALS */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <CardHeader>
                    <CardTitle>Primary Athletic Target</CardTitle>
                    <CardDescription>
                      Select your vertical milestone to structure your power expression timeline.
                    </CardDescription>
                  </CardHeader>

                  <div className="space-y-3">
                    <Select
                      label="Primary Goal"
                      value={formData.primaryGoal}
                      onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                      options={[
                        { value: "First In-Game Dunk (10ft Rim)", label: "First In-Game Dunk (10ft Rim)" },
                        { value: "Touch Rim (305 cm Reach)", label: "Touch Rim (305 cm Reach)" },
                        { value: "Two-Hand Rim Hang", label: "Two-Hand Rim Hang & Rebound Dominance" },
                        { value: "+10 cm Vertical Jump Gain", label: "+10 cm Vertical Jump Gain" },
                        { value: "+15 cm Elite Vertical Progression", label: "+15 cm Elite Vertical Progression" },
                      ]}
                    />

                    <Input
                      label="Target Vertical (cm)"
                      type="number"
                      value={formData.targetVerticalCm}
                      onChange={(e) => setFormData({ ...formData, targetVerticalCm: e.target.value })}
                      helperText="Desired peak vertical target height"
                    />
                  </div>
                </div>
              )}

              {/* STEP 7: PLAN REVIEW & SUBMIT */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-court-gold" />
                      <CardTitle>Deterministic Program Ready</CardTitle>
                    </div>
                    <CardDescription>
                      Your multi-vector baseline has been computed. An 8-week structured program has been generated by the VERTEX engine.
                    </CardDescription>
                  </CardHeader>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-court-card border border-court-border">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block font-athletic">
                        Baseline Vertical
                      </span>
                      <span className="text-xl font-metric font-black text-white">
                        {standingVertical.toFixed(1)} cm
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-court-card border border-court-border">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block font-athletic">
                        Target Goal
                      </span>
                      <span className="text-xl font-metric font-black text-court-gold">
                        {targetVertical} cm
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-court-card border border-court-border">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block font-athletic">
                        Goal Gap
                      </span>
                      <span className="text-xl font-metric font-black text-court-cyan">
                        {goalGap.toFixed(1)} cm
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-court-card border border-court-border">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block font-athletic">
                        Initial Phase
                      </span>
                      <span className="text-xs font-athletic font-black text-court-orange block mt-1">
                        Phase 1: Foundation
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-court-card/60 border border-court-border text-xs text-muted-foreground space-y-1">
                    <p>• <strong>Athlete:</strong> {formData.position} | {formData.daysPerWeek} days/week | {formData.level}</p>
                    <p>• <strong>Equipment:</strong> {formData.equipment.join(", ")}</p>
                    <p>• <strong>Safety Screening:</strong> Cleared | {formData.kneePain}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-court-border/60">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              disabled={currentStep === 0}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
            >
              Back
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              className="shadow-glow-orange"
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              {currentStep === steps.length - 1 ? "Launch Athlete Dashboard" : "Continue Assessment"}
            </Button>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
