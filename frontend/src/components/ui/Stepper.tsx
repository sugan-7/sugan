"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepItem {
  id: string | number;
  title: string;
  subtitle?: string;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number; // 0-indexed
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  className,
}: StepperProps) {
  return (
    <div className={cn("w-full py-4", className)}>
      <div className="flex items-center justify-between relative">
        {/* Background connector line */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-0.5 bg-court-border -z-0" />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <div
              key={step.id}
              onClick={() => onStepClick && isCompleted && onStepClick(index)}
              className={cn(
                "relative z-10 flex flex-col items-center group",
                isCompleted && onStepClick && "cursor-pointer"
              )}
            >
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center font-athletic font-bold text-xs transition-all duration-200 border-2",
                  isCompleted &&
                    "bg-court-orange text-white border-court-orange shadow-glow-orange",
                  isCurrent &&
                    "bg-court-card text-court-orange border-court-orange ring-4 ring-court-orange/20 shadow-glow-orange",
                  isUpcoming && "bg-court-charcoal text-muted-foreground border-court-border"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : index + 1}
              </div>

              <div className="hidden sm:block text-center mt-2 absolute top-10 -left-12 -right-12">
                <span
                  className={cn(
                    "text-[11px] font-athletic uppercase tracking-wider block font-bold truncate",
                    isCurrent && "text-court-orange",
                    isCompleted && "text-white",
                    isUpcoming && "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
