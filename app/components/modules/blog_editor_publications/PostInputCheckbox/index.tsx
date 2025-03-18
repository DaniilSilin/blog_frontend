import React, { ChangeEvent } from "react";

export interface Props {
  onChange: any;
  checked: boolean;
  post: any;
}

export default function PostInputCheckbox({ onChange, checked, post }: Props) {
  const handleChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked, post);
    },
    [onChange, post],
  );

  return (
    <label>
      <input type={"checkbox"} onChange={handleChange} checked={checked} />
    </label>
  );
}
