"use client";

import React, { useState } from "react";
import { Sparkles, Send, ShieldCheck, Lock, Info, Bot } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export default function AiCoachPage() {
  const [messages, setMessages] = useState([
    {
      role: "coach",
      text: "Hello Stephen. I am your VERTEX Performance Explainer. I analyze your logged jump tests, session RPE, and recovery readiness to explain the scientific principles behind your deterministic training program.",
    },
    {
      role: "athlete",
      text: "Why are today's pogo hops set to 3 sets of 15 instead of maximum box jumps?",
    },
    {
      role: "coach",
      text: "In Phase 1 (Foundation), our deterministic rule engine prioritizes tendon stiffness and stretch-shortening cycle (SSC) efficiency over maximal neuromuscular fatigue. Low-amplitude pogo hops condition the Achilles tendon to store elastic strain energy with minimal ground contact time, reducing knee shear stress while building rate of force development.",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = { role: "athlete", text: inputMessage };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");

    // Constrained AI Coach mock explanation
    setTimeout(() => {
      const coachReply = {
        role: "coach",
        text: `Your current standing vertical is 72.0 cm (+3.5 cm from baseline). Under the VERTEX safety policy, your training volume is locked to 4 days/week to align with your collegiate basketball schedule. Rest days are strictly preserved for central nervous system restoration.`,
      };
      setMessages((prev) => [...prev, coachReply]);
    }, 600);
  };

  return (
    <AppShell streakDays={4} readinessScore={88}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-court-border/80 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="gold">Constrained Intelligence</Badge>
              <span className="text-xs font-mono text-muted-foreground">
                Non-Prescriptive Explanations
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-athletic uppercase tracking-tight text-white">
              VERTEX AI Coach
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Ask questions about exercise biomechanics, tendon adaptation, and your weekly progress.
            </p>
          </div>
        </div>

        {/* Safety Guardrail Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-court-gold/40 text-xs text-amber-200/90 flex items-center gap-2.5">
          <Lock className="w-4 h-4 text-court-gold shrink-0" />
          <span>
            <strong>Safety Constraint:</strong> The AI Coach provides explainable summaries but cannot alter core medical safety or deterministic exercise volume.
          </span>
        </div>

        {/* Chat Messages Container */}
        <Card variant="glass" className="h-[480px] flex flex-col justify-between p-4 sm:p-6">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-xs ${
                  msg.role === "athlete" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "coach" && (
                  <div className="w-8 h-8 rounded-xl bg-court-gold/20 border border-court-gold/40 flex items-center justify-center text-court-gold shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-4 rounded-2xl max-w-lg leading-relaxed ${
                    msg.role === "athlete"
                      ? "bg-court-orange text-white font-medium rounded-tr-none shadow-glow-orange"
                      : "bg-court-card border border-court-border text-foreground rounded-tl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="flex gap-2 pt-4 border-t border-court-border/60">
            <Input
              placeholder="Ask why a workout is structured, or how tendon stiffness works..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              leftIcon={<Send className="w-4 h-4" />}
            >
              Ask
            </Button>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
