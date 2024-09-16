import { today } from "@internationalized/date";
import { CalendarDate } from "@internationalized/date";
import clsx from "clsx";
import {
  DateValue,
  Button as ReactAriaButton,
  Calendar as ReactAriaCalendar,
  CalendarCell as ReactAriaCalendarCell,
  CalendarGrid as ReactAriaCalendarGrid,
  DateInput as ReactAriaDateInput,
  DatePicker as ReactAriaDatePicker,
  DatePickerProps as ReactAriaDatePickerProps,
  DateSegment as ReactAriaDateSegment,
  Dialog as ReactAriaDialog,
  Group as ReactAriaGroup,
  Heading as ReactAriaHeading,
  Label as ReactAriaLabel,
  Popover as ReactAriaPopover,
} from "react-aria-components";

import { CalendarIcon } from "@/app/ui/icons/calendar";

import styles from "./styles.module.scss";

interface DatePickerProps<T extends DateValue = CalendarDate>
  extends ReactAriaDatePickerProps<T> {
  label: string;
}

export const DatePicker = (props: DatePickerProps) => {
  const { className, label, isRequired, ...rest } = props;

  const labelWithRequiredMark = isRequired ? (
    <>
      {label}
      <span className={styles.requiredMark}>*</span>
    </>
  ) : (
    label
  );

  const getLocalTimeZone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  return (
    <ReactAriaDatePicker
      className={clsx(styles.datePicker, className)}
      maxValue={today(getLocalTimeZone())}
      isRequired={isRequired}
      {...rest}
    >
      <ReactAriaLabel className={styles.label}>
        {labelWithRequiredMark}
      </ReactAriaLabel>
      <ReactAriaGroup className={styles.inputGroup}>
        <ReactAriaDateInput className={styles.input}>
          {(segment) => (
            <ReactAriaDateSegment
              segment={segment}
              className={styles.inputSegment}
            />
          )}
        </ReactAriaDateInput>
        <ReactAriaButton className={styles.button}>
          <CalendarIcon />
        </ReactAriaButton>
      </ReactAriaGroup>
      <ReactAriaPopover placement="bottom right">
        <ReactAriaDialog className={styles.dialog}>
          <ReactAriaCalendar>
            <div className={styles.dialogHeader}>
              <ReactAriaButton slot="previous" className={styles.dialogButton}>
                ◀
              </ReactAriaButton>
              <ReactAriaHeading className={styles.dialogHeading} />
              <ReactAriaButton slot="next" className={styles.dialogButton}>
                ▶
              </ReactAriaButton>
            </div>
            <ReactAriaCalendarGrid className={styles.calendarGrid}>
              {(date) => (
                <ReactAriaCalendarCell
                  className={styles.calendarButton}
                  date={date}
                />
              )}
            </ReactAriaCalendarGrid>
          </ReactAriaCalendar>
        </ReactAriaDialog>
      </ReactAriaPopover>
    </ReactAriaDatePicker>
  );
};
