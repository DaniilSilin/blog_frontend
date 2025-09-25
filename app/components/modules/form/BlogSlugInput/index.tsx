import React, { ChangeEvent } from "react";
import { Input as BaseInput } from "antd/lib";
import Field from "./Field";

import styles from "./BlogSlugInput.module.css";

export interface Props {
  width: number;
  height: number;
  onChange: (value: string) => void;
  label?: string;
  error?: string | undefined;
  defaultValue?: string;
  maxLength?: number;
  value?: string;
  description?: string;
  setInputOnFocus?: any;
  blog_slug?: any;
}

export default function Input({
  width,
  height,
  onChange,
  label,
  error,
  defaultValue,
  maxLength,
  value,
  description,
  setInputOnFocus,
  blog_slug,
}: Props) {
  const handleChangeInput = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onChange(value);
    },
    [onChange],
  );
  const [onFocus, setOnFocus] = React.useState(false);

  const handleFocus = React.useCallback(() => {
    setOnFocus(true);
    if (setInputOnFocus) {
      setInputOnFocus(true);
    } else return;
  }, [setInputOnFocus]);

  const handleBlur = React.useCallback(() => {
    setOnFocus(false);
  }, []);

  return (
    <div>
      <Field
        label={label}
        onFocus={onFocus}
        error={error}
        // @ts-ignore
        value={value}
        // @ts-ignore
        description={description}
        // @ts-ignore
        blog_slug={blog_slug}
      >
        <BaseInput
          onChange={handleChangeInput}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            display: "block",
            width: `${width}px`,
            height: `${height}px`,
            paddingLeft: `87px`,
          }}
        />
        <span className={styles.addressName}>my-site.ru/</span>
      </Field>
    </div>
  );
}
