import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VERTEX | AI-Assisted Basketball Athlete Performance Platform",
  description:
    "Personalized basketball performance training built around your body, your goals, and your progress. Deterministic training engine, transparent jump measurements, and structured recovery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
