import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Athlete Account</CardTitle>
            <CardDescription>
              Step 1: Set up your secure account to begin multi-step assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input label="First Name" placeholder="Stephen" required />
                <Input label="Last Name" placeholder="Curry" required />
              </div>
              <Input
                label="Email Address"
                type="email"
                placeholder="athlete@example.com"
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="Minimum 8 characters"
                required
              />
              <Link href="/onboarding" className="block pt-2">
                <Button variant="primary" size="md" className="w-full">
                  Create Account & Begin Onboarding
                </Button>
              </Link>
            </form>
            <div className="mt-6 text-center text-xs text-muted-foreground">
              Already registered?{" "}
              <Link href="/login" className="text-court-gold hover:underline font-semibold">
                Sign in to your dashboard
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
