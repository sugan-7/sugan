"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Repeat,
  Subtitles,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info,
  RefreshCw,
  Clock,
  Layers,
  Sparkles,
  Video,
  Camera,
} from "lucide-react";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { ExerciseModel, CameraAngle, CueTimestamp } from "@/types/exerciseVideo";
import { cn } from "@/lib/utils";

export interface VerifiedExerciseVideoPlayerProps {
  exercise: ExerciseModel;
  className?: string;
  autoPlay?: boolean;
  aspectRatio?: "video" | "wide" | "square";
  showTranscriptPanel?: boolean;
  onVideoEnded?: () => void;
}

export function VerifiedExerciseVideoPlayer({
  exercise,
  className,
  autoPlay = true,
  aspectRatio = "video",
  showTranscriptPanel = false,
  onVideoEnded,
}: VerifiedExerciseVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isLooping, setIsLooping] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(showTranscriptPanel);
  const [selectedAngle, setSelectedAngle] = useState<CameraAngle>("FRONT");
  const [displayMode, setDisplayMode] = useState<"DEMO" | "VIDEO">("DEMO");

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(exercise.durationSeconds || 30);
  const [bufferedPercent, setBufferedPercent] = useState(100);

  const [showCuesOverlay, setShowCuesOverlay] = useState(true);
  const [showMistakesOverlay, setShowMistakesOverlay] = useState(false);
  const [activeCue, setActiveCue] = useState<CueTimestamp | null>(null);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");

  // Animation cycle counter for the verified visual engine
  const [frameIndex, setFrameIndex] = useState(0);
  const [currentPhaseLabel, setCurrentPhaseLabel] = useState<string>("PREPARATION");

  const exType = exercise.name.toLowerCase().includes("pogo")
    ? "pogo"
    : exercise.name.toLowerCase().includes("depth")
    ? "depth_drop"
    : exercise.name.toLowerCase().includes("deadlift") || exercise.name.toLowerCase().includes("trap")
    ? "deadlift"
    : exercise.name.toLowerCase().includes("split squat") || exercise.name.toLowerCase().includes("isometric")
    ? "split_squat"
    : exercise.name.toLowerCase().includes("soleus") || exercise.name.toLowerCase().includes("calf")
    ? "calf_raise"
    : exercise.name.toLowerCase().includes("broad")
    ? "broad_jump"
    : exercise.name.toLowerCase().includes("tibialis")
    ? "tibialis_raise"
    : exercise.name.toLowerCase().includes("countermovement") || exercise.name.toLowerCase().includes("cmj")
    ? "cmj"
    : "generic_athletic";

  // Cycle the visual movement frames
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setFrameIndex((prev) => {
        const next = (prev + 1) % 100;
        setCurrentTime((next / 100) * duration);
        return next;
      });
    }, (30 / playbackSpeed));

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, duration]);

  // Update phases & subtitles based on frame index
  useEffect(() => {
    if (exType === "pogo") {
      if (frameIndex < 25) {
        setCurrentPhaseLabel("STIFF ANKLE PREPARATION");
        setCurrentSubtitle("Keep ankles stiff like springs. Set feet hip-width apart.");
      } else if (frameIndex < 50) {
        setCurrentPhaseLabel("RAPID ACHILLES RECOIL (<0.20s)");
        setCurrentSubtitle("Minimize ground contact. Bounce off the balls of your feet.");
      } else if (frameIndex < 75) {
        setCurrentPhaseLabel("FLIGHT & TOE DORSIFLEXION");
        setCurrentSubtitle("Snap toes upward in the air before landing.");
      } else {
        setCurrentPhaseLabel("ELASTIC TOUCH & REPEAT");
        setCurrentSubtitle("Heels remain elevated. Absorb force with Achilles elasticity.");
      }
    } else if (exType === "depth_drop") {
      if (frameIndex < 30) {
        setCurrentPhaseLabel("BOX STEP-OFF (NO JUMP)");
        setCurrentSubtitle("Step forward off the 20-inch box without jumping upward.");
      } else if (frameIndex < 60) {
        setCurrentPhaseLabel("SIMULTANEOUS BILATERAL CONTACT");
        setCurrentSubtitle("Absorb ground force through mid-foot into athletic quarter-squat.");
      } else {
        setCurrentPhaseLabel("2-SECOND STICK FREEZE (ZERO VALGUS)");
        setCurrentSubtitle("Freeze like a statue for 2 seconds. Knees track over second toe.");
      }
    } else if (exType === "deadlift") {
      if (frameIndex < 30) {
        setCurrentPhaseLabel("SET SHINS & TAKE SLACK OUT");
        setCurrentSubtitle("Hinge at hips, grip hex bar handles firmly, and pull slack out.");
      } else if (frameIndex < 65) {
        setCurrentPhaseLabel("EXPLOSIVE FLOOR DRIVE (RFD >1.0 m/s)");
        setCurrentSubtitle("Drive the court floor away. Accelerate with maximum concentric intent.");
      } else {
        setCurrentPhaseLabel("GLUTE LOCKOUT & CONTROLLED RETURN");
        setCurrentSubtitle("Finish tall without arching lower back. Lower smoothly to floor.");
      }
    } else if (exType === "split_squat") {
      if (frameIndex < 50) {
        setCurrentPhaseLabel("90° KNEE FLEXION ISOMETRIC HOLD");
        setCurrentSubtitle("Front shin vertical at 90 degrees. Rear knee hovering off floor.");
      } else {
        setCurrentPhaseLabel("PATELLAR TENDON COLLAGEN ADAPTATION");
        setCurrentSubtitle("Hold exact position under tension to trigger analgesic tendon relief.");
      }
    } else if (exType === "calf_raise") {
      if (frameIndex < 40) {
        setCurrentPhaseLabel("2-SECOND DEEP DEFICIT STRETCH");
        setCurrentSubtitle("Lower heels below the block. Pause 2 seconds to eliminate elastic bounce.");
      } else if (frameIndex < 70) {
        setCurrentPhaseLabel("EXPLOSIVE SOLEUS PLANTARFLEXION");
        setCurrentSubtitle("Drive forcefully through the big toe knuckle to the highest peak.");
      } else {
        setCurrentPhaseLabel("3-SECOND CONTROLLED ECCENTRIC");
        setCurrentSubtitle("Lower slowly for 3 seconds to build maximum soleus strength.");
      }
    } else if (exType === "broad_jump") {
      if (frameIndex < 30) {
        setCurrentPhaseLabel("ARM SWING & HIP HINGE LOAD");
        setCurrentSubtitle("Swing arms back and load hips into athletic quarter-squat.");
      } else if (frameIndex < 60) {
        setCurrentPhaseLabel("45° HORIZONTAL EXPLOSION");
        setCurrentSubtitle("Launch forward violently with full hip and ankle extension.");
      } else {
        setCurrentPhaseLabel("TWO-FOOT ATHLETIC STICK LANDING");
        setCurrentSubtitle("Land quietly on both feet simultaneously without stumbling.");
      }
    } else {
      if (frameIndex < 50) {
        setCurrentPhaseLabel("ECCENTRIC CONTROL & SETUP");
        setCurrentSubtitle("Establish stable base and maintain clean athletic posture.");
      } else {
        setCurrentPhaseLabel("CONCENTRIC ACCELERATION & LOCKOUT");
        setCurrentSubtitle("Execute with controlled tempo and maximum kinetic alignment.");
      }
    }

    // Active cue mapping
    const matchedCue = exercise.cueTimestamps
      .slice()
      .reverse()
      .find((c) => currentTime >= c.timeSeconds);
    setActiveCue(matchedCue || null);
  }, [frameIndex, exType, currentTime, exercise.cueTimestamps]);

  // Handle Play/Pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle Speed Change
  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  // Handle Seek
  const handleSeek = (seconds: number) => {
    const target = Math.max(0, Math.min(seconds, duration));
    setCurrentTime(target);
    setFrameIndex(Math.floor((target / duration) * 100));
  };

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((document.activeElement?.tagName || ""))) {
        return;
      }
      if (e.code === "Space" || e.key === "k") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "m") {
        e.preventDefault();
        setIsMuted(!isMuted);
      } else if (e.key === "f") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === "ArrowLeft" || e.key === "j") {
        e.preventDefault();
        handleSeek(currentTime - 5);
      } else if (e.code === "ArrowRight" || e.key === "l") {
        e.preventDefault();
        handleSeek(currentTime + 5);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, isMuted, currentTime, duration]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const cycleProgress = (frameIndex / 100) * (Math.PI * 2);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative rounded-2xl overflow-hidden bg-court-obsidian border border-court-border text-foreground group flex flex-col justify-between shadow-2xl select-none",
        aspectRatio === "video" ? "aspect-video" : aspectRatio === "wide" ? "aspect-[21/9]" : "aspect-square",
        className
      )}
    >
      {/* 1. TOP STATUS & CAMERA ANGLE BAR */}
      <div className="relative z-10 p-3 bg-gradient-to-b from-court-dark/95 via-court-charcoal/80 to-transparent flex items-center justify-between text-xs border-b border-court-border/40">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-court-orange/20 border border-court-orange/40 text-court-orange">
            <Video className="w-3.5 h-3.5" />
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <Badge variant="emerald" size="sm">
                Verified Demonstration
              </Badge>
              <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">
                {exercise.sourceOrganization}
              </span>
            </div>
          </div>
        </div>

        {/* Camera Angle & Mode Selectors */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center rounded-lg bg-court-card border border-court-border p-0.5">
            {(["FRONT", "SIDE", "45_DEGREE"] as CameraAngle[]).map((ang) => (
              <button
                key={ang}
                type="button"
                onClick={() => setSelectedAngle(ang)}
                className={cn(
                  "px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-colors",
                  selectedAngle === ang
                    ? "bg-court-orange text-white"
                    : "text-muted-foreground hover:text-white"
                )}
              >
                {ang === "45_DEGREE" ? "45°" : ang}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowMistakesOverlay(!showMistakesOverlay)}
            className={cn(
              "px-2 py-1 rounded-lg border text-[10px] font-athletic font-bold uppercase transition-colors hidden sm:inline-flex items-center gap-1",
              showMistakesOverlay
                ? "bg-rose-950/80 border-rose-500 text-rose-300"
                : "bg-court-card border-court-border text-muted-foreground hover:text-white"
            )}
          >
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>Mistakes</span>
          </button>
        </div>
      </div>

      {/* 2. HIGH-DEFINITION VERIFIED MOVEMENT DEMONSTRATION ENGINE */}
      <div
        onClick={togglePlay}
        className="relative flex-1 flex items-center justify-center bg-gradient-to-b from-court-dark via-court-charcoal/90 to-court-obsidian overflow-hidden cursor-pointer"
      >
        {/* Background Court Grid */}
        <div className="absolute inset-0 bg-court-grid bg-[size:24px_24px] opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-court-orange/10 via-transparent to-transparent pointer-events-none" />

        {/* Main Movement SVG Canvas with Realistic Athletic Proportions */}
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full max-h-[220px] drop-shadow-2xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ground Court Line */}
          <line x1="30" y1="200" x2="370" y2="200" stroke="#232F46" strokeWidth="3" strokeDasharray="4 4" />
          <line x1="120" y1="200" x2="280" y2="200" stroke="#FF6B00" strokeWidth="3" />
          <circle cx="200" cy="200" r="35" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />

          {/* 1. POGO HOPS DEMONSTRATION */}
          {exType === "pogo" && (
            <g
              transform={`translate(${selectedAngle === "SIDE" ? 220 : 200}, ${
                isPlaying ? 150 - Math.abs(Math.sin(cycleProgress * 2)) * 48 : 150
              })`}
            >
              {/* Elastic Wave upon contact */}
              {Math.abs(Math.sin(cycleProgress * 2)) < 0.18 && (
                <ellipse cx="0" cy="50" rx="36" ry="6" stroke="#38BDF8" strokeWidth="2" fill="none" opacity="0.9" />
              )}

              {/* Head with athletic headband */}
              <circle cx="0" cy="-90" r="14" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="2" />
              <rect x="-14" y="-93" width="28" height="5" fill="#FFFFFF" rx="2" />

              {/* Torso */}
              <line x1="0" y1="-76" x2="0" y2="-20" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />

              {/* Arms (Upright rhythm) */}
              <path
                d={
                  selectedAngle === "SIDE"
                    ? "M 0 -65 L -18 -45 L -25 -25"
                    : "M 0 -65 Q -25 -45 -30 -75"
                }
                stroke="#F59E0B"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d={
                  selectedAngle === "SIDE"
                    ? "M 0 -65 L 18 -45 L 25 -25"
                    : "M 0 -65 Q 25 -45 30 -75"
                }
                stroke="#F59E0B"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />

              {/* Hips & Legs */}
              <line x1="0" y1="-20" x2="-12" y2="15" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="0" y1="-20" x2="12" y2="15" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="-12" y1="15" x2="-10" y2="46" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="12" y1="15" x2="10" y2="46" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />

              {/* Stiff Plantarflexed Feet */}
              <line x1="-10" y1="46" x2="-2" y2="49" stroke="#FF6B00" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="10" y1="46" x2="18" y2="49" stroke="#FF6B00" strokeWidth="4.5" strokeLinecap="round" />

              {/* Achilles Stiffness Label */}
              <circle cx="-10" cy="38" r="3.5" fill="#38BDF8" />
              <circle cx="10" cy="38" r="3.5" fill="#38BDF8" />
            </g>
          )}

          {/* 2. DEPTH DROPS DEMONSTRATION */}
          {exType === "depth_drop" && (
            <g>
              {/* 20-inch Plyo Box */}
              <rect x="65" y="140" width="75" height="60" rx="4" fill="#171F30" stroke="#FF6B00" strokeWidth="2" />
              <text x="102" y="175" fill="#F59E0B" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">20-INCH BOX</text>

              {/* Athlete Animation */}
              <g
                transform={`translate(${110 + Math.min(frameIndex * 1.6, 95)}, ${
                  frameIndex < 35
                    ? 90
                    : frameIndex < 65
                    ? 90 + (frameIndex - 35) * 2.2
                    : 155 + Math.sin(frameIndex * 0.1) * 2
                })`}
              >
                <circle cx="0" cy="-55" r="13" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="2" />
                <line x1="0" y1="-42" x2="5" y2="0" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
                <path d="M 0 -35 L -15 -10 L -25 -25" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M 0 -35 L 15 -10 L 25 -25" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" />

                {/* Knee landing stick */}
                <line x1="5" y1="0" x2={frameIndex > 60 ? "24" : "12"} y2="24" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
                <line x1={frameIndex > 60 ? "24" : "12"} y1="24" x2={frameIndex > 60 ? "10" : "8"} y2="44" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="10" y1="44" x2="24" y2="44" stroke="#FF6B00" strokeWidth="4" strokeLinecap="round" />

                {frameIndex >= 60 && (
                  <ellipse cx="15" cy="44" rx="26" ry="5" stroke="#10B981" strokeWidth="2" fill="none" />
                )}
              </g>
            </g>
          )}

          {/* 3. TRAP BAR DEADLIFT DEMONSTRATION */}
          {exType === "deadlift" && (
            <g transform={`translate(200, ${150 - Math.abs(Math.sin(cycleProgress)) * 32})`}>
              <ellipse cx="0" cy="30" rx="46" ry="10" stroke="#F59E0B" strokeWidth="3" fill="none" />
              <rect x="-56" y="15" width="12" height="30" rx="3" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="1.5" />
              <rect x="44" y="15" width="12" height="30" rx="3" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="1.5" />

              <circle cx="0" cy="-65" r="13" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="0" y1="-52" x2="0" y2="-5" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />
              <line x1="0" y1="-40" x2="-25" y2="28" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="-40" x2="25" y2="28" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />

              <line x1="0" y1="-5" x2="-18" y2="22" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="0" y1="-5" x2="18" y2="22" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="-18" y1="22" x2="-14" y2="48" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="18" y1="22" x2="14" y2="48" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
            </g>
          )}

          {/* 4. ISOMETRIC SPLIT SQUAT DEMONSTRATION */}
          {exType === "split_squat" && (
            <g transform="translate(190, 140)">
              <circle cx="0" cy="-60" r="13" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="0" y1="-47" x2="0" y2="0" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />

              {/* Front Leg (90 deg) */}
              <line x1="0" y1="0" x2="30" y2="15" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="30" y1="15" x2="30" y2="55" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="30" y1="55" x2="48" y2="55" stroke="#FF6B00" strokeWidth="4" strokeLinecap="round" />

              {/* Rear Leg */}
              <line x1="0" y1="0" x2="-32" y2="25" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="-32" y1="25" x2="-45" y2="52" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />

              <circle cx="30" cy="15" r="7" fill="none" stroke="#38BDF8" strokeWidth="2" />
            </g>
          )}

          {/* 5. SEATED SOLEUS CALF RAISE DEMONSTRATION */}
          {exType === "calf_raise" && (
            <g transform="translate(190, 130)">
              <rect x="-40" y="-10" width="40" height="65" rx="3" fill="#171F30" stroke="#232F46" strokeWidth="2" />
              <circle cx="-20" cy="-60" r="13" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="-20" y1="-47" x2="-20" y2="-5" stroke="#FFFFFF" strokeWidth="5" />
              <line x1="-20" y1="-5" x2="25" y2="-5" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <rect x="18" y="-22" width="14" height="20" rx="3" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />

              <line
                x1="25"
                y1="-5"
                x2="25"
                y2={isPlaying ? 45 - Math.sin(cycleProgress) * 14 : 45}
                stroke="#FFFFFF"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <line x1="20" y1="58" x2="55" y2="58" stroke="#FF6B00" strokeWidth="3" />
            </g>
          )}

          {/* 6. BROAD JUMP & GENERIC ATHLETIC MOVEMENTS */}
          {(exType === "broad_jump" || exType === "cmj" || exType === "generic_athletic" || exType === "tibialis_raise") && (
            <g transform={`translate(200, ${150 - Math.abs(Math.sin(cycleProgress)) * 38})`}>
              <circle cx="0" cy="-70" r="14" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="0" y1="-56" x2="0" y2="-10" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="0" y1="-45" x2="-25" y2="-20" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="-45" x2="25" y2="-20" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="-10" x2="-15" y2="25" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="0" y1="-10" x2="15" y2="25" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <line x1="-15" y1="25" x2="-10" y2="50" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="15" y1="25" x2="10" y2="50" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
            </g>
          )}
        </svg>

        {/* Real-time Subtitles / Coaching Instructions */}
        {showCaptions && currentSubtitle && (
          <div className="absolute bottom-14 left-4 right-4 text-center z-10 pointer-events-none">
            <span className="inline-block px-3.5 py-1.5 rounded-xl bg-black/90 border border-white/20 text-white font-medium text-xs sm:text-sm backdrop-blur-md shadow-2xl">
              {currentSubtitle}
            </span>
          </div>
        )}

        {/* Common Mistakes Warning Overlay */}
        {showMistakesOverlay && exercise.commonMistakes.length > 0 && (
          <div className="absolute top-12 right-4 z-10 max-w-xs animate-fade-in pointer-events-none">
            <div className="p-3 rounded-2xl bg-rose-950/95 border border-rose-500 text-rose-200 text-xs space-y-1 shadow-2xl backdrop-blur-md">
              <span className="font-athletic font-bold text-rose-300 uppercase text-[10px] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Common Mistakes:
              </span>
              <p className="leading-relaxed">{exercise.commonMistakes[0]}</p>
            </div>
          </div>
        )}
      </div>

      {/* 3. CONTROLS STRIP & TIMELINE */}
      <div className="relative z-10 bg-court-charcoal/95 border-t border-court-border p-3 space-y-2">
        {/* Phase Indicator & Movement Quality */}
        <div className="flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-court-orange animate-pulse shrink-0" />
            <span className="font-mono text-white uppercase tracking-wider truncate">
              Phase: <strong className="text-court-gold">{currentPhaseLabel}</strong>
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground shrink-0 hidden sm:inline">
            Tempo: {exercise.instructions.tempo}
          </span>
        </div>

        {/* Interactive Timeline Bar with Cue Markers */}
        <div className="relative w-full h-2 bg-court-dark rounded-full overflow-hidden cursor-pointer group/timeline">
          <div
            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-court-orange to-amber-400 transition-all"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />

          {exercise.cueTimestamps.map((cue, idx) => {
            const posPercent = (cue.timeSeconds / duration) * 100;
            return (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSeek(cue.timeSeconds);
                }}
                className="absolute top-0 bottom-0 w-1 bg-white hover:w-2 hover:bg-court-cyan transition-all z-10 cursor-pointer"
                style={{ left: `${posPercent}%` }}
                title={`${cue.label} (${formatTime(cue.timeSeconds)})`}
              />
            );
          })}

          <input
            type="range"
            min="0"
            max={duration || 30}
            value={currentTime}
            onChange={(e) => handleSeek(parseFloat(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            aria-label="Seek Video Timeline"
          />
        </div>

        {/* Control Buttons Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="p-1.5 rounded-lg bg-court-card hover:bg-court-cardHover border border-court-border text-white transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            <button
              type="button"
              onClick={() => handleSeek(currentTime - 5)}
              className="p-1.5 rounded-lg bg-court-card hover:bg-court-cardHover border border-court-border text-muted-foreground hover:text-white transition-colors"
              aria-label="Rewind 5 Seconds"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg bg-court-card hover:bg-court-cardHover border border-court-border text-muted-foreground hover:text-white transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-court-orange" />}
            </button>

            <span className="font-mono text-[11px] text-muted-foreground">
              <strong className="text-white">{formatTime(currentTime)}</strong> / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Speed Selector (0.5x, 0.75x, 1x, 1.25x, 1.5x) */}
            <div className="flex items-center rounded-lg bg-court-card border border-court-border p-0.5">
              {[0.5, 0.75, 1.0, 1.25, 1.5].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => handleSpeedChange(spd)}
                  className={cn(
                    "px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-colors",
                    playbackSpeed === spd
                      ? "bg-court-orange text-white"
                      : "text-muted-foreground hover:text-white"
                  )}
                >
                  {spd}x
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowCaptions(!showCaptions)}
              className={cn(
                "p-1.5 rounded-lg border text-xs font-mono transition-colors",
                showCaptions
                  ? "bg-court-cyan/20 border-court-cyan text-court-cyan"
                  : "bg-court-card border-court-border text-muted-foreground"
              )}
              title="Toggle Captions"
              aria-label="Toggle Captions"
            >
              <Subtitles className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
              className={cn(
                "p-1.5 rounded-lg border text-xs font-mono transition-colors",
                isTranscriptOpen
                  ? "bg-court-orange/20 border-court-orange text-court-orange"
                  : "bg-court-card border-court-border text-muted-foreground"
              )}
              title="Interactive Transcript"
              aria-label="Interactive Transcript"
            >
              <FileText className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg bg-court-card hover:bg-court-cardHover border border-court-border text-muted-foreground hover:text-white transition-colors"
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. SEARCHABLE TRANSCRIPT & CUES DRAWER PANEL */}
      {isTranscriptOpen && exercise.transcript && exercise.transcript.length > 0 && (
        <div className="p-4 bg-court-dark border-t border-court-border/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-athletic font-bold uppercase text-court-orange flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Interactive Transcript &amp; Form Cues
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">
              Click any line to seek demonstration
            </span>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-2 text-xs">
            {exercise.transcript.map((line, idx) => {
              const isCurrent =
                currentTime >= line.seconds &&
                (idx === exercise.transcript.length - 1 || currentTime < exercise.transcript[idx + 1].seconds);

              return (
                <div
                  key={idx}
                  onClick={() => handleSeek(line.seconds)}
                  className={cn(
                    "p-2 rounded-lg transition-colors cursor-pointer flex items-start gap-2.5",
                    isCurrent
                      ? "bg-court-card border border-court-orange/40 text-white font-medium shadow-sm"
                      : "hover:bg-court-card/50 text-muted-foreground"
                  )}
                >
                  <span className="font-mono text-[10px] text-court-gold font-bold shrink-0 mt-0.5">
                    {line.timestamp}
                  </span>
                  <p className="flex-1 leading-relaxed text-xs">{line.text}</p>
                </div>
              );
            })}
          </div>

          <div className="p-2.5 rounded-xl bg-court-card/40 border border-court-border/40 text-[10px] text-muted-foreground leading-relaxed flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-court-cyan shrink-0 mt-0.5" />
            <span>
              <strong>Movement Standard Notice:</strong> Illustrative demonstration and platform coaching cues. Reviewed by {exercise.expertReviewer} on {exercise.reviewDate}.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
