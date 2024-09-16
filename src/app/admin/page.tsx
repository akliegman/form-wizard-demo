import { Metadata } from "next";

import { OnboardingFlow } from "@/app/ui/admin/onboarding-flow";
import { PageContainer } from "@/app/ui/page-container";

import styles from "./styles.module.scss";

export const metadata: Metadata = {
  title: "Admin Page",
  description: "View to update the form wizard.",
};

export default function AdminPage() {
  return (
    <PageContainer>
      <h1>Onboarding Flow</h1>
      <p className={styles.description}>
        Update the onboarding flow for new users.
      </p>
      <OnboardingFlow />
    </PageContainer>
  );
}
