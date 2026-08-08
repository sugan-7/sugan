import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { Badge } from "@/components/ui/Badge";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-24 sm:py-32 border-b border-border/80 bg-gradient-to-b from-court-dark via-background to-secondary/30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.15),rgba(255,255,255,0))]" />
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
            <Badge variant="gold" className="mb-6">
              Deterministic Training Engine v2.1
            </Badge>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tight uppercase text-foreground leading-[1.05] mb-6">
              HOW HIGH CAN <br />
              <span className="bg-gradient-to-r from-court-gold via-amber-400 to-court-orange bg-clip-text text-transparent">
                YOU GO?
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
              Personalized basketball performance training built around your body, your goals and your progress.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  START YOUR ASSESSMENT
                </Button>
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  EXPLORE HOW IT WORKS
                </Button>
              </Link>
            </div>

            {/* Assessment Metric Teaser */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 text-left">
              <MetricCard
                label="Standing Vertical"
                value={null}
                unit="cm"
                statusLabel="Assessed via Reach"
                subtext="Standing Touch - Reach"
              />
              <MetricCard
                label="Approach Advantage"
                value={null}
                unit="cm"
                statusLabel="Kinetic Conversion"
                subtext="Approach - Standing"
              />
              <MetricCard
                label="Training Readiness"
                value={null}
                statusLabel="Circadian Metric"
                subtext="Sleep & RPE Load"
              />
              <MetricCard
                label="Goal Gap"
                value={null}
                unit="cm"
                statusLabel="Dunk & Rim Reach"
                subtext="Target - Baseline"
              />
            </div>
          </div>
        </section>

        {/* THE PROBLEM */}
        <section className="py-20 border-b border-border/80 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Badge variant="orange" className="mb-3">The Problem with Generic Training</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Generic Workouts Ignore Your Basketball Workload
              </h2>
              <p className="text-muted-foreground text-sm mt-3">
                Random internet vertical jump programs force high-impact plyometrics onto fatigued basketball players, risking overuse without progressive overload.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <span className="text-court-gold font-mono text-2xl font-bold mb-2">01</span>
                  <CardTitle>Zero Workload Awareness</CardTitle>
                  <CardDescription>
                    A heavy 40-minute pickup game or team practice taxes the central nervous system. Generic apps prescribe max-effort jumps without accounting for court volume.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <span className="text-court-gold font-mono text-2xl font-bold mb-2">02</span>
                  <CardTitle>Hallucinated AI Workouts</CardTitle>
                  <CardDescription>
                    Free-form chatbots invent arbitrary exercises without biomechanical safety filters, progressive overload phases, or contraindication checks.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <span className="text-court-gold font-mono text-2xl font-bold mb-2">03</span>
                  <CardTitle>Fabricated Outcomes</CardTitle>
                  <CardDescription>
                    Unscientific promises claiming "Guaranteed 10 inches in 4 weeks" disregard individual tendon stiffness, takeoff mechanics, and biological adaptation rates.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* HOW VERTEX WORKS - THE CLOSED LOOP */}
        <section className="py-20 border-b border-border/80 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Badge variant="gold" className="mb-3">Deterministic Engine</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                The VERTEX Continuous Performance Loop
              </h2>
              <p className="text-muted-foreground text-sm mt-3 font-mono">
                ASSESS → ANALYZE → PLAN → TRAIN → MEASURE → RECOVER → LEARN → ADAPT → IMPROVE
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>1. Multi-Vector Assessment</CardTitle>
                  <CardDescription>
                    We capture your physical parameters, basketball schedule, training history, equipment availability, and transparent standing/approach jump reach.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <p>• Standing Reach & Touch Measurement</p>
                  <p>• 1-Foot vs. 2-Foot Jump Style Preference</p>
                  <p>• Safety & Musculoskeletal Pain Screening</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Authoritative Training Engine</CardTitle>
                  <CardDescription>
                    A rule-based deterministic Java engine selects structured progressions across 4 distinct phases: Foundation, Strength + Elasticity, Power Development, and Jump Expression.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <p>• Beginner-Safe Plyometric Progressions</p>
                  <p>• Basketball Game & Practice Spacing</p>
                  <p>• Rate of Force Development (RFD) Loading</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Mobile Daily Execution</CardTitle>
                  <CardDescription>
                    Fast, low-latency workout player with set timers, load guidance, movement cues, and post-session RPE and soreness tracking.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <p>• Offline-Tolerant Set Logging</p>
                  <p>• Session RPE (1-10) Fatigue Capture</p>
                  <p>• Rest Interval Management</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Constrained AI Coach</CardTitle>
                  <CardDescription>
                    AI explains trends and synthesizes weekly performance summaries, but is strictly prohibited from mutating core training prescriptions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <p>• Transparent Explanations of Prescriptions</p>
                  <p>• Goal Gap & Approach Advantage Analysis</p>
                  <p>• Zero Fabricated Claims or Testimonials</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA STRIP */}
        <section className="py-16 bg-gradient-to-r from-court-card to-secondary text-center border-b border-border/80">
          <div className="container mx-auto px-4 max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
              Ready to Establish Your Jump Baseline?
            </h3>
            <p className="text-muted-foreground text-sm mb-8">
              Complete your athlete profile, screen for safety, and receive a deterministic 8-week basketball athletic development program.
            </p>
            <Link href="/register">
              <Button variant="primary" size="lg">
                START YOUR ASSESSMENT
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
