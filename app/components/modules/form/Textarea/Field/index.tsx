import React from "react";
import classNames from "classnames";

import styles from "./Field.module.css";

export interface Props {
  label?: string | undefined;
  children: React.ReactNode;
  error: string | undefined;
  value: string;
  inputIsFocused: boolean;
}

export default function Field({ label, children, inputIsFocused }: Props) {
  return (
    <div className={styles.root}>
      <div
        className={classNames(styles.label, {
          [styles.active]: inputIsFocused,
          [styles.non_active]: !inputIsFocused,
        })}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
