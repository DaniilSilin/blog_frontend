import React, { ChangeEvent } from "react";
import { PostType } from "@/app/types";

import styles from "./post_input_checkbox.module.css";

export interface Props {
  onChange: (checked: boolean, post: PostType) => void;
  checked: boolean;
  post: PostType;
}

export default function PostInputCheckbox({ onChange, checked, post }: Props) {
  const handleChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked, post);
    },
    [onChange, post],
  );

  return (
    <label className={styles.root}>
      <input
        type={"checkbox"}
        onChange={handleChange}
        checked={checked}
        style={{ cursor: "pointer" }}
      />
    </label>
  );
}
