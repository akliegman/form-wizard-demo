import { db } from "@vercel/postgres";
import bcrypt from "bcrypt";

import {
  onboardingComponents,
  onboardingFlows,
  users,
} from "@/app/lib/seed-data";

const client = await db.connect();

async function seedUsers() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      about_me TEXT,
      street_address VARCHAR(255),
      city VARCHAR(100),
      state VARCHAR(100),
      zip VARCHAR(20),
      birthdate DATE
    )`);

  const usersToSeed = await Promise.all(
    users.map(async (user) => {
      const {
        password,
        about_me,
        street_address,
        city,
        state,
        zip,
        birthdate,
      } = user;

      const hashedPassword = await bcrypt.hash(password, 10);

      return client.sql`
        INSERT INTO users (email, password, about_me, street_address, city, state, zip, birthdate)
        VALUES (${user.email}, ${hashedPassword}, ${about_me}, ${street_address}, ${city}, ${state}, ${zip}, ${birthdate});
      `;
    }),
  );

  return usersToSeed;
}

async function seedOnboardingComponents() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS admin_onboarding_components (
    component_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(255) NOT NULL
  )`);

  const componentsToSeed = await Promise.all(
    onboardingComponents.map(async (component) => {
      const { name, description, type } = component;

      return client.sql`
        INSERT INTO admin_onboarding_components (name, description, type)
        VALUES (${name}, ${description}, ${type});
      `;
    }),
  );

  return componentsToSeed;
}

async function seedOnboardingFlows() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS admin_onboarding_flows (
    component_id SERIAL PRIMARY KEY,
    step INT NOT NULL,
    can_change_step BOOLEAN NOT NULL
  )`);

  const flowsToSeed = await Promise.all(
    onboardingFlows.map(async (flow) => {
      const { step, can_change_step } = flow;

      return client.sql`
        INSERT INTO admin_onboarding_flows (step, can_change_step)
        VALUES (${step}, ${can_change_step});
      `;
    }),
  );

  return flowsToSeed;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedOnboardingComponents();
    await seedOnboardingFlows();
    await client.sql`COMMIT`;
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error(error);
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
