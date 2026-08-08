import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/80 bg-secondary/30 mt-20">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-court-gold text-court-dark font-black text-sm">
                V
              </span>
              <span className="font-mono tracking-tight text-xl font-bold text-foreground">VERTEX</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Production-grade, AI-assisted basketball athlete performance platform. Grounded in deterministic training logic, transparent measurements, and structured adaptation.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Athletics</h5>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/how-it-works" className="hover:text-court-gold">How It Works</Link></li>
              <li><Link href="/exercises" className="hover:text-court-gold">Exercise Database</Link></li>
              <li><Link href="/about" className="hover:text-court-gold">Evidence & Science Principles</Link></li>
              <li><Link href="/pricing" className="hover:text-court-gold">Platform Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Athlete Journey</h5>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/register" className="hover:text-court-gold">Start Assessment</Link></li>
              <li><Link href="/dashboard" className="hover:text-court-gold">Athlete Dashboard</Link></li>
              <li><Link href="/program" className="hover:text-court-gold">8-Week Program</Link></li>
              <li><Link href="/login" className="hover:text-court-gold">Sign In</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">System Boundaries</h5>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>PostgreSQL Authoritative Storage</p>
              <p>UTC Internal Timestamps</p>
              <p>Deterministic Training Authority</p>
              <p>Role-Based Athlete Isolation</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border/60 pt-6 space-y-3 text-[11px] text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">Medical & Safety Notice:</strong> VERTEX is a sports performance platform and is not a medical device. The AI coach and training engine are not physicians or physical therapists. The platform does not diagnose medical conditions, treat injuries, or prescribe medications. If you experience persistent musculoskeletal pain, seek professional medical evaluation.
          </p>
          <p>
            <strong className="text-foreground">Performance Disclaimer:</strong> VERTEX does not guarantee a dunk, specific vertical jump height increase, or athletic outcome. Progress depends on consistent execution, biomechanical individuality, genetics, rest, and progressive overload.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-3 text-[10px] text-muted-foreground border-t border-border/30">
            <p>&copy; {new Date().getFullYear()} VERTEX Performance Lab. All rights reserved.</p>
            <p className="mt-1 sm:mt-0 font-mono">v2.1 • Phase 0/1 Foundation</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
