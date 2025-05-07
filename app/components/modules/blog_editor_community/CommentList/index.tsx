import React from "react";
import { useAppSelector } from "@/app/store";
import Link from "next/link";
import Image from "next/image";
import moment from "moment/moment";
import "moment/locale/ru";
import classNames from "classnames";

import { CommentType } from "@/app/types";
import CommentReply from "./CommentReply";
import CommentInput from "./CommentInput";
import BlogCommentList from "@/app/components/modules/blog_editor_community/BlogCommentList";
import CommentActionButtons from "./CommentActionButtons";
import BlogCommentAvatar from "./BlogCommentAvatar";

import styles from "./comment_list.module.css";
import CommentEditMode from "@/app/components/modules/blog_editor_community/CommentList/CommentEditMode";

export interface Props {
  slug: string;
  comment: CommentType;
  setSelectedBlogComments: (value: any) => void;
  selectedBlogComments: Record<string, any>;
  isParentComment?: boolean;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function BlogComment({
  comment,
  slug,
  setSelectedBlogComments,
  selectedBlogComments,
  isParentComment,
}: Props) {
  const bodyRef = React.useRef(null);
  const [displayCommentInputReply, setDisplayCommentInputReply] =
    React.useState(false);
  const [isNormalMode, setIsNormalMode] = React.useState(false);
  const [isBodyCollapsed, setIsBodyCollapsed] = React.useState(false);
  const [commentButtonLabel, setCommentButtonLabel] =
    React.useState<string>("Читать дальше");
  const [shouldDisplayReplies, setShouldDisplayReplies] = React.useState(false);
  const [isEditModeOn, setIsEditModeOn] = React.useState(false);

  React.useEffect(() => {
    // @ts-ignore
    if (bodyRef.current.offsetHeight > 190) {
      setIsNormalMode(false);
    } else {
      setIsNormalMode(true);
    }
  }, [bodyRef.current]);

  const resizeBodyHandleChange = React.useCallback(() => {
    setIsBodyCollapsed(!isBodyCollapsed);
    if (isBodyCollapsed) {
      setCommentButtonLabel("Читать дальше");
    } else {
      setCommentButtonLabel("Свернуть");
    }
  }, [setIsBodyCollapsed, isBodyCollapsed]);

  const shouldDisplayRepliesButton = React.useCallback(() => {
    setShouldDisplayReplies((shouldDisplayReplies) => !shouldDisplayReplies);
  }, []);

  const blogCommentInputCheckboxHandleChange = React.useCallback(
    (checked: boolean, comment: any) => {
      if (checked) {
        setSelectedBlogComments([...selectedBlogComments, comment]);
      } else {
        setSelectedBlogComments(
          selectedBlogComments.filter(
            (item: any) => item.comment_id !== comment.comment_id,
          ),
        );
      }
    },
    [setSelectedBlogComments, selectedBlogComments, comment],
  );

  return (
    <div
      className={classNames(styles.root, { [styles.parent]: isParentComment })}
    >
      <div className={styles.commentAndInputReplyContainer}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {isEditModeOn ? (
            <CommentEditMode
              slug={slug}
              comment={comment}
              setIsEditModeOn={setIsEditModeOn}
            />
          ) : (
            <div className={styles.userCommentContainer}>
              <CommentInput
                comment={comment}
                checked={selectedBlogComments.find(
                  (item: any) => item.comment_id === comment.comment_id,
                )}
                onChange={blogCommentInputCheckboxHandleChange}
              />
              <BlogCommentAvatar
                comment={comment}
                isParentComment={isParentComment}
              />
              <div className={styles.commentMain}>
                <div className={styles.commentHeader}>
                  <div>
                    <Link href={`/profile/${comment.author.username}/`}>
                      <div>{comment.author.username}</div>
                    </Link>
                  </div>
                  <div className={styles.delimiter}>•</div>
                  {comment.is_edited ? (
                    <div className={styles.date}>
                      {moment(comment.created_at).fromNow()}
                      &nbsp;
                      {`(изменено)`}
                    </div>
                  ) : (
                    <div className={styles.date}>
                      {moment(comment.created_at).fromNow()}
                    </div>
                  )}
                </div>
                <div ref={bodyRef} className={styles.commentBody}>
                  {isNormalMode ? (
                    <div>{comment.body}</div>
                  ) : (
                    <>
                      <div
                        className={classNames(styles.commentBodyCollapsed, {
                          [styles.commentBodyFull]:
                            commentButtonLabel === "Свернуть",
                        })}
                      >
                        {comment.body}
                      </div>
                      <button
                        className={styles.bodyButton}
                        onClick={resizeBodyHandleChange}
                      >
                        {commentButtonLabel}
                      </button>
                    </>
                  )}
                </div>
                <CommentActionButtons
                  slug={slug}
                  comment={comment}
                  setDisplayCommentInputReply={setDisplayCommentInputReply}
                  isParentComment={isParentComment}
                  shouldDisplayReplies={shouldDisplayReplies}
                  shouldDisplayRepliesButton={shouldDisplayRepliesButton}
                  setIsEditModeOn={setIsEditModeOn}
                />
              </div>
            </div>
          )}
          {isParentComment && (
            <div className={styles.relatedPostContainer}>
              <div>
                <Link
                  href={`/blog/${comment?.post.blog.slug}/post/${comment?.post.post_id}/`}
                >
                  <Image
                    src={
                      comment?.post.blog.avatar_small
                        ? `${BASE_URL}${comment?.post.blog.avatar_small}`
                        : "/img/default/avatar_default.jpg"
                    }
                    className={styles.relatedPostAvatar}
                    alt={""}
                    width={50}
                    height={50}
                  />
                </Link>
              </div>
              <div style={{ width: "150px", paddingLeft: "10px" }}>
                <Link
                  href={`/blog/${comment?.post.blog.slug}/post/${comment?.post.post_id}/`}
                >
                  <div>{comment?.post.title}</div>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div>
          {displayCommentInputReply && (
            <CommentReply
              slug={slug}
              comment={comment}
              setDisplayCommentInputReply={setDisplayCommentInputReply}
            />
          )}
        </div>
      </div>
      {shouldDisplayReplies && (
        <>
          <BlogCommentList
            slug={slug}
            setSelectedBlogComments={setSelectedBlogComments}
            selectedBlogComments={selectedBlogComments}
            comment_id={comment.comment_id}
            isParentComment={false}
          />
        </>
      )}
    </div>
  );
}
