import React from "react";

import styles from "./Field.module.css";

export interface Props {
  label?: string | undefined;
  children: React.ReactNode;
  error: string | undefined;
  value?: string;
}

export default function Field({ label, children, error }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.label}>{label}</div>
      {children}
      <div style={{ color: "red" }}>{error}</div>
    </div>
  );
}
