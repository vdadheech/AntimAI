# AntimAI

AntimAI is a "Post-Death Administrative Assistant" designed to help users generate checklists and official letters (in PDF format) for managing estate and administrative tasks after the loss of a loved one.

It's built specifically for Indian families: checklist generation and letter drafting are modeled on Indian institutions and state-specific procedures (Aadhaar, PAN, SBI, LIC, EPF, and more), backed by a case/task data model and a distinct dark "academia" visual identity (Cormorant Garamond / Cinzel typefaces, wax-seal and engraved-text motifs) instead of a generic SaaS look.

## How it works

1. **Sign up / sign in** — Authentication is handled by Clerk; every other route is gated behind it (`src/middleware.ts`).
2. **Start a case** — A 3-step onboarding wizard (`OnboardingWizard.tsx`) collects:
   - Deceased's name, date of death, and state of residence
   - The assets/accounts that need handling (bank, insurance, EPF, property, Aadhaar/PAN, utilities, social/digital accounts, OTT subscriptions)
   - The applicant's (legal heir's) name, relationship, and contact info
3. **AI generates the checklist** — On submit, the case is saved and an AI checklist-generation job is fired in the background. The dashboard polls `/api/tasks` every 3 seconds until tasks appear, so the user sees a loading state rather than a blocking spinner.
4. **Work the ledger** — The case dashboard shows a progress bar, filter tabs (by urgency or category), and a card per task. Each task carries an institution, required documents, an estimated turnaround, an official portal link (when applicable), and a state-specific note when a rule isn't uniform across India.
5. **Generate a letter** — For any task, the user can request a formal application letter. The AI drafts the letter text, which is rendered server-side into a branded PDF and streamed back as a download.

## Features

