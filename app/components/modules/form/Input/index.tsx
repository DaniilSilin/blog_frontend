import React, { ChangeEvent } from "react";
import { Input as BaseInput } from "antd/lib";
const { Password } = BaseInput;
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons/lib";
import Field from "../Field";

import styles from "./input.module.css";

export interface Props {
  width: number;
  height: number;
  onChange: (value: string) => void;
  label?: string;
  error?: string | undefined;
  placeholder?: string;
  defaultValue?: string;
  maxLength?: number;
  value?: string;
  description?: string;
  setInputOnFocus?: any;
  isPassword?: boolean;
}

const Input = React.forwardRef(function Input(
  {
    width,
    height,
    onChange,
    label,
    error,
    placeholder,
    defaultValue,
    maxLength,
    value,
    description,
    setInputOnFocus,
    isPassword,
  }: Props,
  ref,
) {
  const [onFocus, setOnFocus] = React.useState(false);
  const handleChangeInput = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onChange(value);
    },
    [onChange],
  );

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
      >
        {isPassword ? (
          <Password
            onChange={handleChangeInput}
            placeholder={placeholder}
            defaultValue={defaultValue}
            maxLength={maxLength}
            onFocus={handleFocus}
            onBlur={handleBlur}
            // @ts-ignore
            ref={ref}
            className={styles.baseInput}
            style={{
              display: "flex",
              width: `${width}px`,
              height: `${height}px`,
            }}
          />
        ) : (
          <BaseInput
            onChange={handleChangeInput}
            placeholder={placeholder}
            defaultValue={defaultValue}
            maxLength={maxLength}
            onFocus={handleFocus}
            onBlur={handleBlur}
            // @ts-ignore
            ref={ref}
            className={styles.baseInput}
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
          />
        )}
      </Field>
    </div>
  );
});

export default Input;
