"use client";

// ============================================================
// AntimAI — Landing Page (Academia / Classical Theme)
// ============================================================

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { BookOpen, ScrollText, Library, FileStack, ArrowRight } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="w-5 h-5 text-academia-accent" strokeWidth={1.5} />,
    title: "AI-Powered Checklist",
    description:
      "Tell us about the assets and accounts. Our intelligence engine instantly generates a prioritized task list specific to your state and situation.",
  },
  {
    icon: <ScrollText className="w-5 h-5 text-academia-accent" strokeWidth={1.5} />,
    title: "Auto-Generated Letters",
    description:
      "Download ready-to-submit application letters for banks, insurance companies, and government offices — flawlessly pre-filled.",
  },
  {
    icon: <Library className="w-5 h-5 text-academia-accent" strokeWidth={1.5} />,
    title: "Track Every Step",
    description:
      "A distinguished ledger shows what's done, what's urgent, and what's next. Never miss a deadline or forget a critical document.",
  },
];

const steps = [
  {
    number: "I",
    title: "Share the Details",
    description: "Provide the fundamental information about the deceased, their assets, and your relationship.",
  },
  {
    number: "II",
    title: "Receive the Proclamation",
    description: "Our systems analyze the jurisprudence to create a personalized, prioritized action plan.",
  },
  {
    number: "III",
    title: "Execute & Archive",
    description: "Work through tasks, generate formal letters, and mark items as completed in your ledger.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Note: The fixed paper texture and vignette are handled in layout.tsx */}
      
      {/* ── Hero Section ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto text-center relative z-10 ornate-frame p-8 sm:p-16">
          {/* Badge */}
          <div className="inline-flex items-center justify-center mb-8">
            <span className="font-display text-xs uppercase tracking-[0.25em] brass-text border border-academia-accent/30 px-6 py-2 rounded-full bg-academia-bg">
              Built for Indian Jurisprudence
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-7xl leading-[1.1] tracking-tight mb-8 text-academia-fg">
            Navigate life&apos;s hardest <br />
            <span className="text-gradient engraved-text italic">administrative burdens.</span>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-lg sm:text-xl text-academia-muted-fg max-w-2xl mx-auto mb-12 leading-relaxed">
            When someone passes away, families face an overwhelming maze of legal 
            and financial tasks. AntimAI serves as your dedicated guide through every step — 
            so you can focus on what truly matters.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <SignedOut>
              <Link href="/sign-up" className="btn-primary w-full sm:w-auto">
                Begin the Process <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link href="/sign-in" className="font-display uppercase text-xs tracking-widest text-academia-accent hover:text-[#D4B872] transition-colors duration-300">
                Access Existing Ledger
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="btn-primary w-full sm:w-auto">
                Open Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </SignedIn>
          </div>
          
          <div className="mt-16 text-xs text-academia-muted-fg font-display uppercase tracking-widest">
            — Trusted Guidance —
          </div>
        </div>
      </section>

      <div className="ornate-divider" />

      {/* ── Features Section ── */}
      <section className="relative py-24 sm:py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="font-display text-xs text-academia-accent uppercase tracking-[0.3em] block mb-4">
            Volume I
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl mb-6">
            Everything you need, <br /><span className="italic text-academia-muted-fg">nothing you don&apos;t</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card p-10 corner-flourish group"
            >
              <div className="w-14 h-14 rounded-full border border-academia-accent/30 bg-academia-bg flex items-center justify-center mb-6 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="font-heading text-2xl mb-4 group-hover:text-academia-accent transition-colors duration-300">{feature.title}</h3>
              <p className="font-body text-academia-muted-fg leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="ornate-divider" />

      {/* ── Product Detail / Proclamation ── */}
      <section className="relative py-24 sm:py-32 px-4 max-w-4xl mx-auto">
        <div className="glass-card p-8 sm:p-16 corner-flourish bg-academia-bg-alt/50 relative">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px bg-academia-accent/50 w-12" />
              <span className="font-display text-xs text-academia-accent uppercase tracking-[0.3em]">
                Proclamation
              </span>
              <div className="h-px bg-academia-accent/50 w-12" />
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl leading-tight">
              A dignified approach to <br /><span className="text-gradient">estate settlement.</span>
            </h2>
          </div>
          
          <div className="font-body text-lg text-academia-muted-fg leading-[1.8] space-y-6">
            <p className="drop-cap">
              The burden of administrative duties following a loss is a profound challenge. 
              We recognize that families are often forced to navigate complex bureaucratic 
              systems during their most vulnerable moments. 
            </p>
            <p>
              By translating convoluted legal requirements into clear, actionable steps, we restore 
              a sense of order. Our system generates precise documentation, eliminating the 
              uncertainty that often accompanies interactions with institutions and authorities.
            </p>
          </div>
        </div>
      </section>

      <div className="ornate-divider" />

      {/* ── How It Works Section ── */}
      <section className="relative py-24 sm:py-32 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="font-display text-xs text-academia-accent uppercase tracking-[0.3em] block mb-4">
            Volume II
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl mb-6">
            Three steps to peace of mind
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="font-display text-6xl text-academia-bg-alt font-bold absolute -top-8 -left-4 -z-10 select-none" style={{ WebkitTextStroke: "1px rgba(201, 169, 98, 0.2)" }}>
                {step.number}
              </div>
              <div className="pt-4">
                <span className="font-display text-xs text-academia-accent uppercase tracking-widest block mb-2">
                  Phase {step.number}
                </span>
                <h3 className="font-heading text-2xl mb-4">{step.title}</h3>
                <p className="font-body text-academia-muted-fg text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="ornate-divider" />

      {/* ── CTA Section ── */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center relative z-10 ornate-frame p-12">
          <div className="wax-seal-badge">
            <FileStack className="w-4 h-4" />
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl mb-6 mt-4">
            Ready to commence?
          </h2>
          <p className="font-body text-xl text-academia-muted-fg mb-10 max-w-xl mx-auto">
            Do not navigate this alone. Allow our systems to handle the paperwork 
            while you attend to your family.
          </p>
          <SignedOut>
            <Link href="/sign-up" className="btn-primary inline-flex">
              Establish a Ledger
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="btn-primary inline-flex">
              Return to Dashboard
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-academia-border py-12 px-4 mt-12 bg-academia-bg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display font-medium tracking-widest uppercase text-xl text-gradient">
            AntimAI
          </div>
          <p className="font-body text-academia-muted-fg text-sm">
            &copy; {new Date().getFullYear()} AntimAI. Conceived and constructed for Indian families.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="font-display text-xs uppercase tracking-widest text-academia-muted-fg hover:text-academia-accent transition-colors">Privacy</Link>
            <Link href="#" className="font-display text-xs uppercase tracking-widest text-academia-muted-fg hover:text-academia-accent transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
