import { db } from "@vercel/postgres";
import bcrypt from "bcrypt";

import {
  onboardingComponents,
  onboardingFlows,
  users,
} from "@/app/lib/seed-data";

const client = await db.connect();

async function seedUsers() {
  await client.query(`DROP TABLE IF EXISTS users`);
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255),
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      about_me TEXT,
      street_address VARCHAR(255),
      city VARCHAR(100),
      state VARCHAR(100),
      zip VARCHAR(20),
      birthdate DATE,
      onboarding_step INT DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

  const usersToSeed = await Promise.all(
    users.map(async (user) => {
      const {
        user_id,
        email,
        password,
        about_me,
        street_address,
        city,
        state,
        zip,
        birthdate,
        onboarding_step,
      } = user;

      const hashedPassword = await bcrypt.hash(password, 10);

      return client.sql`
        INSERT INTO users (user_id, email, password, about_me, street_address, city, state, zip, birthdate, onboarding_step)
        VALUES (${user_id}, ${email}, ${hashedPassword}, ${about_me}, ${street_address}, ${city}, ${state}, ${zip}, ${birthdate}, ${onboarding_step});
      `;
    }),
  );

  return usersToSeed;
}

async function seedOnboardingComponents() {
  await client.query(`DROP TABLE IF EXISTS admin_onboarding_components`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS admin_onboarding_components (
    id SERIAL PRIMARY KEY,
    component_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  const componentsToSeed = await Promise.all(
    onboardingComponents.map(async (component) => {
      const { component_id, name, type } = component;

      return client.sql`
        INSERT INTO admin_onboarding_components (component_id, name,  type)
        VALUES (${component_id}, ${name}, ${type});
      `;
    }),
  );

  return componentsToSeed;
}

async function seedFields() {
  await client.query(`DROP TABLE IF EXISTS admin_onboarding_fields`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS admin_onboarding_fields (
    id SERIAL PRIMARY KEY,
    component_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    placeholder VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    required BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  const fieldsToSeed = await Promise.all(
    onboardingComponents.map(async (component) => {
      const { component_id, fields } = component;

      return Promise.all(
        fields.map(async (field) => {
          const { name, placeholder, label, type, required } = field;

          return client.sql`
            INSERT INTO admin_onboarding_fields (component_id, name, placeholder, label, type, required)
            VALUES (${component_id}, ${name}, ${placeholder}, ${label}, ${type}, ${required});
          `;
        }),
      );
    }),
  );

  return fieldsToSeed;
}

async function seedOnboardingFlows() {
  await client.query(`DROP TABLE IF EXISTS admin_onboarding_flows`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS admin_onboarding_flows (
    id SERIAL PRIMARY KEY,
    component_id VARCHAR(255) NOT NULL,
    step INT NOT NULL,
    can_change_step BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  const flowsToSeed = await Promise.all(
    onboardingFlows.map(async (flow) => {
      const { component_id, step, can_change_step } = flow;

      return client.sql`
        INSERT INTO admin_onboarding_flows (component_id, step, can_change_step)
        VALUES (${component_id}, ${step}, ${can_change_step});
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
    await seedFields();
    await seedOnboardingFlows();
    await client.sql`COMMIT`;
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
