import React, { ChangeEvent } from "react";
import { Input as BaseInput } from "antd/lib";
import Field from "./Field";

export interface Props {
  width: number;
  height: number;
  onChange: (value: string) => void;
  label?: string;
  error?: string | undefined;
  defaultValue?: string;
  maxLength?: number;
  value?: string;
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
}: Props) {
  const [wasFocusedOnce, setWasFocusedOnce] = React.useState(false);
  const [inputIsFocused, setInputIsFocused] = React.useState(false);

  const handleChangeInput = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onChange(value);
    },
    [onChange],
  );

  const handleFocus = React.useCallback(() => {
    setInputIsFocused(true);
  }, [setInputIsFocused]);

  const handleBlur = React.useCallback(() => {
    setInputIsFocused(false);
    setWasFocusedOnce(true);
  }, [setWasFocusedOnce, setInputIsFocused]);

  return (
    <div>
      <Field
        label={label}
        inputIsFocused={inputIsFocused}
        error={error}
        value={value}
        wasFocusedOnce={wasFocusedOnce}
      >
        <BaseInput
          onChange={handleChangeInput}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          style={{
            display: "block",
            width: `${width}px`,
            height: `${height}px`,
          }}
        />
      </Field>
    </div>
  );
}
