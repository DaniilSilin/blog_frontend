import React, { ChangeEvent } from "react";
import { Input as BaseInput } from "antd/lib";
import Field from "./Field";

export interface Props {
  width: number;
  height: number;
  onChange?: (value: string) => void;
  label?: string;
  error?: string | undefined;
  defaultValue?: string;
  maxLength?: number;
  value?: string;
  description?: string;
  disabled?: boolean;
}

export default function UpdateInput({
  width,
  height,
  onChange,
  label,
  error,
  defaultValue,
  maxLength,
  value,
  description,
  disabled,
}: Props) {
  const [wasFocusedOnce, setWasFocusedOnce] = React.useState(false);
  const [inputIsFocused, setInputIsFocused] = React.useState(false);

  const handleChangeInput = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // @ts-ignore
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
        // @ts-ignore
        value={value}
        // @ts-ignore
        description={description}
      >
        <BaseInput
          onChange={handleChangeInput}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          disabled={disabled}
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
