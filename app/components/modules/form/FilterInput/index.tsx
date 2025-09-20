import React, { ChangeEvent } from "react";
import { Input as BaseInput } from "antd/lib";

import styles from "./filter_input.module.css";

export interface Props {
  width: number;
  height: number;
  onChange: (value: string) => void;
  placeholder: string;
  defaultValue?: string;
  maxLength?: number;
  value?: string;
}

export default function FilterInput({
  width,
  height,
  onChange,
  defaultValue,
  maxLength,
  placeholder,
  value,
}: Props) {
  const handleChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onChange(value);
    },
    [onChange],
  );

  return (
    <BaseInput
      onChange={handleChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
      maxLength={maxLength}
      value={value}
      className={styles.filterInput}
      width={width}
      height={height}
      style={{
        // width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
}
