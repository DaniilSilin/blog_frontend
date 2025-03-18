import React, { ChangeEvent } from "react";
import { Input as BaseInput } from "antd/lib";

export interface Props {
  width: number;
  height: number;
  onChange: (value: string) => void;
  placeholder: string;
  defaultValue?: string;
  maxLength?: number;
  value?: string;
}

export default function BlogPageInput({
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
    <div>
      <BaseInput
        onChange={handleChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
        maxLength={maxLength}
        value={value}
        style={{ display: "block", width: `${width}px`, height: `${height}px` }}
      />
    </div>
  );
}
