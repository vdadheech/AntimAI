"use client";

// ============================================================
// AntimAI — Landing Page
// ============================================================

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Logo from "@/components/shared/Logo";

const features = [
  {
    icon: "🤖",
    title: "AI-Powered Checklist",
    description:
      "Tell us about the assets and accounts. Our AI instantly generates a prioritized task list specific to your state and situation.",
  },
  {
    icon: "📄",
    title: "Auto-Generated Letters",
    description:
      "Download ready-to-submit application letters for banks, insurance companies, and government offices — pre-filled with all details.",
  },
  {
    icon: "📊",
    title: "Track Every Step",
    description:
      "A clear dashboard shows what's done, what's urgent, and what's next. Never miss a deadline or forget a document.",
  },
];

const steps = [
  {
    number: "01",
    title: "Share the Details",
    description: "Fill in basic information about the deceased, their assets, and your relationship.",
  },
  {
    number: "02",
    title: "Get Your Checklist",
    description: "AI analyzes everything and creates a personalized, prioritized action plan.",
  },
  {
    number: "03",
    title: "Complete & Track",
    description: "Work through tasks, generate letters, and mark items as done on your dashboard.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid pointer-events-none" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none" />

      {/* ── Hero Section ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-accent font-medium">
              AI-Powered • Built for India
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up">
            Navigate life&apos;s hardest
            <br />
            <span className="text-gradient">paperwork</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            When someone passes away, families face an overwhelming maze of legal 
            and financial tasks. AntimAI guides you through every step — so you can 
            focus on what truly matters.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <SignedOut>
              <Link href="/sign-up" className="btn-primary text-lg px-8 py-4">
                Start Free — No Payment Needed
              </Link>
              <Link href="/sign-in" className="btn-secondary text-base px-6 py-3">
                I have an account
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/onboard" className="btn-primary text-lg px-8 py-4">
                Start a New Case
              </Link>
            </SignedIn>
          </div>

          {/* Trust signal */}
          <p className="text-sm text-slate-500 mt-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            🔒 Your data is encrypted and never shared. We handle sensitive information with care.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-accent animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need, <span className="text-gradient">nothing you don&apos;t</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              We&apos;ve simplified the overwhelming process into three powerful tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-8 animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works Section ── */}
      <section className="relative py-24 px-4 border-t" style={{ borderColor: "var(--border-color)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Three steps to <span className="text-gradient">peace of mind</span>
            </h2>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex items-start gap-6 animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-gradient"
                  style={{
                    background: "rgba(249, 115, 22, 0.08)",
                    border: "1px solid rgba(249, 115, 22, 0.2)",
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="glass-card p-12 relative overflow-hidden"
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.15), transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <div className="mb-6">
                <Logo size="large" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to get started?
              </h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                Don&apos;t navigate this alone. Let AI handle the paperwork while you 
                take care of your family.
              </p>
              <SignedOut>
                <Link href="/sign-up" className="btn-primary text-lg px-8 py-4 inline-block">
                  Create Free Account
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/onboard" className="btn-primary text-lg px-8 py-4 inline-block">
                  Start a New Case
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t py-8 px-4" style={{ borderColor: "var(--border-color)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="small" />
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} AntimAI. Built with care for Indian families.
          </p>
        </div>
      </footer>
    </div>
  );
}
