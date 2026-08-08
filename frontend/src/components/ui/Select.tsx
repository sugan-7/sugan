"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options = [], children, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-bold uppercase tracking-wider text-muted-foreground font-athletic"
          >
            {label}
            {props.required && <span className="text-court-orange ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full appearance-none rounded-xl bg-court-charcoal/90 border border-court-border px-4 py-2.5 pr-10 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-court-orange focus:border-court-orange disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer",
              error && "border-rose-500 focus:ring-rose-500",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled} className="bg-court-charcoal text-white">
                {opt.label}
              </option>
            ))}
            {children}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <p className="text-[11px] font-medium text-rose-400 mt-1">{error}</p>}
        {helperText && !error && <p className="text-[11px] text-muted-foreground mt-1">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
