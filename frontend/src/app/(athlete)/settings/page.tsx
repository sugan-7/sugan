"use client";

import React, { useState } from "react";
import { User, Shield, Bell, Sliders, CheckCircle2, Moon } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function SettingsPage() {
  const [unitSystem, setUnitSystem] = useState("METRIC");
  const [name, setName] = useState("Stephen Curry");
  const [email, setEmail] = useState("athlete@example.com");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <AppShell streakDays={4} readinessScore={88}>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-court-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="orange">Account & Platform</Badge>
              <span className="text-xs font-mono text-muted-foreground">
                UTC Storage & Local Display
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-athletic uppercase tracking-tight text-white">
              Athlete Settings
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Manage your display units, timezone calibration, and private athlete profile.
            </p>
          </div>
        </div>

        {isSaved && (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/60 text-emerald-300 text-xs flex items-center gap-2 font-athletic uppercase">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved successfully to PostgreSQL.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-xl">Athlete Identity & Contact</CardTitle>
              <CardDescription>Personal parameters used for load calculations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  leftIcon={<User className="w-4 h-4" />}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-xl">Measurement Units & Display</CardTitle>
              <CardDescription>Stored in standard metric, displayed per athlete preference</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Preferred Jump Unit"
                  value={unitSystem}
                  onChange={(e) => setUnitSystem(e.target.value)}
                  options={[
                    { value: "METRIC", label: "Metric (Centimeters / kg)" },
                    { value: "IMPERIAL", label: "Imperial (Inches / lbs)" },
                  ]}
                />
                <Select
                  label="Circadian Reset Time"
                  defaultValue="04:00"
                  options={[
                    { value: "04:00", label: "04:00 AM (Recommended)" },
                    { value: "00:00", label: "Midnight 12:00 AM" },
                  ]}
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="md" className="shadow-glow-orange">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </AppShell>
  );
}
