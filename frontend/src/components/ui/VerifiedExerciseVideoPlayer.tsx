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
  Sparkles,
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
  autoPlay = false,
  aspectRatio = "video",
  showTranscriptPanel = false,
  onVideoEnded,
}: VerifiedExerciseVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isLooping, setIsLooping] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(showTranscriptPanel);
  const [selectedAngle, setSelectedAngle] = useState<CameraAngle>("FRONT");

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(exercise.durationSeconds || 30);
  const [bufferedPercent, setBufferedPercent] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [hasNetworkError, setHasNetworkError] = useState(false);
  const [showCuesOverlay, setShowCuesOverlay] = useState(false);
  const [showMistakesOverlay, setShowMistakesOverlay] = useState(false);
  const [activeCue, setActiveCue] = useState<CueTimestamp | null>(null);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");

  // Determine current active video URL based on selected angle
  const activeVideoUrl =
    exercise.videoAngles?.find((a) => a.angle === selectedAngle)?.url ||
    exercise.videoUrl;

  // Handle Play/Pause
  const togglePlay = () => {
    if (!videoRef.current || !activeVideoUrl) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      setHasNetworkError(false);
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  // Handle Mute Toggle
  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  // Handle Playback Speed change
  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  // Handle Seek
  const handleSeek = (seconds: number) => {
    if (!videoRef.current) return;
    const target = Math.max(0, Math.min(seconds, duration));
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  // Handle Fullscreen Toggle
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

  // Time update listener
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);

    // Update active cue based on timeline
    const matchedCue = exercise.cueTimestamps
      .slice()
      .reverse()
      .find((c) => curr >= c.timeSeconds);
    setActiveCue(matchedCue || null);

    // Update active subtitle from transcript
    if (exercise.transcript && exercise.transcript.length > 0) {
      const activeLine = exercise.transcript
        .slice()
        .reverse()
        .find((line) => curr >= line.seconds);
      setCurrentSubtitle(activeLine ? activeLine.text : "");
    }
  };

  // Handle Buffer Progress
  const handleProgress = () => {
    if (!videoRef.current) return;
    const buf = videoRef.current.buffered;
    if (buf.length > 0 && duration > 0) {
      const bufferedEnd = buf.end(buf.length - 1);
      setBufferedPercent((bufferedEnd / duration) * 100);
    }
  };

  // Handle Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only react if active element is not an input
      if (["INPUT", "TEXTAREA", "SELECT"].includes((document.activeElement?.tagName || ""))) {
        return;
      }
      if (e.code === "Space" || e.key === "k") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "m") {
        e.preventDefault();
        toggleMute();
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

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative rounded-2xl overflow-hidden bg-court-obsidian border border-court-border/80 text-foreground group flex flex-col justify-between shadow-2xl select-none",
        aspectRatio === "video" ? "aspect-video" : aspectRatio === "wide" ? "aspect-[21/9]" : "aspect-square",
        className
      )}
    >
      {/* 1. MISSING / COMING SOON VIDEO FALLBACK */}
      {!activeVideoUrl ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 bg-court-charcoal/80">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-court-gold">
            <Clock className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-sm">
            <Badge variant="gold" size="sm">Video Coming Soon</Badge>
            <h4 className="text-xl font-athletic font-black text-white uppercase mt-2">
              {exercise.name}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Official demonstration is in expert review. Complete step-by-step setup and safety instructions are provided below.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-court-card border border-court-border text-left text-xs max-w-md w-full space-y-1">
            <span className="font-athletic font-bold text-court-orange uppercase text-[10px] block">
              Starting Form Prescription:
            </span>
            <p className="text-white/90 text-xs">{exercise.instructions.setup}</p>
          </div>
        </div>
      ) : hasNetworkError ? (
        /* 2. NETWORK ERROR & RETRY STATE */
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 bg-court-charcoal/90">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-sm">
            <Badge variant="rose" size="sm">Network Interrupted</Badge>
            <h4 className="text-lg font-athletic font-black text-white uppercase mt-1">
              Unable to Load Demonstration Video
            </h4>
            <p className="text-xs text-muted-foreground">
              Your workout progress is saved. Check your internet connection or use written form cues.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setHasNetworkError(false);
              if (videoRef.current) {
                videoRef.current.load();
                videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
              }
            }}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Retry Video
          </Button>
        </div>
      ) : (
        /* 3. ACTIVE HTML5 VIDEO CONTAINER */
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={activeVideoUrl}
            poster={exercise.posterUrl}
            playsInline
            muted={isMuted}
            loop={isLooping}
            onTimeUpdate={handleTimeUpdate}
            onProgress={handleProgress}
            onLoadedMetadata={() => {
              if (videoRef.current) setDuration(videoRef.current.duration || exercise.durationSeconds);
              setIsLoading(false);
            }}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => {
              setIsLoading(false);
              setIsPlaying(true);
            }}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              setIsPlaying(false);
              if (onVideoEnded) onVideoEnded();
            }}
            onError={() => {
              setIsLoading(false);
              setHasNetworkError(true);
            }}
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
          />

          {/* Loading Indicator Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs pointer-events-none">
              <RefreshCw className="w-8 h-8 text-court-orange animate-spin" />
            </div>
          )}

          {/* Initial Poster Play / Watch Form Overlay */}
          {!isPlaying && !isLoading && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-court-orange text-white font-athletic font-black uppercase text-sm shadow-glow-orange group-hover:scale-105 transition-transform">
                <Play className="w-5 h-5 fill-current" />
                <span>Watch Form Demo</span>
              </div>
            </div>
          )}

          {/* Top Bar Header Overlay */}
          <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between text-xs z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-[10px] text-muted-foreground uppercase">
                {exercise.sourceOrganization || "VERTEX Lab"} • {exercise.licenseStatus}
              </span>
            </div>

            {/* Camera Angle Switcher */}
            {exercise.videoAngles && exercise.videoAngles.length > 1 && (
              <div className="flex items-center gap-1 bg-black/60 p-1 rounded-lg border border-white/10">
                {exercise.videoAngles.map((ang) => (
                  <button
                    key={ang.angle}
                    type="button"
                    onClick={() => setSelectedAngle(ang.angle)}
                    className={cn(
                      "px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-colors",
                      selectedAngle === ang.angle
                        ? "bg-court-orange text-white"
                        : "text-muted-foreground hover:text-white"
                    )}
                  >
                    {ang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Real-time Subtitles / Closed Captions */}
          {showCaptions && currentSubtitle && (
            <div className="absolute bottom-16 left-4 right-4 text-center z-10 pointer-events-none">
              <span className="inline-block px-3 py-1.5 rounded-lg bg-black/85 border border-white/15 text-white font-medium text-xs sm:text-sm backdrop-blur-xs shadow-lg">
                {currentSubtitle}
              </span>
            </div>
          )}

          {/* Active Movement Cue Overlay Toast */}
          {showCuesOverlay && activeCue && (
            <div className="absolute top-12 left-4 z-10 animate-fade-in pointer-events-none">
              <div className="px-3 py-1.5 rounded-lg bg-court-charcoal/95 border border-court-orange text-court-orange text-xs font-athletic font-bold uppercase flex items-center gap-2 shadow-lg">
                <Zap className="w-3.5 h-3.5" />
                <span>Phase: {activeCue.label}</span>
              </div>
            </div>
          )}

          {/* Mistakes Warning Overlay */}
          {showMistakesOverlay && exercise.commonMistakes.length > 0 && (
            <div className="absolute top-12 right-4 z-10 max-w-xs animate-fade-in pointer-events-none">
              <div className="p-2.5 rounded-xl bg-rose-950/90 border border-rose-500/50 text-rose-200 text-[11px] space-y-1 shadow-lg backdrop-blur-xs">
                <span className="font-athletic font-bold text-rose-400 uppercase text-[10px] flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-rose-400" /> Mistakes to Avoid:
                </span>
                <p className="line-clamp-2">{exercise.commonMistakes[0]}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. CONTROLS STRIP & TIMELINE */}
      {activeVideoUrl && (
        <div className="relative z-10 bg-court-charcoal/95 border-t border-court-border p-3 space-y-2">
          {/* Interactive Timeline Bar with Cue Markers */}
          <div className="relative w-full h-2 bg-court-dark rounded-full overflow-hidden cursor-pointer group/timeline">
            {/* Buffered progress bar */}
            <div
              className="absolute top-0 bottom-0 left-0 bg-court-border/60 transition-all"
              style={{ width: `${bufferedPercent}%` }}
            />
            {/* Played progress bar */}
            <div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-court-orange to-amber-400 transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />

            {/* Cue Timestamp Markers on Timeline */}
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

            {/* Click-to-seek input */}
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              aria-label="Seek Video Timeline"
            />
          </div>

          {/* Control Buttons Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              {/* Play/Pause */}
              <button
                type="button"
                onClick={togglePlay}
                className="p-1.5 rounded-lg bg-court-card hover:bg-court-cardHover border border-court-border text-white transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              {/* Replay 10s */}
              <button
                type="button"
                onClick={() => handleSeek(currentTime - 10)}
                className="p-1.5 rounded-lg bg-court-card hover:bg-court-cardHover border border-court-border text-muted-foreground hover:text-white transition-colors"
                aria-label="Rewind 10 Seconds"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Mute/Volume */}
              <button
                type="button"
                onClick={toggleMute}
                className="p-1.5 rounded-lg bg-court-card hover:bg-court-cardHover border border-court-border text-muted-foreground hover:text-white transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-court-orange" />}
              </button>

              {/* Time Display */}
              <span className="font-mono text-[11px] text-muted-foreground">
                <strong className="text-white">{formatTime(currentTime)}</strong> / {formatTime(duration)}
              </span>
            </div>

            {/* Right-aligned feature toggles */}
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

              {/* CC Captions */}
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

              {/* Cues Overlay Toggle */}
              <button
                type="button"
                onClick={() => setShowCuesOverlay(!showCuesOverlay)}
                className={cn(
                  "px-2 py-1 rounded-lg border text-[10px] font-athletic font-bold uppercase transition-colors hidden sm:inline-flex",
                  showCuesOverlay
                    ? "bg-court-orange/20 border-court-orange text-court-orange"
                    : "bg-court-card border-court-border text-muted-foreground"
                )}
              >
                Cues {showCuesOverlay ? "ON" : "OFF"}
              </button>

              {/* Fullscreen */}
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
      )}

      {/* 5. INTERACTIVE TRANSCRIPT & FORM INSTRUCTIONS PANEL */}
      {isTranscriptOpen && exercise.transcript && exercise.transcript.length > 0 && (
        <div className="p-4 bg-court-dark border-t border-court-border/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-athletic font-bold uppercase text-court-orange flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Interactive Transcript & Cues
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">
              Click any line to seek video
            </span>
          </div>

          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2 text-xs">
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

          {/* Educational Movement Guide Disclaimer */}
          <div className="p-2.5 rounded-xl bg-court-card/40 border border-court-border/40 text-[10px] text-muted-foreground leading-relaxed flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-court-cyan shrink-0 mt-0.5" />
            <span>
              <strong>Movement Standard Notice:</strong> Illustrative demonstration and platform coaching cues. Not a clinical diagnosis or individualized medical prescription.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
