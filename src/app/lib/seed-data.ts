import {
  User,
  OnboardingComponent,
  OnboardingFlow,
} from "@/app/lib/definitions";

const users: User[] = [
  {
    user_id: 1,
    email: "sample@sample.com",
    password: "1234",
    about_me: "I am a sample user.",
    street_address: "1234 Sample St.",
    city: "Sample City",
    state: "Sample State",
    zip: "12345",
    birthdate: "01/01/2000",
  },
];

const onboardingComponents: OnboardingComponent[] = [
  {
    component_id: 1,
    name: "Email",
    type: "email",
    description: "Enter your email address.",
  },
  {
    component_id: 2,
    name: "Password",
    type: "password",
    description: "Enter your password.",
  },
  {
    component_id: 3,
    name: "About Me",
    type: "long_text",
    description: "Tell us about yourself.",
  },
  {
    component_id: 4,
    name: "Address",
    type: "address",
    description: "Enter your address.",
  },
  {
    component_id: 5,
    name: "Date of Birth",
    type: "date",
    description: "Enter your birth date.",
  },
];

const onboardingFlows: OnboardingFlow[] = [
  {
    component_id: 1,
    step: 1,
    can_change_step: false,
  },
  {
    component_id: 2,
    step: 1,
    can_change_step: false,
  },
  {
    component_id: 3,
    step: 2,
    can_change_step: true,
  },
  {
    component_id: 4,
    step: 3,
    can_change_step: true,
  },
  {
    component_id: 5,
    step: 3,
    can_change_step: true,
  },
];

export { users, onboardingComponents, onboardingFlows };
