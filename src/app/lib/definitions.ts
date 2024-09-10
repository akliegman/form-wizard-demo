interface User {
  user_id: number;
  email: string;
  password: string;
  about_me?: string;
  street_address?: string;
  city?: string;
  state?: string;
  zip?: string;
  birthdate?: string;
}

interface Address {
  street_address: string;
  city: string;
  state: string;
  zip: string;
}

type OnboardingComponentType =
  | "email"
  | "password"
  | "long_text"
  | "address"
  | "date";

interface OnboardingComponent {
  component_id: number;
  type: OnboardingComponentType;
  name: string;
  description?: string;
}

interface OnboardingFlow {
  component_id: number;
  step: 1 | 2 | 3;
  can_change_step: boolean;
}

export type { User, OnboardingComponent, OnboardingFlow };
