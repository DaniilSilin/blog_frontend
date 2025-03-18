import React, { ChangeEvent } from "react";
import { Input } from "antd/lib";

const { TextArea: BaseTextArea } = Input;
import Field from "./Field";

import styles from "./map.module.css";

export interface Props {
  width: number;
  height: number;
  onChange: (value: string) => void;
  label?: string;
  error?: string | undefined;
  defaultValue: string;
  maxLength?: number;
  value: string;
}

export default function TextArea({
  width,
  height,
  onChange,
  value,
  label,
  error,
  defaultValue,
  maxLength,
}: Props) {
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
  }, [setInputIsFocused]);

  return (
    <div>
      <Field error={error} value={value} inputIsFocused={inputIsFocused}>
        <BaseTextArea
          className={styles.elem}
          type={"url"}
          maxLength={maxLength}
          onFocus={handleFocus}
          handleBlur={handleBlur}
          onChange={handleChangeInput}
          defaultValue={defaultValue}
          autoSize={true}
          showCount={false}
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
