import React from "react";
import classNames from "classnames";

import styles from "./field.module.css";

export interface Props {
  label?: string | undefined;
  children: React.ReactNode;
  error: string | undefined;
  value: string;
  description: string;
  onFocus: boolean;
}

export default function Field({
  label,
  children,
  error,
  value,
  description,
  onFocus,
}: Props) {
  const isInputEmptyOrHasNoError = React.useMemo(() => {
    return !!((!error && !value) || (!error && value));
  }, [error, value]);

  return (
    <div className={styles.root}>
      {label && (
        <div
          className={classNames(styles.label, {
            [styles.active]: onFocus,
          })}
        >
          {label}
        </div>
      )}
      <div className={styles.content}>{children}</div>
      {isInputEmptyOrHasNoError ? (
        <div
          className={classNames(styles.description, {
            [styles.active]: onFocus,
          })}
        >
          {description}
        </div>
      ) : (
        <div
          className={classNames(styles.error, {
            [styles.active]: onFocus,
          })}
        >
          {error}
        </div>
      )}
    </div>
  );
}
