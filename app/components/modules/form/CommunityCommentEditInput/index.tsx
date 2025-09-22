import React, { ChangeEvent } from "react";
import { Input } from "antd/lib";
const { TextArea } = Input;

import styles from "./community_comment_edit_input.module.css";

export interface Props {
  onChange?: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
  setFocusOnInput?: any;
  value?: string;
}

const CommunityCommentEditInput = React.forwardRef(
  function CommunityCommentEditInput(
    { onChange, placeholder, defaultValue, setFocusOnInput, value }: Props,
    ref,
  ) {
    const inputRef = React.useRef(null);

    React.useEffect(() => {
      // @ts-ignore
      const input = inputRef.current.resizableTextArea.textArea;
      if (input) {
        input.focus();
        const length = input.textLength;
        input.setSelectionRange(length, length);
      }
    }, []);

    const handleChangeInput = React.useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // @ts-ignore
        onChange(value);
      },
      [onChange],
    );

    // const handleFocus = React.useCallback(() => {
    //   setFocusOnInput(true);
    // }, [setFocusOnInput]);

    return (
      <div className={styles.root}>
        <div className={styles.formInputContainer}>
          <div className={styles.formInputLabel}>
            <span>Комментарий</span>
          </div>
          <TextArea
            // @ts-ignore
            onChange={handleChangeInput}
            // onFocus={handleFocus}
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            defaultValue={defaultValue}
            autoSize={true}
            className={styles.textarea}
          />
        </div>
      </div>
    );
  },
);

export default CommunityCommentEditInput;
