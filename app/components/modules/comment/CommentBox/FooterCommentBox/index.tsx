import React from "react";
import CookieHelper from "@/app/store/cookieHelper";
import classNames from "classnames";

import { CommentType } from "@/app/types";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import EmojiPicker from "emoji-picker-react";

import styles from "./footer_commentbox.module.css";

export interface Props {
  submitButtonText: string;
  cancelComment: () => void;
  leaveComment: () => void;
  setCommentBody: any;
  commentBody: string;
  comment: CommentType;
  editMode: boolean;
}

const FooterCommentBox = React.forwardRef(function FooterCommentBox(
  {
    submitButtonText,
    commentBody,
    cancelComment,
    leaveComment,
    setCommentBody,
    comment,
    editMode,
  }: Props,
  ref,
) {
  const emojiPickerRef = React.useRef(null);
  const [displayEmojiPicker, setDisplayEmojiPicker] = React.useState(false);

  const onEmojiHandleClick = (emoji: any) => {
    // @ts-ignore
    const input = ref.current.resizableTextArea.textArea;
    const cursorPosition = input.selectionStart;
    setCommentBody(
      `${commentBody.slice(0, cursorPosition)}${emoji.emoji}${commentBody.slice(cursorPosition)}`,
    );
    input.focus();
    setTimeout(() => {
      input.setSelectionRange(cursorPosition + 2, cursorPosition + 2);
    }, 0);
  };

  const openEmojiMenuHandleClick = React.useCallback(() => {
    setDisplayEmojiPicker(!displayEmojiPicker);
  }, [setDisplayEmojiPicker, displayEmojiPicker]);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      // @ts-ignore
      if (
        emojiPickerRef.current &&
        // @ts-ignore
        !emojiPickerRef.current.contains(e.target)
      ) {
        setDisplayEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [emojiPickerRef]);

  return (
    <div className={styles.root}>
      <div ref={emojiPickerRef}>
        <div className={styles.emojiIcon}>
          <HiOutlineEmojiHappy onClick={openEmojiMenuHandleClick} size={20} />
        </div>
        {displayEmojiPicker && (
          <EmojiPicker
            className={styles.emojiPicker}
            open={displayEmojiPicker}
            onEmojiClick={onEmojiHandleClick}
            // @ts-ignore
            theme={
              CookieHelper.getCookie("theme")
                ? CookieHelper.getCookie("theme")
                : "light"
            }
          />
        )}
      </div>
      <div className={styles.buttons}>
        <button className={styles.cancelCommentButton} onClick={cancelComment}>
          <span>Отмена</span>
        </button>
        {editMode ? (
          <button
            onClick={leaveComment}
            disabled={commentBody === comment?.body || commentBody === ""}
            className={classNames(styles.leaveCommentButton, {
              [styles.notEmpty]: !(
                commentBody === comment?.body || commentBody === ""
              ),
            })}
          >
            <span>Сохранить</span>
          </button>
        ) : (
          <button
            onClick={leaveComment}
            disabled={!commentBody}
            className={classNames(styles.leaveCommentButton, {
              [styles.notEmpty]: !!commentBody,
            })}
          >
            <span>{submitButtonText}</span>
          </button>
        )}
      </div>
    </div>
  );
});

export default FooterCommentBox;
