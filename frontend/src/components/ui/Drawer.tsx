"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Drawer({ open, onClose, title, children, className }: DrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "relative z-50 w-full max-w-lg rounded-t-3xl bg-court-charcoal glass-panel-elevated border-t border-court-border p-6 shadow-2xl max-h-[85vh] overflow-y-auto",
              className
            )}
          >
            {/* Grab handle */}
            <div className="w-12 h-1.5 rounded-full bg-court-border mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3 border-b border-court-border/60 mb-4">
              <h3 className="font-athletic text-xl font-black text-white uppercase tracking-tight">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-muted-foreground hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
