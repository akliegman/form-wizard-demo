"use client";

import { useEffect, useState } from "react";

import {
  getAllOnboardingComponents,
  updateOnboardingStep,
} from "@/app/lib/api/onboarding";
import {
  OnboardingComponentGroup,
  OnboardingComponentWithFlow,
  OnboardingFlowStep,
} from "@/app/lib/definitions";
import { Button } from "@/app/ui/button";
import { Spinner } from "@/app/ui/spinner";

import styles from "./styles.module.scss";

export const OnboardingFlow = () => {
  const [components, setComponents] = useState<OnboardingComponentGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionsDisabled, setActionsDisabled] = useState<boolean>(false);

  const stepToUpdateTo = (step: OnboardingFlowStep) => {
    const newStep = step === 3 ? 2 : step === 2 ? 3 : 1;
    return newStep as OnboardingFlowStep;
  };

  const updateStep = async (component: OnboardingComponentWithFlow) => {
    const { step } = component;
    setActionsDisabled(true);

    const body = {
      ...component,
      step: stepToUpdateTo(step),
    };

    await updateOnboardingStep(body).then((data) => {
      if (!data.error) {
        setComponents(data);
      }
      setLoading(false);
      setActionsDisabled(false);
    });

    return;
  };

  useEffect(() => {
    getAllOnboardingComponents().then((data) => {
      if (!data.error) {
        setComponents(data);
      }
      setLoading(false);
      setActionsDisabled(false);
    });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!loading && !components.length) {
    return <p>No components found.</p>;
  }

  return (
    <div className={styles.container}>
      {components?.map((step) => (
        <div key={step.step} className={styles.stepContainer}>
          <h2 className={styles.listTitle}>Step {step.step}</h2>
          <ul className={styles.componentsList}>
            {step.components.map((component) => (
              <li
                key={component.component_id}
                className={styles.componentListItem}
              >
                <div className={styles.componentContent}>
                  <h3 className={styles.componentTitle}>{component.name}</h3>
                  <div className={styles.componentFields}>
                    {component?.fields?.map((field) => (
                      <span key={field.name} className={styles.componentField}>
                        {field.label}
                      </span>
                    ))}
                  </div>
                </div>
                {component.can_change_step && (
                  <Button
                    isDisabled={actionsDisabled || step.components.length <= 1}
                    onPress={() => updateStep(component)}
                    className={styles.moveButton}
                  >
                    Move to Step {stepToUpdateTo(component.step)}
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
