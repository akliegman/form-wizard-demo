import {
  OnboardingComponent,
  OnboardingFlow,
  User,
} from "@/app/lib/definitions";

const users: User[] = [
  {
    id: 1,
    user_id: "31f0623f-43e3-4899-86b8-2dbebef33140",
    email: "sample@sample.com",
    password: "1234",
    about_me:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur eget diam et molestie.\n\nIn efficitur imperdiet risus. Curabitur id odio purus.",
    street_address: "1234 Sample St.",
    city: "Sample City",
    state: "Sample State",
    zip: "12345",
    birthdate: "01/01/2000",
    onboarding_step: 3,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
];

const onboardingComponents: OnboardingComponent[] = [
  {
    id: 1,
    component_id: "392ec391-bdf3-401b-8b4f-df10bc7fe98e",
    name: "Email",
    type: "email",
    fields: [
      {
        name: "email",
        placeholder: "Enter your email address",
        label: "Email",
        type: "email",
        required: true,
      },
    ],
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    component_id: "98ecc391-bdf3-401b-8b4f-df10bc7fe98e",
    name: "Password",
    type: "password",
    fields: [
      {
        name: "password",
        placeholder: "Create your password",
        label: "Password",
        type: "password",
        required: true,
      },
    ],
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 3,
    component_id: "093a9c11-d2ab-4eb1-b514-41b8ccc1848b",
    name: "About Me",
    type: "textarea",
    fields: [
      {
        name: "about_me",
        placeholder: "Enter a little about yourself",
        label: "About Me",
        type: "textarea",
        required: true,
      },
    ],
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 4,
    component_id: "d2200c55-9dee-4826-96f6-9778cf63c7a5",
    name: "Address",
    type: "address",
    fields: [
      {
        name: "street_address",
        placeholder: "Enter your street address",
        label: "Street Address",
        type: "text",
        required: true,
      },
      {
        name: "city",
        placeholder: "Enter your city",
        label: "City",
        type: "text",
        required: true,
      },
      {
        name: "state",
        placeholder: "Enter your state",
        label: "State",
        type: "text",
        required: true,
      },
      {
        name: "zip",
        placeholder: "Enter your zip code",
        label: "Zip",
        type: "text",
        required: true,
      },
    ],
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 5,
    component_id: "057820d9-5350-49e4-ab6f-468ce061e5a1",
    name: "Birthdate",
    type: "date",
    fields: [
      {
        name: "birthdate",
        placeholder: "Enter your birth date",
        label: "Birthdate",
        type: "date",
        required: true,
      },
    ],
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
];

const onboardingFlows: OnboardingFlow[] = [
  {
    id: 1,
    component_id: "392ec391-bdf3-401b-8b4f-df10bc7fe98e",
    step: 1,
    can_change_step: false,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    component_id: "98ecc391-bdf3-401b-8b4f-df10bc7fe98e",
    step: 1,
    can_change_step: false,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 3,
    component_id: "093a9c11-d2ab-4eb1-b514-41b8ccc1848b",
    step: 2,
    can_change_step: true,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 4,
    component_id: "d2200c55-9dee-4826-96f6-9778cf63c7a5",
    step: 3,
    can_change_step: true,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 5,
    component_id: "057820d9-5350-49e4-ab6f-468ce061e5a1",
    step: 3,
    can_change_step: true,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
];

export { users, onboardingComponents, onboardingFlows };