- **AI-generated, state-aware checklists** — prompts explicitly model Indian procedures (e.g. SBI/other bank account closure, LIC/insurance claims, EPF/PF transfer, PPF, property/land, Aadhaar/PAN, electricity/gas, mobile number, email, and social/OTT accounts), with each task carrying urgency, required documents, and an estimated timeline.
- **Automated letter drafting** — produces formal application letters addressed to the relevant institution, referencing the deceased, the heir, and the documents attached.
- **PDF export** — letters are rendered with `@react-pdf/renderer` (not a templated PDF library) so Unicode text from the LLM — smart quotes, em dashes — renders correctly, with an AntimAI letterhead and footer disclaimer.
- **Multi-case ledger** — a single account can track several cases at once, each with its own task list.
- **Resilient AI engine** — checklist/letter generation calls fall back across a chain of free OpenRouter models if the primary one is rate-limited or unavailable (see [AI architecture](#ai-architecture) below), and checklist parsing is retried once if the model returns malformed JSON.
- **Status tracking** — every task can be marked `pending`, `in-progress`, or `done`, independent of the AI-assigned urgency.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS — custom "academia" theme (custom color tokens, Cormorant Garamond / Crimson Pro / Cinzel fonts) |
| Auth | Clerk (`@clerk/nextjs`) |
| Database | PostgreSQL via Neon Serverless (`@neondatabase/serverless`) |
| ORM / migrations | Drizzle ORM + Drizzle Kit |
| AI engine | OpenRouter chat-completions API, multi-model fallback chain |
| PDF generation | `@react-pdf/renderer` |
| Icons | `lucide-react` |

## Data model

Two tables, defined in `src/db/schema.ts`:

**`cases`** — one row per deceased person being administered
- `id`, `userId` (Clerk user)
- `heirsName`, `heirsRelationship`, `heirsContact`
- `deceasedName`, `deceasedDod`, `state`
- `assetsJson` (array of asset/account codes selected during onboarding)
- `createdAt`

**`tasks`** — one row per checklist item generated for a case
- `id` (`{caseId}_{taskId}`), `caseId` (FK → `cases.id`)
- `institution`, `category` (`financial` | `government` | `digital` | `utility`)
- `title`, `description`, `urgency` (`immediate` | `within_30_days` | `within_90_days` | `anytime`)
- `documentsRequiredJson`, `officialPortalUrl`, `estimatedDays`, `stateSpecificNote`
- `status` (`pending` | `in-progress` | `done`), `createdAt`

## API routes

| Route | Method | Purpose |
|---|---|---|
| `/api/cases` | `POST` | Create a new case from onboarding data |
| `/api/cases` | `GET` | List the signed-in user's cases |
| `/api/generate-checklist` | `POST` | Call the AI to generate tasks for a case and persist them |
| `/api/tasks?caseId=` | `GET` | Fetch tasks for a case (polled by the dashboard) |
| `/api/tasks/[taskId]` | `PATCH` | Update a task's status |
| `/api/generate-letter` | `POST` | Draft a letter for a task via AI and return it as a PDF |

All routes require a Clerk session and verify the case/task belongs to the requesting user.

## AI architecture

`src/lib/openrouter.ts` wraps OpenRouter's chat-completions endpoint with a fallback chain: if a model errors or is rate-limited, the request is retried against the next model in the list, in order — currently `openai/gpt-oss-120b:free` (used by the checklist and letter routes) → `meta-llama/llama-3.3-70b-instruct:free` → `google/gemini-2.5-flash:free` → `google/gemini-2.0-flash-lite-preview-02-05:free` → `mistralai/mistral-nemo:free`. This is meant to keep the app usable on free-tier models without manual intervention if one provider is saturated.

Prompts live in `src/lib/prompts.ts`:
- The **checklist prompt** asks the model to return a strict JSON array of tasks for a given deceased profile, state, and asset list; the route strips markdown fencing and retries generation once if parsing fails.
- The **letter prompt** asks the model to draft a formal application letter in plain English for a specific institution and task, which is then handed to `src/lib/pdf.tsx` for PDF rendering.

## Getting started

### Prerequisites
- Node.js 18+
- A [Neon](https://neon.tech) PostgreSQL database
- A [Clerk](https://clerk.com) application
- An [OpenRouter](https://openrouter.ai) API key

### 1. Install dependencies
```bash
git clone https://github.com/vdadheech/AntimAI.git
cd AntimAI
npm install
```

### 2. Configure environment variables
Copy `.env.local.example` to `.env.local` and fill in your keys:
```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/onboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/onboard

# NeonDB Database
DATABASE_URL=postgresql://user:password@your-project.neon.tech/antimai?sslmode=require

# OpenRouter
OPENROUTER_API_KEY=sk-or-v1-...
```

### 3. Sync the database schema
```bash
npx drizzle-kit push
```

### 4. Run the dev server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000). Signing up redirects to `/onboard`; existing users land on `/dashboard`.

## Project structure

```
src/
├── app/
│   ├── api/
│   │   ├── cases/                 # create / list cases
│   │   ├── generate-checklist/    # AI checklist generation
│   │   ├── generate-letter/       # AI letter drafting + PDF
│   │   └── tasks/                 # list tasks, update task status
│   ├── dashboard/                  # case list + per-case ledger view
│   ├── onboard/                    # 3-step case creation wizard
│   ├── sign-in/, sign-up/          # Clerk auth pages
│   └── page.tsx                    # marketing landing page
├── components/
│   ├── dashboard/                  # ProgressBar, FilterTabs, TaskCard, etc.
│   ├── onboarding/                 # OnboardingWizard
│   └── shared/                     # Logo, Navbar, UrgencyBadge
├── db/                              # Drizzle schema + Neon client
├── lib/                             # OpenRouter client, prompts, constants, PDF renderer
├── types/                           # shared TypeScript types
└── middleware.ts                    # Clerk route protection
```

## Coverage

The asset picker and state selector in `src/lib/constants.ts` cover:
- **Assets/accounts:** bank accounts (SBI and others), LIC and other insurance, EPF/PF, mutual funds, PPF, property/land, Aadhaar, PAN, electricity, gas, mobile number, and digital accounts (email, Gmail, Facebook, Instagram, Netflix, Disney+ Hotstar, other OTT).
- **Jurisdictions:** all 28 Indian states and 8 union territories.
