import React, { ChangeEvent } from "react";
import { Input } from "antd/lib";

const { TextArea: BaseTextArea } = Input;
import Field from "./Field";

export interface Props {
  width: number;
  height: number;
  onChange: (value: string) => void;
  label?: string;
  error?: string | undefined;
  placeholder?: string;
  defaultValue?: string;
  autoSize: boolean;
  maxLength?: number;
  showCount: boolean;
  value?: string;
}

export default function UpdateTextArea({
  width,
  height,
  onChange,
  label,
  error,
  placeholder,
  defaultValue,
  maxLength,
  showCount,
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
      <Field label={label} error={error}>
        <BaseTextArea
          maxLength={maxLength}
          // @ts-ignore
          onChange={handleChangeInput}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoSize={true}
          showCount={showCount}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={value}
          style={{
            display: "block",
            width: `${width}px`,
            height: `${height}px`,
            minHeight: `${height}px`,
          }}
        />
      </Field>
    </div>
  );
}
