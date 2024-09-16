"use client";

import { CalendarDate } from "@internationalized/date";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import {
  Form,
  Key,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabsContext,
} from "react-aria-components";

import { useUser } from "@/app/hooks/user";
import { getAllOnboardingComponents } from "@/app/lib/api/onboarding";
import { createUser, updateUser } from "@/app/lib/api/users";
import {
  OnboardingComponentGroup,
  OnboardingFlowStep,
  OnboardingFlowStepKey,
  User,
} from "@/app/lib/definitions";
import {
  getStepFromKeyName,
  getUserFieldValue,
  setKeyNameFromStep,
} from "@/app/lib/helpers/onboarding-wizard";
import { Button } from "@/app/ui/button";
import { DatePicker } from "@/app/ui/form/date-picker";
import { TextField } from "@/app/ui/form/text-field";
import { Spinner } from "@/app/ui/spinner";

import styles from "./styles.module.scss";

export const OnboardingWizard = () => {
  const [components, setComponents] = useState<OnboardingComponentGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionsDisabled, setActionsDisabled] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { setUser, user } = useUser();

  const handleFormSubmit = async (
    step: OnboardingFlowStep,
    nextStep: OnboardingFlowStep,
  ) => {
    setActionsDisabled(true);

    const form = formRef.current;

    if (!form) {
      return;
    } else {
      const formData = new FormData(form);
      const nextKeyName = setKeyNameFromStep(nextStep);

      if (step === 1) {
        const body = {
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          onboarding_step: nextStep,
        };

        if (user) {
          setSelectedKey(nextKeyName);
          setActionsDisabled(false);
          return;
        }

        await createUser(body).then((data) => {
          setActionsDisabled(false);
          if (data.error) {
            setErrorMessage(data.error);
            return;
          }

          setErrorMessage(null);
          setUser(data?.user);
          setSelectedKey(nextKeyName);
        });

        return;
      } else {
        const body = {
          user_id: user?.user_id,
          onboarding_step: nextStep,
          ...Object.fromEntries(formData),
        };
        await updateUser(body).then((data) => {
          if (data.error) {
            setErrorMessage(data.error);
            return;
          }

          setErrorMessage(null);
          setUser(data?.user);
          setSelectedKey(nextKeyName);
          setActionsDisabled(false);
        });

        return;
      }
    }
  };

  const onSelectionChange = (key: Key) => {
    if (key === selectedKey) {
      return;
    }

    const validity = formRef.current?.reportValidity();
    if (!validity) {
      return;
    }

    handleFormSubmit(
      getStepFromKeyName(selectedKey as OnboardingFlowStepKey),
      getStepFromKeyName(key as OnboardingFlowStepKey),
    );
  };

  useEffect(() => {
    setLoading(true);
    getAllOnboardingComponents().then((data) => {
      if (!data.error) {
        setComponents(data);
      }
      setLoading(false);
      setActionsDisabled(false);
    });
  }, []);

  useEffect(() => {
    if (user) {
      setSelectedKey(setKeyNameFromStep(user.onboarding_step));
    } else {
      setSelectedKey(setKeyNameFromStep(1));
    }
  }, [user]);

  if (loading) {
    return <Spinner />;
  }

  if ((user?.onboarding_step ?? 0) > components.length) {
    return (
      <div className={styles.successMessage}>
        You have completed the onboarding process!
      </div>
    );
  }

  return (
    <TabsContext.Provider value={{ selectedKey, onSelectionChange }}>
      <Tabs aria-label="Onboarding Wizard" className={styles.tabs}>
        <TabList className={styles.tabList}>
          {components?.map((component) => {
            const keyName = setKeyNameFromStep(component.step);
            return (
              <Tab
                className={styles.tab}
                key={keyName}
                id={keyName}
                aria-label={`Step ${component.step}`}
                isDisabled={actionsDisabled || (!user && component.step !== 1)}
              >
                <h3>{component.step}</h3>
              </Tab>
            );
          })}
        </TabList>
        {components?.map((component) => {
          const keyName = setKeyNameFromStep(component.step);
          return (
            <TabPanel key={keyName} id={keyName} className={styles.tabPanel}>
              <Form
                className={styles.form}
                onSubmit={(event) => {
                  event.preventDefault();
                  handleFormSubmit(component.step, component.step + 1);
                }}
                ref={formRef}
              >
                {errorMessage && (
                  <div className={styles.errorMessage}>{errorMessage}</div>
                )}
                <div className={styles.inputs}>
                  {component.components?.map((group) =>
                    group.fields.map((field) =>
                      field.type === "date" ? (
                        <DatePicker
                          key={field.name}
                          className={clsx(styles.textField, styles.birthdate)}
                          label={field.label}
                          isRequired={field.required}
                          name={field.name}
                          shouldForceLeadingZeros={true}
                          isDisabled={actionsDisabled || undefined}
                          defaultValue={
                            getUserFieldValue(field.name, user) as CalendarDate
                          }
                        />
                      ) : (
                        <TextField
                          key={field.name}
                          label={field.label}
                          placeholder={field.placeholder}
                          name={field.name}
                          isRequired={field.required}
                          type={field.type}
                          isDisabled={
                            actionsDisabled ||
                            (user && component.step === 1) ||
                            undefined
                          }
                          defaultValue={
                            getUserFieldValue(field.name, user) as keyof User
                          }
                          className={clsx(styles.textField, {
                            [styles[field.name]]: field.name,
                          })}
                        />
                      ),
                    ),
                  )}
                </div>
                <Button
                  className={styles.button}
                  type="submit"
                  isDisabled={actionsDisabled}
                >
                  {component.step === components.length ? "Finish" : "Next"}
                </Button>
              </Form>
            </TabPanel>
          );
        })}
      </Tabs>
    </TabsContext.Provider>
  );
};
