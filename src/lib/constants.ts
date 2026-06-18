// ============================================================
// AntimAI — Constants & Configuration
// ============================================================

import { AssetType } from "@/types";

export const ASSET_OPTIONS: {
  value: AssetType;
  label: string;
  icon: string;
  category: string;
}[] = [
  { value: "sbi_bank", label: "SBI / Bank Accounts", icon: "🏦", category: "Financial" },
  { value: "other_bank", label: "Other Bank Accounts", icon: "🏧", category: "Financial" },
  { value: "lic_insurance", label: "LIC / Insurance", icon: "🛡️", category: "Financial" },
  { value: "other_insurance", label: "Other Insurance", icon: "📋", category: "Financial" },
  { value: "epf_pf", label: "EPF / PF", icon: "💼", category: "Financial" },
  { value: "mutual_funds", label: "Mutual Funds", icon: "📈", category: "Financial" },
  { value: "ppf", label: "PPF", icon: "🏛️", category: "Financial" },
  { value: "property_land", label: "Property / Land", icon: "🏠", category: "Financial" },
  { value: "aadhaar", label: "Aadhaar Card", icon: "🪪", category: "Government" },
  { value: "pan", label: "PAN Card", icon: "💳", category: "Government" },
  { value: "electricity", label: "Electricity Board", icon: "⚡", category: "Utility" },
  { value: "gas_connection", label: "Gas Connection", icon: "🔥", category: "Utility" },
  { value: "mobile_number", label: "Mobile Number", icon: "📱", category: "Utility" },
  { value: "email_accounts", label: "Email Accounts", icon: "📧", category: "Digital" },
  { value: "gmail", label: "Gmail", icon: "✉️", category: "Digital" },
  { value: "facebook", label: "Facebook", icon: "👤", category: "Digital" },
  { value: "instagram", label: "Instagram", icon: "📸", category: "Digital" },
  { value: "netflix", label: "Netflix", icon: "🎬", category: "Digital" },
  { value: "hotstar", label: "Disney+ Hotstar", icon: "⭐", category: "Digital" },
  { value: "other_ott", label: "Other OTT", icon: "📺", category: "Digital" },
];

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const RELATIONSHIP_OPTIONS = [
  "Spouse",
  "Son",
  "Daughter",
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Grandson",
  "Granddaughter",
  "Other",
];

export const URGENCY_CONFIG = {
  immediate: {
    label: "Immediate",
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.15)",
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  within_30_days: {
    label: "Within 30 Days",
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.15)",
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  within_90_days: {
    label: "Within 90 Days",
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.15)",
    borderColor: "rgba(59, 130, 246, 0.3)",
  },
  anytime: {
    label: "Anytime",
    color: "#6b7280",
    bgColor: "rgba(107, 114, 128, 0.15)",
    borderColor: "rgba(107, 114, 128, 0.3)",
  },
} as const;

export const CATEGORY_ICONS: Record<string, string> = {
  financial: "💰",
  government: "🏛️",
  digital: "💻",
  utility: "🔧",
};
