import { parseDate } from "@internationalized/date";

import {
  OnboardingFlowStep,
  OnboardingFlowStepKey,
  User,
} from "@/app/lib/definitions";

export const setKeyNameFromStep = (step: OnboardingFlowStep) => {
  return `step_${step}`;
};

export const getStepFromKeyName = (key: OnboardingFlowStepKey) => {
  return parseInt(key.replace("step_", ""));
};

export const getUserFieldValue = (fieldName: keyof User, user: User | null) => {
  if (fieldName === "password" && user) return "************";

  if (!user || !user?.[fieldName]) {
    return undefined;
  }

  if (fieldName === "birthdate") {
    return typeof user.birthdate === "string"
      ? parseDate(user.birthdate.split("T")[0])
      : user.birthdate;
  }

  return user[fieldName];
};
