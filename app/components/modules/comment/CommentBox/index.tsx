import React from "react";
import DjangoService from "@/app/store/services/DjangoService";

import CommentInput from "@/app/components/modules/form/CommentInput";
import { CommentType } from "@/app/types";

import styles from "./commentBox.module.css";
import FooterCommentBox from "@/app/components/modules/comment/CommentBox/FooterCommentBox";

export interface Props {
  placeholder: string;
  submitButtonText: string;
  displayReplyInput?: boolean;
  comment?: CommentType;
  slug: string;
  post_id: number;
  setDisplayReplyInput?: (value: boolean) => void;
  setEditMode?: (value: boolean) => void;
  editMode?: boolean;
  isParent?: boolean;
  setLoading?: (value: boolean) => void;
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
  isParent,
  setLoading,
}: Props) {
  const inputRef = React.useRef(null);
  const [commentBody, setCommentBody] = React.useState<string>(
    // @ts-ignore
    editMode ? comment?.body : "",
  );
  const [focusOnInput, setFocusOnInput] = React.useState<boolean>(false);

  const [updateComment] = DjangoService.useUpdateCommentMutation();
  const [createComment] = DjangoService.useCreateCommentMutation();

  const cancelComment = React.useCallback(() => {
    if (editMode) {
      // @ts-ignore
      setEditMode(false);
    }
    setCommentBody("");
    setFocusOnInput(false);
    if (displayReplyInput) {
      // @ts-ignore
      setDisplayReplyInput(false);
    } else return;
  }, [editMode, displayReplyInput]);

  React.useEffect(() => {
    if (editMode) {
      // @ts-ignore
      const input = inputRef.current.resizableTextArea.textArea;
      if (input) {
        input.focus();
        const length = input.textLength;
        input.setSelectionRange(length, length);
      }
    }
  }, [editMode]);

  const leaveComment = React.useCallback(async () => {
    if (editMode) {
      updateComment({
        slug,
        post_id,
        comment_id: comment?.comment_id,
        body: commentBody,
      });
      // @ts-ignore
      setEditMode(false);
    } else {
      if (comment) {
        if (comment?.reply_to) {
          createComment({
            comment_id: comment.comment_id,
            body: commentBody,
            post_id,
            slug,
            reply_to: comment?.reply_to,
          });
        } else {
          createComment({
            comment_id: comment.comment_id,
            body: commentBody,
            post_id,
            slug,
            reply_to: comment?.comment_id,
          });
        }
        // @ts-ignore
        setDisplayReplyInput(false);
      } else {
        // @ts-ignore
        setLoading(true);
        try {
          const result = await createComment({
            body: commentBody,
            post_id,
            slug,
          });
        } catch (error) {
          console.error("Ошибка при отправке комментария:", error);
        } finally {
          // @ts-ignore
          setLoading(false);
        }
      }
    }
  }, [setLoading, commentBody]);

  React.useEffect(() => {
    if (displayReplyInput) {
      if (isParent) {
        setCommentBody(`@${comment?.author.username} `);
      }
      // @ts-ignore
      inputRef?.current.focus();
    }
  }, [displayReplyInput, isParent]);

  return (
    <div className={styles.root}>
      <CommentInput
        ref={inputRef}
        placeholder={placeholder}
        height={50}
        onChange={setCommentBody}
        setFocusOnInput={setFocusOnInput}
        // @ts-ignore
        focusOnInput={focusOnInput}
        value={commentBody}
        defaultValue={comment?.body}
        editMode={editMode}
      />
      {focusOnInput && (
        <FooterCommentBox
          submitButtonText={submitButtonText}
          cancelComment={cancelComment}
          leaveComment={leaveComment}
          setCommentBody={setCommentBody}
          commentBody={commentBody}
          // @ts-ignore
          comment={comment}
          // @ts-ignore
          editMode={editMode}
          ref={inputRef}
        />
      )}
    </div>
  );
}
