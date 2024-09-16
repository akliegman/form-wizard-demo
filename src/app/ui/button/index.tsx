import clsx from "clsx";
import {
  Button as ReactAriaButton,
  ButtonProps as ReactAriaButtonProps,
} from "react-aria-components";

import styles from "./styles.module.scss";

interface ButtonProps extends ReactAriaButtonProps {
  children: React.ReactNode;
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <ReactAriaButton className={clsx(styles.button, className)} {...props}>
      {children}
    </ReactAriaButton>
  );
};
