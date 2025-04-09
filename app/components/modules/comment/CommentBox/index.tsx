import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import classNames from "classnames";
import EmojiPicker from "emoji-picker-react";

import CommentInput from "@/app/components/modules/form/CommentInput";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { Comment } from "@/app/types";

import styles from "./commentBox.module.css";

export interface Props {
  placeholder: string;
  submitButtonText: string;
  displayReplyInput?: boolean;
  comment?: Comment;
  slug: string;
  post_id: number;
  setDisplayReplyInput?: (value: boolean) => void;
  setEditMode?: (value: boolean) => void;
  editMode?: boolean;
  isReplyToParentComment?: boolean;
  setLoading: (value: boolean) => void;
}

export default function CommentBox({
  placeholder,
  submitButtonText,
  editMode,
  setEditMode,
  displayReplyInput,
  setDisplayReplyInput,
  comment,
  slug,
  post_id,
  isReplyToParentComment,
  setLoading,
}: Props) {
  const inputRef = React.useRef(null);
  const emojiPickerRef = React.useRef(null);
  const [commentBody, setCommentBody] = React.useState<string>(
    editMode ? comment?.body : "",
  );
  const [focusOnInput, setFocusOnInput] = React.useState<boolean>(false);
  const [displayEmojiPicker, setDisplayEmojiPicker] = React.useState(false);

  const [updateComment] = DjangoService.useUpdateCommentMutation();
  const [createComment] = DjangoService.useCreateCommentMutation();

  const cancelComment = React.useCallback(() => {
    if (editMode) {
      setEditMode(false);
    }
    setCommentBody("");
    setFocusOnInput(false);
    if (displayReplyInput) {
      setDisplayReplyInput(false);
    } else return;
  }, [
    editMode,
    setEditMode,
    displayReplyInput,
    setDisplayReplyInput,
    setFocusOnInput,
    setCommentBody,
  ]);

  React.useEffect(() => {
    if (editMode) {
      // @ts-ignore
      inputRef?.current.focus();
    }
  }, [editMode]);

  const leaveComment = async () => {
    if (editMode) {
      updateComment({
        slug: slug,
        post_id: post_id,
        comment_id: comment?.comment_id,
        body: commentBody,
      });
      setEditMode(false);
    } else {
      if (comment) {
        if (comment?.reply_to) {
          createComment({
            comment_id: comment.comment_id,
            body: commentBody,
            post_id: post_id,
            slug: slug,
            reply_to: comment?.reply_to,
          });
          setDisplayReplyInput(false);
        } else {
          createComment({
            comment_id: comment.comment_id,
            body: commentBody,
            post_id: post_id,
            slug: slug,
            reply_to: comment?.comment_id,
          });
          setDisplayReplyInput(false);
        }
      } else {
        const result = await createComment({
          body: commentBody,
          post_id: post_id,
          slug: slug,
        });
        setLoading(true);
        setFocusOnInput(false);
        setCommentBody("");
        try {
          if (result && result.data && result.data.status) {
            setLoading(false);
          } else {
            console.warn(
              "Статус не определён или ответ не соответствует ожиданиям",
            );
            setLoading(false);
          }
        } catch (error) {
          console.error("Ошибка при создании комментария:", error);
          setLoading(false);
        }
        // console.log(result.data.status);
        // if (!!result.data.status) {
        //   setLoading(false);
        // }
      }
    }
  };

  const onEmojiHandleClick = (emoji: any) => {
    // @ts-ignore
    const input = inputRef.current.resizableTextArea.textArea;
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
    if (displayReplyInput) {
      if (!isReplyToParentComment) {
        setCommentBody(`@${comment?.author.username} `);
      }
      // @ts-ignore
      inputRef?.current.focus();
    }
  }, [displayReplyInput]);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      // @ts-ignore
      if (
        emojiPickerRef.current &&
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
      <CommentInput
        ref={inputRef}
        placeholder={placeholder}
        height={50}
        onChange={setCommentBody}
        setFocusOnInput={setFocusOnInput}
        focusOnInput={focusOnInput}
        value={commentBody}
        defaultValue={comment?.body}
        editMode={editMode}
      />
      {focusOnInput && (
        <div className={styles.commentFooter}>
          <div ref={emojiPickerRef}>
            <div className={styles.emojiIcon}>
              <HiOutlineEmojiHappy
                onClick={openEmojiMenuHandleClick}
                size={20}
              />
            </div>
            {displayEmojiPicker && (
              <EmojiPicker
                className={styles.emojiPicker}
                open={displayEmojiPicker}
                onEmojiClick={onEmojiHandleClick}
              />
            )}
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.cancelCommentButton}
              onClick={cancelComment}
            >
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
      )}
    </div>
  );
}
