// ============================================================
// AntimAI — Shared TypeScript Types
// ============================================================

export type AssetType =
  | "sbi_bank"
  | "other_bank"
  | "lic_insurance"
  | "other_insurance"
  | "epf_pf"
  | "property_land"
  | "mutual_funds"
  | "ppf"
  | "aadhaar"
  | "pan"
  | "electricity"
  | "gas_connection"
  | "mobile_number"
  | "email_accounts"
  | "facebook"
  | "instagram"
  | "gmail"
  | "netflix"
  | "hotstar"
  | "other_ott";

export type TaskCategory = "financial" | "government" | "digital" | "utility";

export type TaskUrgency =
  | "immediate"
  | "within_30_days"
  | "within_90_days"
  | "anytime";

export type TaskStatus = "pending" | "in-progress" | "done";

export interface CaseFormData {
  deceasedName: string;
  deceasedDod: string;
  state: string;
  assets: AssetType[];
  heirsName: string;
  heirsRelationship: string;
  heirsContact: string;
}

export interface CaseRecord {
  id: string;
  userId: string;
  heirsName: string;
  heirsRelationship: string;
  heirsContact: string | null;
  deceasedName: string;
  deceasedDod: string;
  state: string;
  assetsJson: AssetType[];
  createdAt: Date | null;
}

export interface TaskRecord {
  id: string;
  caseId: string;
  institution: string;
  category: TaskCategory;
  title: string;
  description: string;
  urgency: TaskUrgency;
  documentsRequiredJson: string[];
  officialPortalUrl: string | null;
  estimatedDays: number | null;
  stateSpecificNote: string | null;
  status: TaskStatus;
  createdAt: Date | null;
}

export interface GeneratedTask {
  id: string;
  institution: string;
  category: TaskCategory;
  title: string;
  description: string;
  urgency: TaskUrgency;
  documents_required: string[];
  official_portal_url: string | null;
  estimated_days: number;
  state_specific_note: string | null;
}
