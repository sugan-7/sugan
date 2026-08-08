export type PublicationStatus = "DRAFT" | "IN_REVIEW" | "APPROVED" | "PUBLISHED" | "ARCHIVED";

export type LicenseStatus =
  | "PROPRIETARY_VERTEX"
  | "CREATIVE_COMMONS_BY"
  | "EDUCATIONAL_COMMONS"
  | "LICENSED_PARTNER";

export type CameraAngle = "FRONT" | "SIDE" | "45_DEGREE";

export type ExerciseCategory =
  | "PLYOMETRIC"
  | "STRENGTH"
  | "ISOMETRIC"
  | "HYPERTROPHY"
  | "MOBILITY"
  | "SPEED_AGILITY"
  | "RECOVERY";

export type ExerciseDifficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "ELITE";

export interface TranscriptLine {
  timestamp: string;
  seconds: number;
  text: string;
  speaker?: string;
}

export interface CueTimestamp {
  timeSeconds: number;
  label: string;
  phase: string;
}

export interface MovementInstruction {
  setup: string;
  startingPosition: string;
  execution: string;
  tempo: string;
  rangeOfMotion: string;
  breathingBracing: string;
  landingDeceleration?: string;
}

export interface ExerciseVariation {
  name: string;
  description: string;
  exerciseId?: string;
}

export interface EvidenceReference {
  title: string;
  authors: string;
  year: number;
  journal?: string;
  keyFinding: string;
}

export interface VideoAngleSource {
  angle: CameraAngle;
  url: string;
  label: string;
}

export interface SlowMotionSegment {
  startSeconds: number;
  endSeconds: number;
  speed: number;
  description: string;
}

export interface ExerciseModel {
  id: string;
  name: string;
  category: ExerciseCategory;
  subcategory: string;
  difficulty: ExerciseDifficulty;
  equipment: string[];
  primaryObjective: string;
  secondaryObjectives: string[];
  targetMovementQualities: string[];
  instructions: MovementInstruction;
  coachingCues: string[];
  commonMistakes: string[];
  regressions: ExerciseVariation[];
  progressions: ExerciseVariation[];
  safetyNotes: string[];
  contraindicationFlags: string[];
  experienceLevel: string;
  videoUrl?: string;
  videoAngles?: VideoAngleSource[];
  posterUrl?: string;
  captionsUrl?: string;
  transcript: TranscriptLine[];
  durationSeconds: number;
  slowMotionSegments?: SlowMotionSegment[];
  cueTimestamps: CueTimestamp[];
  evidenceReferences: EvidenceReference[];
  sourceOrganization: string;
  licenseStatus: LicenseStatus;
  expertReviewer: string;
  reviewDate: string;
  contentVersion: string;
  publicationStatus: PublicationStatus;
}
