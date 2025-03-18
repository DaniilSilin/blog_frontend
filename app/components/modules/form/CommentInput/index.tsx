import React, { ChangeEvent } from "react";
import { Input } from "antd/lib";
const { TextArea } = Input;

import styles from "./comment_input.module.css";

export interface Props {
  height: number;
  onChange?: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
  setFocusOnInput?: any;
  value?: string;
  isGuest: boolean;
}

const CommentInput = React.forwardRef(function CommentInput(
  {
    height,
    onChange,
    placeholder,
    defaultValue,
    setFocusOnInput,
    value,
    isGuest,
  }: Props,
  ref,
) {
  const inputRef = React.useRef(null);

  const handleChangeInput = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onChange(value);
    },
    [onChange],
  );

  const handleFocus = React.useCallback(() => {
    setFocusOnInput(true);
  }, [setFocusOnInput]);

  const guestInputHandleClick = () => {
    console.log(123);
  };

  React.useEffect(() => {
    console.log(inputRef);
  });

  return (
    <>
      {isGuest ? (
        <div ref={inputRef}>
          <TextArea
            onClick={guestInputHandleClick}
            value={value}
            placeholder={placeholder}
            defaultValue={defaultValue}
            autoSize={true}
            className={styles.disabled}
          />
        </div>
      ) : (
        <div>
          <TextArea
            onChange={handleChangeInput}
            ref={ref}
            value={value}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onFocus={handleFocus}
            autoSize={true}
            style={{ display: "block", height: `${height}px` }}
          />
        </div>
      )}
    </>
  );
});

export default CommentInput;
