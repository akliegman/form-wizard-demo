import { createClient } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

import { User } from "@/app/lib/definitions";
import { sqlSelectUserByUserId, sqlUpdateUser } from "@/app/lib/sql/users";

export async function POST(request: NextRequest) {
  const client = createClient();
  await client.connect();

  const {
    user_id,
    about_me,
    birthdate,
    onboarding_step,
    street_address,
    city,
    state,
    zip,
  } = await request.json();

  const existingUser = await client.query(sqlSelectUserByUserId(user_id));
  const existingUserData = existingUser.rows[0];

  if (!existingUserData) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const birthdateDate = birthdate
    ? new Date(birthdate).toISOString()
    : existingUserData.birthdate
      ? new Date(existingUserData.birthdate).toISOString()
      : null;

  console.log(
    "existing birthdate",
    existingUserData.birthdate,
    new Date(existingUserData.birthdate).toISOString(),
  );

  const user = {
    user_id,
    about_me: about_me || existingUserData.about_me || "",
    birthdate: birthdateDate || existingUserData.birthdate || null,
    onboarding_step: onboarding_step || existingUserData.onboarding_step,
    street_address: street_address || existingUserData.street_address || "",
    city: city || existingUserData.city || "",
    state: state || existingUserData.state || "",
    zip: zip || existingUserData.zip || "",
  };

  const updatedUser = await client.query(sqlUpdateUser(user as User));

  return NextResponse.json({ user: updatedUser.rows[0] }, { status: 200 });
}
