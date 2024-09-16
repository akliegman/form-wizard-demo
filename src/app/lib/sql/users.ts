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

export const sqlUpdateUser = (user: User) => {
  const {
    user_id,
    about_me,
    birthdate,
    city,
    street_address,
    state,
    zip,
    onboarding_step,
  } = user;

  return `
    UPDATE users
    SET 
      about_me = '${about_me}',
      ${birthdate && `birthdate = '${birthdate}',`}
      city = '${city}',
      street_address = '${street_address}',
      state = '${state}',
      zip = '${zip}',
      onboarding_step = ${onboarding_step},
      updated_at = NOW()
    WHERE user_id = '${user_id}'
    RETURNING *;
  `;
};
