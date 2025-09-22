import React, { ChangeEvent } from "react";

export interface Props {
  defaultChecked: any;
  value: any;
  description: any;
  onChange: any;
}

export default function PostInputComponent({
  defaultChecked,
  value,
  description,
  onChange,
}: Props) {
  const inputHandleChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        onChange(true);
      } else {
        onChange(false);
      }
    },
    [onChange],
  );

  return (
    <label>
      <div style={{ display: "flex", cursor: "pointer", margin: "10px 0" }}>
        <input
          style={{ marginRight: "10px" }}
          type={"checkbox"}
          defaultChecked={defaultChecked}
          checked={value}
          onChange={inputHandleChange}
        />
        <div>{description}</div>
      </div>
    </label>
  );
}
