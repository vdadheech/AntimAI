// ============================================================
// AntimAI — Cases API Route
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { cases } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { deceasedName, deceasedDod, state, assets, heirsName, heirsRelationship, heirsContact } = body;

    // Validate required fields
    if (!deceasedName || !deceasedDod || !state || !assets?.length || !heirsName || !heirsRelationship) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [newCase] = await db
      .insert(cases)
      .values({
        userId,
        deceasedName,
        deceasedDod,
        state,
        assetsJson: assets,
        heirsName,
        heirsRelationship,
        heirsContact: heirsContact || null,
      })
      .returning();

    return NextResponse.json({ caseId: newCase.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating case:", error);
    return NextResponse.json(
      { error: "Failed to create case" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userCases = await db
      .select()
      .from(cases)
      .where(eq(cases.userId, userId));

    return NextResponse.json({ cases: userCases });
  } catch (error) {
    console.error("Error fetching cases:", error);
    return NextResponse.json(
      { error: "Failed to fetch cases" },
      { status: 500 }
    );
  }
}
