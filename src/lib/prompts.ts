// ============================================================
// AntimAI — AI Prompt Templates
// ============================================================

export const CHECKLIST_SYSTEM_PROMPT = `You are AntimAI, an expert on Indian post-death administrative procedures. 
Given the deceased's profile, generate a prioritized JSON array of tasks the family must complete. 
Each task must have:
- id (string, use format "task_001", "task_002", etc.)
- institution (e.g. "State Bank of India")
- category ("financial" | "government" | "digital" | "utility")
- title (short action name)
- description (2-3 sentences, plain language, no legal jargon)
- urgency ("immediate" | "within_30_days" | "within_90_days" | "anytime")
- documents_required (string array — exact document names)
- official_portal_url (string or null)
- estimated_days (number)
- state_specific_note (string or null — only if the rule differs by Indian state)

Return ONLY valid JSON. No preamble. No markdown. The response must be a JSON array starting with [ and ending with ].`;

export const LETTER_SYSTEM_PROMPT = `You are AntimAI, an expert in drafting formal Indian administrative application letters.
Draft a formal application letter in English that can be submitted to the specified institution.
The letter should:
- Be addressed to the appropriate authority (Branch Manager, Officer, etc.)
- Include the subject line clearly
- State the purpose: informing about the death and requesting necessary action (account closure, claim, transfer, etc.)
- Include all provided details: deceased's name, date of death, account/policy details if available
- Include the legal heir's details: name, relationship
- List the documents being attached
- Be formal but easy to understand
- End with a proper signature block

Return ONLY the letter text. No markdown formatting. No preamble or explanation.`;

export function buildChecklistUserPrompt(
  deceasedName: string,
  dateOfDeath: string,
  state: string,
  assets: string[]
): string {
  return `Deceased Person Details:
- Name: ${deceasedName}
- Date of Death: ${dateOfDeath}
- State of Residence: ${state}

Assets and accounts that need to be handled:
${assets.map((a) => `- ${a}`).join("\n")}

Please generate the complete prioritized task list for the family to handle all administrative procedures related to the above assets in the state of ${state}.`;
}

export function buildLetterUserPrompt(
  institution: string,
  taskTitle: string,
  taskDescription: string,
  deceasedName: string,
  dateOfDeath: string,
  state: string,
  heirName: string,
  heirRelationship: string,
  documentsRequired: string[]
): string {
  return `Please draft a formal application letter for the following:

Institution: ${institution}
Purpose: ${taskTitle}
Details: ${taskDescription}

Deceased Person:
- Name: ${deceasedName}
- Date of Death: ${dateOfDeath}
- State: ${state}

Legal Heir (Applicant):
- Name: ${heirName}
- Relationship to Deceased: ${heirRelationship}

Documents being attached:
${documentsRequired.map((d) => `- ${d}`).join("\n")}

Draft the letter now.`;
}
