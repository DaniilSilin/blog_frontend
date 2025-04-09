import React, { ChangeEvent } from "react";

import styles from "./comment_input.module.css";

export interface Props {
  comment: any;
  checked: boolean;
  onChange: any;
}

export default function CommentInput({ comment, checked, onChange }: Props) {
  const handleChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked, comment);
    },
    [onChange, comment],
  );

  return (
    <label className={styles.root}>
      <input
        className={styles.inputCheckbox}
        type={"checkbox"}
        checked={checked}
        onChange={handleChange}
      />
    </label>
  );
}
