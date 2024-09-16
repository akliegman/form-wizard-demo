import { createClient } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

import {
  sqlSelectOnboardingComponentByComponentId,
  sqlSelectOnboardingComponents,
  sqlUpdateOnboardingComponentStep,
} from "@/app/lib/sql/onboarding";

export async function POST(request: NextRequest) {
  const client = createClient();
  await client.connect();

  try {
    const { component_id, step } = await request.json();

    if (!component_id) {
      return NextResponse.json(
        { error: "Component ID is required" },
        { status: 400 },
      );
    }

    const existingComponent = await client.query(
      sqlSelectOnboardingComponentByComponentId(component_id),
    );

    if (existingComponent.rows.length === 0) {
      return NextResponse.json(
        { error: "Component does not exist" },
        { status: 400 },
      );
    }

    if (!step) {
      return NextResponse.json({ error: "Step is required" }, { status: 400 });
    }

    if (typeof step !== "number" || step < 1 || step > 3) {
      return NextResponse.json(
        { error: "Step must be a number greater than 0 and less than 4" },
        { status: 400 },
      );
    }

    await client.query(sqlUpdateOnboardingComponentStep(component_id, step));

    const components = await client.query(sqlSelectOnboardingComponents);

    return NextResponse.json({ components }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await client.end();
  }
}
