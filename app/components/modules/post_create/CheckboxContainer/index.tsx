import React, { ChangeEvent } from "react";

import styles from "./checkbox_container.module.css";

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
    <div className={styles.root}>
      <label className={styles.inputLabel}>
        <input
          type={"checkbox"}
          className={styles.inputCheckbox}
          onChange={handleChangeCheckbox}
        />
        {title}
      </label>
    </div>
  );
}
