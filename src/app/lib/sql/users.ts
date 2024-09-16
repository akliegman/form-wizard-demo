import { User } from "../definitions";

export const sqlCreateUser = (
  userId: string,
  email: string,
  password: string,
  onboardingStep: number,
) => `
  INSERT INTO users (
    user_id,
    email,
    password,
    onboarding_step,
    created_at,
    updated_at
)
  VALUES (
    '${userId}',
    '${email}',
    '${password}',
    ${onboardingStep},
    NOW(),
    NOW()
  )
  RETURNING *;   
`;

export const sqlSelectUsers = `
  SELECT
    id,
    user_id,
    email,
    about_me,
    birthdate,
    city,
    street_address,
    state,
    zip,
    onboarding_step,
    created_at,
    updated_at
  FROM users
  ORDER BY id ASC;
`;

export const sqlSelectUserByUserId = (userId: string) => `
  SELECT 
    id,
    user_id,
    email,
    about_me,
    birthdate,
    city,
    street_address,
    state,
    zip,
    onboarding_step,
    created_at,
    updated_at
  FROM users 
  WHERE user_id = '${userId}';
`;

export const sqlUpdateUser = (user: Partial<User>) => {
  const { user_id, ...fields } = user;

  const validFields = Object.entries(fields).filter(
    ([_, value]) => value !== null,
  );

  if (validFields.length === 0) throw new Error("No fields to update");

  const setClauses = validFields.map(
    ([key], index) => `${key} = $${index + 1}`,
  );

  const values = validFields.map(([_, value]) => value);

  if (user_id !== undefined) {
    values.push(user_id);
  } else {
    throw new Error("user_id is undefined");
  }

  return {
    text: `
      UPDATE users
      SET ${setClauses.join(", ")}, updated_at = NOW()
      WHERE user_id = $${values.length}
      RETURNING *;
    `,
    values,
  };
};
