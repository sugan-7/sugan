"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Zap, Eye, Video, Maximize2, ShieldCheck } from "lucide-react";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

export interface ExerciseAnimatedVideoProps {
  exerciseId: string;
  exerciseName: string;
  category?: string;
  className?: string;
  autoPlay?: boolean;
  showControls?: boolean;
  aspectRatio?: "video" | "square" | "wide";
}

export function ExerciseAnimatedVideo({
  exerciseId,
  exerciseName,
  category = "PLYOMETRIC",
  className,
  autoPlay = true,
  showControls = true,
  aspectRatio = "video",
}: ExerciseAnimatedVideoProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.5 | 1.0 | 1.5>(1.0);
  const [showVectors, setShowVectors] = useState(true);
  const [currentPhase, setCurrentPhase] = useState<string>("PREPARATION");
  const [frameIndex, setFrameIndex] = useState(0);

  // Derive animation cycle based on exercise ID/name
  const exType = exerciseName.toLowerCase().includes("pogo")
    ? "pogo"
    : exerciseName.toLowerCase().includes("depth")
    ? "depth_drop"
    : exerciseName.toLowerCase().includes("deadlift") || exerciseName.toLowerCase().includes("trap")
    ? "deadlift"
    : exerciseName.toLowerCase().includes("split squat") || exerciseName.toLowerCase().includes("isometric")
    ? "split_squat"
    : exerciseName.toLowerCase().includes("calf") || exerciseName.toLowerCase().includes("soleus")
    ? "calf_raise"
    : "generic_athletic";

  // Movement phases timeline
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % 100);
    }, (30 / playbackSpeed));

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Update biomechanical phase label based on cycle
  useEffect(() => {
    if (exType === "pogo") {
      if (frameIndex < 25) setCurrentPhase("GROUND PRE-ACTIVATION");
      else if (frameIndex < 50) setCurrentPhase("ACHILLES ELASTIC RECOIL");
      else if (frameIndex < 75) setCurrentPhase("FLIGHT PHASE (<0.20s)");
      else setCurrentPhase("STIFF ANKLE CONTACT");
    } else if (exType === "depth_drop") {
      if (frameIndex < 30) setCurrentPhase("BOX STEP-OFF (NO JUMP)");
      else if (frameIndex < 60) setCurrentPhase("DECELERATION & LOAD ABSORPTION");
      else setCurrentPhase("STICK LANDING POSTURE (2s)");
    } else if (exType === "deadlift") {
      if (frameIndex < 35) setCurrentPhase("CONCENTRIC ACCELERATION (SPEED)");
      else if (frameIndex < 60) setCurrentPhase("HIP EXTENSION LOCKOUT");
      else setCurrentPhase("CONTROLLED ECCENTRIC HINGE");
    } else if (exType === "split_squat") {
      if (frameIndex < 50) setCurrentPhase("90° ISOMETRIC TENSION HOLD");
      else setCurrentPhase("PATELLAR TENDON ADAPTATION LOAD");
    } else if (exType === "calf_raise") {
      if (frameIndex < 40) setCurrentPhase("DEEP ANKLE DORSIFLEXION");
      else if (frameIndex < 70) setCurrentPhase("EXPLOSIVE PLANTARFLEXION");
      else setCurrentPhase("SOLEUS ISOLATION PEAK");
    } else {
      if (frameIndex < 50) setCurrentPhase("FORCE ABSORPTION PHASE");
      else setCurrentPhase("EXPLOSIVE KINETIC TRANSFER");
    }
  }, [frameIndex, exType]);

  const cycleProgress = (frameIndex / 100) * (Math.PI * 2);

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden bg-court-obsidian border border-court-border/80 group select-none shadow-2xl flex flex-col justify-between",
        aspectRatio === "video" ? "aspect-video" : aspectRatio === "wide" ? "aspect-[21/9]" : "aspect-square",
        className
      )}
    >
      {/* Background Animated Grid & Court Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-court-orange/15 via-court-charcoal/80 to-court-dark pointer-events-none" />
      <div className="absolute inset-0 bg-court-grid bg-[size:24px_24px] opacity-25 pointer-events-none" />

      {/* Top Header Overlay */}
      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between bg-gradient-to-b from-court-dark/90 to-transparent">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-court-orange/20 border border-court-orange/50 flex items-center justify-center text-court-orange">
            <Video className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-muted-foreground block">
              Biomechanical Movement Video
            </span>
            <span className="text-xs font-athletic font-bold text-white uppercase truncate max-w-[200px] block">
              {exerciseName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Badge variant={category === "PLYOMETRIC" ? "orange" : category === "STRENGTH" ? "gold" : "cyan"} size="sm">
            {category}
          </Badge>
          <button
            type="button"
            onClick={() => setShowVectors(!showVectors)}
            className={cn(
              "px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-colors border",
              showVectors
                ? "bg-court-cyan/20 border-court-cyan text-court-cyan"
                : "bg-court-card border-court-border text-muted-foreground"
            )}
            title="Toggle Force Vectors"
          >
            Vectors {showVectors ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Main Biomechanical Canvas / Vector Player */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full max-h-[220px] drop-shadow-2xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ground Baseline / Court Lines */}
          <line x1="30" y1="200" x2="370" y2="200" stroke="#232F46" strokeWidth="3" strokeDasharray="4 4" />
          <line x1="120" y1="200" x2="280" y2="200" stroke="#FF6B00" strokeWidth="3" />
          <circle cx="200" cy="200" r="40" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />

          {/* 1. POGO HOPS ANIMATION */}
          {exType === "pogo" && (
            <g transform={`translate(200, ${isPlaying ? 150 - Math.abs(Math.sin(cycleProgress * 2)) * 45 : 150})`}>
              {/* Dynamic Force Waves upon landing */}
              {Math.abs(Math.sin(cycleProgress * 2)) < 0.15 && (
                <ellipse cx="0" cy="50" rx="35" ry="6" stroke="#38BDF8" strokeWidth="2" fill="none" opacity="0.8">
                  <animate attributeName="rx" from="10" to="50" dur="0.4s" repeatCount="1" />
                  <animate attributeName="opacity" from="0.9" to="0" dur="0.4s" repeatCount="1" />
                </ellipse>
              )}

              {/* Head */}
              <circle cx="0" cy="-90" r="14" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="2" />
              {/* Torso */}
              <line x1="0" y1="-76" x2="0" y2="-20" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />

              {/* Arms Up for counter-balance */}
              <path d="M 0 -65 Q -25 -45 -30 -75" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 0 -65 Q 25 -45 30 -75" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" />

              {/* Pelvis & Upper Legs */}
              <line x1="0" y1="-20" x2="-12" y2="15" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="0" y1="-20" x2="12" y2="15" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />

              {/* Knees & Lower Legs (Stiff Ankle Springs) */}
              <line x1="-12" y1="15" x2="-10" y2="46" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="12" y1="15" x2="10" y2="46" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />

              {/* Feet (Plantarflexed / Spring) */}
              <line x1="-10" y1="46" x2="-2" y2="49" stroke="#FF6B00" strokeWidth="4" strokeLinecap="round" />
              <line x1="10" y1="46" x2="18" y2="49" stroke="#FF6B00" strokeWidth="4" strokeLinecap="round" />

              {/* Achilles Tendon Glow Vectors */}
              {showVectors && (
                <g>
                  <circle cx="-10" cy="38" r="4" fill="#38BDF8" className="animate-ping" opacity="0.8" />
                  <circle cx="10" cy="38" r="4" fill="#38BDF8" className="animate-ping" opacity="0.8" />
                  <line x1="-10" y1="48" x2="-10" y2="10" stroke="#38BDF8" strokeWidth="2" strokeDasharray="2 2" />
                  <line x1="10" y1="48" x2="10" y2="10" stroke="#38BDF8" strokeWidth="2" strokeDasharray="2 2" />
                  <text x="25" y="35" fill="#38BDF8" fontSize="9" fontFamily="monospace" fontWeight="bold">Achilles Stiffness: 0.18s</text>
                </g>
              )}
            </g>
          )}

          {/* 2. DEPTH DROPS TO STICK LANDING */}
          {exType === "depth_drop" && (
            <g>
              {/* 20-inch Plyo Box */}
              <rect x="70" y="140" width="70" height="60" rx="4" fill="#171F30" stroke="#FF6B00" strokeWidth="2" />
              <text x="105" y="175" fill="#F59E0B" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">20-INCH BOX</text>

              {/* Athlete Animation (Step Off Box -> Ground Stick) */}
              <g transform={`translate(${110 + Math.min(frameIndex * 1.6, 90)}, ${
                frameIndex < 35
                  ? 90
                  : frameIndex < 65
                  ? 90 + (frameIndex - 35) * 2.2
                  : 155 + Math.sin(frameIndex * 0.1) * 2
              })`}>
                {/* Head */}
                <circle cx="0" cy="-55" r="13" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="2" />
                {/* Torso (Athletic Hinge) */}
                <line x1="0" y1="-42" x2="5" y2="0" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />

                {/* Arms in Landing Position */}
                <path d="M 0 -35 L -15 -10 L -25 -25" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M 0 -35 L 15 -10 L 25 -25" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" />

                {/* Knee Angle (Absorbing 90 deg upon landing) */}
                <line x1="5" y1="0" x2={frameIndex > 60 ? "24" : "12"} y2="24" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
                <line x1={frameIndex > 60 ? "24" : "12"} y1="24" x2={frameIndex > 60 ? "10" : "8"} y2="44" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="10" y1="44" x2="24" y2="44" stroke="#FF6B00" strokeWidth="4" strokeLinecap="round" />

                {/* Force Absorption Visual Rings */}
                {frameIndex >= 60 && showVectors && (
                  <g>
                    <ellipse cx="15" cy="44" rx="28" ry="5" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.9" />
                    <text x="35" y="15" fill="#10B981" fontSize="9" fontFamily="monospace" fontWeight="bold">Stick Landing (Zero Valgus)</text>
                  </g>
                )}
              </g>
            </g>
          )}

          {/* 3. TRAP BAR DEADLIFT (SPEED FOCUS) */}
          {exType === "deadlift" && (
            <g transform={`translate(200, ${150 - Math.abs(Math.sin(cycleProgress)) * 30})`}>
              {/* Hex / Trap Bar */}
              <ellipse cx="0" cy="30" rx="45" ry="10" stroke="#F59E0B" strokeWidth="3" fill="none" />
              {/* Weight Plates */}
              <rect x="-55" y="15" width="12" height="30" rx="3" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="1.5" />
              <rect x="43" y="15" width="12" height="30" rx="3" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Head */}
              <circle cx="0" cy="-65" r="13" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="2" />
              {/* Spine Hinge */}
              <line x1="0" y1="-52" x2="0" y2="-5" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />

              {/* Arms Gripping Bar */}
              <line x1="0" y1="-40" x2="-25" y2="28" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="-40" x2="25" y2="28" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />

              {/* Legs Hinge & Drive */}
              <line x1="0" y1="-5" x2="-18" y2="22" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="0" y1="-5" x2="18" y2="22" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="-18" y1="22" x2="-14" y2="48" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="18" y1="22" x2="14" y2="48" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />

              {/* Upward Velocity Vector */}
              {showVectors && Math.cos(cycleProgress) > 0 && (
                <g>
                  <line x1="0" y1="-50" x2="0" y2="-85" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
                  <polygon points="-4,-80 4,-80 0,-92" fill="#10B981" />
                  <text x="12" y="-75" fill="#10B981" fontSize="9" fontFamily="monospace" fontWeight="bold">RFD: 1.15 m/s</text>
                </g>
              )}
            </g>
          )}

          {/* 4. ISOMETRIC SPLIT SQUAT HOLD */}
          {exType === "split_squat" && (
            <g transform="translate(190, 140)">
              {/* Torso & Head */}
              <circle cx="0" cy="-60" r="13" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="0" y1="-47" x2="0" y2="0" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />

              {/* Dumbbells held at sides */}
              <rect x="-18" y="-15" width="8" height="18" rx="2" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
              <rect x="10" y="-15" width="8" height="18" rx="2" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />

              {/* Front Leg (Vertical Shin 90 deg) */}
              <line x1="0" y1="0" x2="30" y2="15" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="30" y1="15" x2="30" y2="55" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="30" y1="55" x2="48" y2="55" stroke="#FF6B00" strokeWidth="4" strokeLinecap="round" />

              {/* Rear Leg (Hovering above floor) */}
              <line x1="0" y1="0" x2="-32" y2="25" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="-32" y1="25" x2="-45" y2="52" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />

              {/* Patellar Tendon Load Gauge Overlay */}
              {showVectors && (
                <g>
                  <circle cx="30" cy="15" r="8" fill="none" stroke="#38BDF8" strokeWidth="2.5" className="animate-pulse" />
                  <line x1="30" y1="15" x2="80" y2="5" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 2" />
                  <text x="85" y="8" fill="#38BDF8" fontSize="9" fontFamily="monospace" fontWeight="bold">90° Knee Angle (Tendon Tension)</text>
                </g>
              )}
            </g>
          )}

          {/* 5. SEATED SOLEUS CALF RAISE */}
          {exType === "calf_raise" && (
            <g transform="translate(190, 130)">
              {/* Seated Bench */}
              <rect x="-40" y="-10" width="40" height="65" rx="3" fill="#171F30" stroke="#232F46" strokeWidth="2" />
              {/* Torso & Head */}
              <circle cx="-20" cy="-60" r="13" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="-20" y1="-47" x2="-20" y2="-5" stroke="#FFFFFF" strokeWidth="5" />

              {/* Thigh (Horizontal) */}
              <line x1="-20" y1="-5" x2="25" y2="-5" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              {/* Weight Plate on Knee */}
              <rect x="18" y="-22" width="14" height="20" rx="3" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />

              {/* Lower Shin with Ankle Flexing */}
              <line x1="25" y1="-5" x2="25" y2={isPlaying ? 45 - Math.sin(cycleProgress) * 14 : 45} stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              {/* Foot on Step Board */}
              <line x1="20" y1="58" x2="55" y2="58" stroke="#FF6B00" strokeWidth="3" />
              <circle cx="25" cy={isPlaying ? 45 - Math.sin(cycleProgress) * 14 : 45} r="4" fill="#38BDF8" />

              {showVectors && (
                <g>
                  <line x1="25" y1="30" x2="70" y2="20" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 2" />
                  <text x="75" y="24" fill="#38BDF8" fontSize="9" fontFamily="monospace" fontWeight="bold">Soleus Tension: 2s Pause</text>
                </g>
              )}
            </g>
          )}

          {/* 6. GENERIC / DEFAULT ATHLETIC JUMP MOTION */}
          {exType === "generic_athletic" && (
            <g transform={`translate(200, ${150 - Math.abs(Math.sin(cycleProgress)) * 40})`}>
              <circle cx="0" cy="-70" r="14" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="0" y1="-56" x2="0" y2="-10" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="0" y1="-45" x2="-25" y2="-20" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="-45" x2="25" y2="-20" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="-10" x2="-15" y2="25" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="0" y1="-10" x2="15" y2="25" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="-15" y1="25" x2="-10" y2="50" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="15" y1="25" x2="10" y2="50" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
              {showVectors && (
                <text x="25" y="0" fill="#10B981" fontSize="9" fontFamily="monospace" fontWeight="bold">Force Vector: Optimal</text>
              )}
            </g>
          )}
        </svg>
      </div>

      {/* Bottom Bar: Live Biomechanical Phase & Control Strip */}
      <div className="relative z-10 p-3 bg-gradient-to-t from-court-dark via-court-charcoal/95 to-transparent border-t border-court-border/60 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="w-2 h-2 rounded-full bg-court-orange animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-xs font-mono font-bold text-white uppercase tracking-wider truncate">
            Phase: <strong className="text-court-gold">{currentPhase}</strong>
          </span>
        </div>

        {showControls && (
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-court-card border border-court-border text-white hover:border-court-orange transition-colors"
              title={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            </button>

            {/* Speed Toggle */}
            <button
              type="button"
              onClick={() => setPlaybackSpeed((s) => (s === 1.0 ? 0.5 : s === 0.5 ? 1.5 : 1.0))}
              className="px-2 py-1 rounded-lg bg-court-card border border-court-border text-[10px] font-mono font-bold text-court-orange hover:border-court-orange transition-colors"
              title="Change Speed"
            >
              {playbackSpeed}x
            </button>

            <button
              type="button"
              onClick={() => {
                setFrameIndex(0);
                setIsPlaying(true);
              }}
              className="p-1.5 rounded-lg bg-court-card border border-court-border text-muted-foreground hover:text-white transition-colors"
              title="Restart Video"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
