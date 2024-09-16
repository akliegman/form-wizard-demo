export interface Address {
  street_address: string;
  city: string;
  state: string;
  zip: string;
}

export interface User extends Address {
  id: number;
  user_id: string;
  email: string;
  password: string;
  about_me?: string;
  birthdate?: string;
  onboarding_step: OnboardingFlowStep;
  created_at: string;
  updated_at: string;
}

export type OnboardingComponentType =
  | "email"
  | "password"
  | "textarea"
  | "address"
  | "date";

export type OnboardingInputType = HTMLInputElement["type"] | "textarea";

export interface OnboardingField {
  name: keyof User;
  placeholder: string;
  label: string;
  type: OnboardingInputType;
  required: boolean;
}

export interface OnboardingComponent {
  id: number;
  component_id: string;
  type: OnboardingComponentType;
  name: string;
  fields: OnboardingField[];
  created_at: string;
  updated_at: string;
}

export type OnboardingFlowStep = number;

export type OnboardingFlowStepKey = `step_${OnboardingFlowStep}`;

export interface OnboardingFlow {
  id: number;
  component_id: string;
  step: OnboardingFlowStep;
  can_change_step: boolean;
  created_at: string;
  updated_at: string;
}

export interface OnboardingComponentWithFlow extends OnboardingComponent {
  step: OnboardingFlowStep;
  can_change_step: boolean;
  flow_updated_at: string;
}

export interface OnboardingComponentGroup {
  step: number;
  components: OnboardingComponentWithFlow[];
}
