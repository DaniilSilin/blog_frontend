import React, { ChangeEvent } from "react";
import classNames from "classnames";

import styles from "./comment_input.module.css";

export interface Props {
  comment: any;
  checked: boolean;
  onChange: any;
  isParent: boolean;
}

export default function CommentInput({
  comment,
  checked,
  onChange,
  isParent,
}: Props) {
  const handleChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked, comment);
    },
    [onChange, comment],
  );

  return (
    <label
      className={classNames(styles.rootIsNotParent, {
        [styles.rootIsParent]: isParent,
      })}
    >
      <input
        className={styles.inputCheckbox}
        type={"checkbox"}
        checked={checked}
        onChange={handleChange}
      />
    </label>
  );
}
