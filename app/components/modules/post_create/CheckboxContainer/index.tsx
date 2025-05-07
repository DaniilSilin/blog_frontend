import React, { ChangeEvent } from "react";

export interface Props {
  title: string;
  onChange: (value: boolean) => void;
}

export default function CheckboxContainer({ title, onChange }: Props) {
  const handleChangeCheckbox = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
    },
    [onChange],
  );

  return (
    <div style={{ margin: "10px 0", cursor: "pointer" }}>
      <label style={{ cursor: "pointer" }}>
        <input
          type={"checkbox"}
          style={{ marginRight: "5px", cursor: "pointer" }}
          onChange={handleChangeCheckbox}
        />
        {title}
      </label>
    </div>
  );
}
