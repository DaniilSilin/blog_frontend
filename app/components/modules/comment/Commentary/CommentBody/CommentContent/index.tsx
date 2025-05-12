import React from "react";
import classNames from "classnames";

import { CommentType } from "@/app/types";
import CommentText from "@/app/utils/CustomText";

import styles from "./comment_content.module.css";

export interface Props {
  comment: CommentType;
}

export default function CommentContent({ comment }: Props) {
  const bodyRef = React.useRef(null);

  const [isBodyCollapsed, setIsBodyCollapsed] = React.useState(false);
  const [commentButtonLabel, setCommentButtonLabel] =
    React.useState<string>("Читать дальше");
  const [isNormalMode, setIsNormalMode] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    // @ts-ignore
    if (bodyRef.current.offsetHeight > 190) {
      setIsNormalMode(false);
    } else {
      setIsNormalMode(true);
    }
  }, [bodyRef, setIsNormalMode]);

  const resizeBodyHandleChange = React.useCallback(() => {
    setIsBodyCollapsed(!isBodyCollapsed);
    if (isBodyCollapsed) {
      setCommentButtonLabel("Читать дальше");
    } else {
      setCommentButtonLabel("Свернуть");
    }
  }, [setIsBodyCollapsed, isBodyCollapsed]);

  return (
    <div className={styles.root} ref={bodyRef}>
      {isNormalMode ? (
        <div>{CommentText(comment.body)}</div>
      ) : (
        <>
          <div
            className={classNames(styles.commentBodyCollapsed, {
              [styles.commentBodyFull]: commentButtonLabel === "Свернуть",
            })}
          >
            {comment.body}
          </div>
          <button
            className={styles.bodyButton}
            onClick={resizeBodyHandleChange}
          >
            <span>{commentButtonLabel}</span>
          </button>
        </>
      )}
    </div>
  );
}
