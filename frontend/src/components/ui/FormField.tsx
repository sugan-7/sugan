import React from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  required = false,
  error,
  helperText,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("w-full space-y-1.5 text-left", className)}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground font-athletic">
          {label}
          {required && <span className="text-court-orange ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-[11px] font-medium text-rose-400 mt-1">{error}</p>}
      {helperText && !error && <p className="text-[11px] text-muted-foreground mt-1">{helperText}</p>}
    </div>
  );
}
