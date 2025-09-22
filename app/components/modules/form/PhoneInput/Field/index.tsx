import React from "react";
import classNames from "classnames";

export interface Props {
  label?: string | undefined;
  children: React.ReactNode;
  error?: string | undefined;
  value?: string;
  description: string;
}

export default function Field({ label, children, error, description }: Props) {
  return (
    <div style={{ margin: "25px 0" }}>
      <div style={{ marginBottom: "4px", fontSize: "15px", fontWeight: "500" }}>
        {label}
      </div>
      <div style={{ marginBottom: "8px", color: "#aaaaaa", fontSize: "13px" }}>
        {description}
      </div>
      <div>{children}</div>
      <div>{error}</div>
    </div>
  );
}
