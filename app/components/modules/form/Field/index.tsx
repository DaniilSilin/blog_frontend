import React from "react";
import { CiWarning } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import classNames from "classnames";
import styles from "./field.module.css";

export interface Props {
  label?: string | undefined;
  children: React.ReactNode;
  error: string | undefined;
  value: string;
  description: string;
  onFocus: boolean;
  blog_slug: string;
}

export default function Field({
  label,
  children,
  error,
  value,
  description,
  onFocus,
  blog_slug,
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
            [styles.non_active]: !onFocus,
          })}
        >
          {label}
        </div>
      )}
      <div style={{ display: "flex" }}>{children}</div>
      <>
        {isInputEmptyOrHasNoError ? (
          <div
            className={classNames(styles.description, {
              [styles.active]: onFocus,
              [styles.non_active]: !onFocus,
            })}
          >
            {blog_slug ? blog_slug : description}
          </div>
        ) : (
          <div
            className={classNames(styles.error, {
              [styles.active]: onFocus,
              [styles.non_active]: !onFocus,
            })}
          >
            {error}
          </div>
        )}
      </>
    </div>
  );
}
