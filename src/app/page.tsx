import { UserProvider } from "./context/user";
import { OnboardingWizard } from "./ui/onboarding-wizard";
import { PageContainer } from "./ui/page-container";

import styles from "./page.module.scss";

export default function HomePage() {
  return (
    <UserProvider>
      <PageContainer>
        <h1 className={styles.title}>Onboarding Form</h1>
        <p className={styles.description}>
          This is a sample onboarding wizard for new users.
        </p>
        <OnboardingWizard />
      </PageContainer>
    </UserProvider>
  );
}
