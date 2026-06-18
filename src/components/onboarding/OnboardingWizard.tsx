"use client";

// ============================================================
// AntimAI — Onboarding Wizard (Multi-Step Form)
// ============================================================

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ASSET_OPTIONS, INDIAN_STATES, RELATIONSHIP_OPTIONS } from "@/lib/constants";
import { AssetType, CaseFormData } from "@/types";
import Logo from "@/components/shared/Logo";

type Step = 1 | 2 | 3;

export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");

  const [formData, setFormData] = useState<CaseFormData>({
    deceasedName: "",
    deceasedDod: "",
    state: "",
    assets: [],
    heirsName: "",
    heirsRelationship: "",
    heirsContact: "",
  });

  const updateField = useCallback(
    <K extends keyof CaseFormData>(key: K, value: CaseFormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
      setError(null);
    },
    []
  );

  const toggleAsset = useCallback((asset: AssetType) => {
    setFormData((prev) => ({
      ...prev,
      assets: prev.assets.includes(asset)
        ? prev.assets.filter((a) => a !== asset)
        : [...prev.assets, asset],
    }));
  }, []);

  const goNext = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.deceasedName.trim()) {
        setError("Please enter the deceased's name");
        return;
      }
      if (!formData.deceasedDod) {
        setError("Please enter the date of death");
        return;
      }
      if (!formData.state) {
        setError("Please select a state");
        return;
      }
    }
    if (step === 2) {
      if (formData.assets.length === 0) {
        setError("Please select at least one asset or account");
        return;
      }
    }

    setSlideDirection("left");
    setStep((s) => Math.min(s + 1, 3) as Step);
  };

  const goBack = () => {
    setSlideDirection("right");
    setStep((s) => Math.max(s - 1, 1) as Step);
  };

  const handleSubmit = async () => {
    // Validate step 3
    if (!formData.heirsName.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!formData.heirsRelationship) {
      setError("Please select your relationship");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Create the case
      const caseRes = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!caseRes.ok) {
        const err = await caseRes.json();
        throw new Error(err.error || "Failed to create case");
      }

      const { caseId } = await caseRes.json();

      // 2. Trigger AI checklist generation (fire & forget — dashboard will poll)
      fetch("/api/generate-checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseId }),
      }).catch(console.error);

      // 3. Redirect to dashboard
      router.push(`/dashboard/${caseId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsSubmitting(false);
    }
  };

  const stepLabels = ["Deceased Details", "Assets & Accounts", "Your Details"];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Start a New Case</h1>
          <p className="text-slate-400">
            We&apos;ll use this information to create your personalized action plan.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`step-indicator ${
                    s === step ? "active" : s < step ? "completed" : "inactive"
                  }`}
                >
                  {s < step ? "✓" : s}
                </div>
                <span className="text-xs text-slate-500 hidden sm:block">
                  {stepLabels[s - 1]}
                </span>
              </div>
              {s < 3 && (
                <div
                  className="w-16 sm:w-24 h-0.5 rounded-full transition-all duration-500 mb-5 sm:mb-0"
                  style={{
                    background: s < step
                      ? "linear-gradient(90deg, #f97316, #fb923c)"
                      : "var(--border-color)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="glass-card p-8 sm:p-10">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm animate-fade-in">
              ⚠️ {error}
            </div>
          )}

          {/* Step 1: Deceased Details */}
          {step === 1 && (
            <div
              className={`space-y-6 ${
                slideDirection === "left" ? "animate-slide-left" : "animate-slide-right"
              }`}
            >
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name of the Deceased
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter full legal name"
                  value={formData.deceasedName}
                  onChange={(e) => updateField("deceasedName", e.target.value)}
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Date of Death
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.deceasedDod}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => updateField("deceasedDod", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  State of Residence
                </label>
                <select
                  className="select-field"
                  value={formData.state}
                  onChange={(e) => updateField("state", e.target.value)}
                >
                  <option value="">Select state...</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Asset Checklist */}
          {step === 2 && (
            <div
              className={`${
                slideDirection === "left" ? "animate-slide-left" : "animate-slide-right"
              }`}
            >
              <p className="text-sm text-slate-400 mb-6">
                Select all assets, accounts, and services that need to be handled.
                Don&apos;t worry — you can always update this later.
              </p>

              {/* Group by category */}
              {["Financial", "Government", "Utility", "Digital"].map((category) => {
                const categoryAssets = ASSET_OPTIONS.filter(
                  (a) => a.category === category
                );
                return (
                  <div key={category} className="mb-6">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {categoryAssets.map((asset) => (
                        <button
                          key={asset.value}
                          type="button"
                          onClick={() => toggleAsset(asset.value)}
                          className={`asset-card ${
                            formData.assets.includes(asset.value)
                              ? "selected"
                              : ""
                          }`}
                        >
                          <span className="text-xl">{asset.icon}</span>
                          <span className="text-sm font-medium">
                            {asset.label}
                          </span>
                          {formData.assets.includes(asset.value) && (
                            <span className="ml-auto text-accent text-lg">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}

              {formData.assets.length > 0 && (
                <p className="text-sm text-accent mt-4">
                  {formData.assets.length} item{formData.assets.length > 1 ? "s" : ""} selected
                </p>
              )}
            </div>
          )}

          {/* Step 3: Legal Heir Details */}
          {step === 3 && (
            <div
              className={`space-y-6 ${
                slideDirection === "left" ? "animate-slide-left" : "animate-slide-right"
              }`}
            >
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Full Name (Legal Heir / Applicant)
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter your full legal name"
                  value={formData.heirsName}
                  onChange={(e) => updateField("heirsName", e.target.value)}
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Relationship to Deceased
                </label>
                <select
                  className="select-field"
                  value={formData.heirsRelationship}
                  onChange={(e) =>
                    updateField("heirsRelationship", e.target.value)
                  }
                >
                  <option value="">Select relationship...</option>
                  {RELATIONSHIP_OPTIONS.map((rel) => (
                    <option key={rel} value={rel}>
                      {rel}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Contact Number{" "}
                  <span className="text-slate-500 font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="+91 98765 43210"
                  value={formData.heirsContact}
                  onChange={(e) => updateField("heirsContact", e.target.value)}
                />
              </div>

              {/* Summary */}
              <div
                className="rounded-lg p-4 mt-4"
                style={{
                  background: "rgba(249, 115, 22, 0.05)",
                  border: "1px solid rgba(249, 115, 22, 0.15)",
                }}
              >
                <h4 className="text-sm font-semibold text-accent mb-3">
                  📋 Case Summary
                </h4>
                <div className="space-y-1.5 text-sm text-slate-400">
                  <p>
                    <span className="text-slate-500">Deceased:</span>{" "}
                    {formData.deceasedName || "—"}
                  </p>
                  <p>
                    <span className="text-slate-500">Date of Death:</span>{" "}
                    {formData.deceasedDod || "—"}
                  </p>
                  <p>
                    <span className="text-slate-500">State:</span>{" "}
                    {formData.state || "—"}
                  </p>
                  <p>
                    <span className="text-slate-500">Assets:</span>{" "}
                    {formData.assets.length} selected
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-10">
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                className="btn-secondary"
                disabled={isSubmitting}
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={goNext}
                className="btn-primary"
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="btn-primary flex items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>Generate My Checklist 🚀</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
