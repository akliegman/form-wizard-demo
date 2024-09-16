import { groupAndSortOnboardingFlow } from "@/app/lib/selectors/onboarding-flow";

import { OnboardingComponentWithFlow } from "../definitions";

export const getAllOnboardingComponents = async () => {
  try {
    const response = await fetch("/api/onboarding/get-all");
    let data = await response.json();
    data = groupAndSortOnboardingFlow(data.components.rows);

    return data;
  } catch (error) {
    return { error };
  }
};

export const updateOnboardingStep = async (
  body: OnboardingComponentWithFlow,
) => {
  try {
    const response = await fetch("/api/onboarding/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let data = await response.json();
    data = groupAndSortOnboardingFlow(data.components.rows);

    return data;
  } catch (error) {
    return { error };
  }
};
