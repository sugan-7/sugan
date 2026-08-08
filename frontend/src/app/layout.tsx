import type { Metadata, Viewport } from "next";
import { Inter, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#080A0F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "VERTEX | Elite Basketball Performance & Vertical Jump Lab",
    template: "%s | VERTEX Performance",
  },
  description:
    "Personalized basketball performance training built around your body, your goals, and your progress. Deterministic training engine, transparent jump measurements, and structured recovery.",
  keywords: [
    "basketball vertical jump",
    "vertical jump training",
    "basketball performance",
    "deterministic training engine",
    "jump lab",
    "approach jump",
    "athletic development",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-court-dark text-foreground flex flex-col font-sans selection:bg-court-orange selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
