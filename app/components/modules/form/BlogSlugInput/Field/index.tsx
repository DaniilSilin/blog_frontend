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
  blog_slug: any;
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
  const descriptionState = React.useMemo(() => {
    if (!value) {
      return "emptyValue";
    } else if (error && value) {
      return "hasError";
    } else if (!error && value) {
      return "blogSlug";
    }
  }, [value, error]);

  return (
    <div style={{ margin: "10px 0" }}>
      <div
        className={classNames(styles.label, {
          [styles.active]: onFocus,
          [styles.non_active]: !onFocus,
        })}
      >
        {label}
      </div>
      {children}
      <>
        {descriptionState === "emptyValue" && (
          <div
            className={classNames(styles.description, {
              [styles.active]: onFocus,
              [styles.non_active]: !onFocus,
            })}
          >
            {description}
          </div>
        )}
        {descriptionState === "hasError" && (
          <div
            className={classNames(styles.error, {
              [styles.active]: onFocus,
              [styles.non_active]: !onFocus,
            })}
          >
            {error}
          </div>
        )}
        {descriptionState === "blogSlug" && (
          <>
            {blog_slug?.available === true ? (
              <div
                className={classNames(styles.available, {
                  [styles.active]: onFocus,
                  [styles.non_active]: !onFocus,
                })}
              >
                Адрес свободен
              </div>
            ) : (
              <div
                className={classNames(styles.not_available, {
                  [styles.active]: onFocus,
                  [styles.non_active]: !onFocus,
                })}
              >
                Адрес занят
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
}
