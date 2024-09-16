import { createClient } from "@vercel/postgres";
import { NextResponse } from "next/server";

import { sqlSelectOnboardingComponents } from "@/app/lib/sql/onboarding";

export async function GET() {
  const client = createClient();
  await client.connect();

  try {
    const components = await client.query(sqlSelectOnboardingComponents);

    return NextResponse.json({ components }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await client.end();
  }
}
