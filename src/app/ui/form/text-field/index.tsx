"use client";

import clsx from "clsx";
import {
  Input as ReactAriaInput,
  Label as ReactAriaLabel,
  TextArea as ReactAriaTextArea,
  TextField as ReactAriaTextField,
  TextFieldProps as ReactAriaTextFieldProps,
} from "react-aria-components";

import { OnboardingInputType } from "@/app/lib/definitions";

import styles from "./styles.module.scss";

interface InputProps extends ReactAriaTextFieldProps {
  label: string;
  placeholder?: string;
  type: OnboardingInputType;
}

export const TextField = (props: InputProps) => {
  const { className, label, isRequired, ...rest } = props;

  const labelWithRequiredMark = isRequired ? (
    <>
      {label}
      <span className={styles.requiredMark}>*</span>
    </>
  ) : (
    label
  );

  return (
    <ReactAriaTextField
      className={clsx(styles.textField, className)}
      isRequired={isRequired}
      {...rest}
    >
      <ReactAriaLabel className={styles.label}>
        {labelWithRequiredMark}
      </ReactAriaLabel>
      {props.type === "textarea" ? (
        <ReactAriaTextArea className={clsx(styles.input, styles.textarea)} />
      ) : (
        <ReactAriaInput className={styles.input} />
      )}
    </ReactAriaTextField>
  );
};
