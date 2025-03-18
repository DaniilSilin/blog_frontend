import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import "moment/locale/ru";
import classNames from "classnames";

import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { VscPinned } from "react-icons/vsc";

import CommentBox from "@/app/components/modules/comment/CommentBox";
import CommentaryActionMenu from "./CommentaryActionMenu";

import styles from "./commentary.module.css";

export interface Props {
  comment: any;
  slug: string;
  post_id: number;
  width: number;
  height: number;
  postData: any;
  isReplyToParentComment: boolean;
  isPinned: boolean;
  isParent: boolean;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function Commentary({
  slug,
  post_id,
  comment,
  width,
  height,
  postData,
  isReplyToParentComment,
  isPinned,
  isParent,
}: Props) {
  const bodyRef = React.useRef(null);
  const [displayReplyInput, setDisplayReplyInput] = React.useState(false);
  const user = useAppSelector((state) => state.django.profile);
  const commentAdditionalMenuRef = React.useRef(null);
  const [displayAdditionalMenu, setDisplayAdditionalMenu] =
    React.useState<boolean>(false);
  const [editMode, setEditMode] = React.useState(false);
  const [setOrRemoveCommentLike] =
    DjangoService.useSetOrRemoveCommentLikeMutation();
  const [setOrRemoveCommentDislike] =
    DjangoService.useSetOrRemoveCommentDislikeMutation();
  const [commentButtonLabel, setCommentButtonLabel] =
    React.useState<string>("Читать дальше");
  const [isNormalMode, setIsNormalMode] = React.useState<boolean | undefined>(
    undefined,
  );
  const [isBodyCollapsed, setIsBodyCollapsed] = React.useState(false);

  const showReplyInputHandleChange = React.useCallback(() => {
    setDisplayReplyInput(true);
  }, [setDisplayReplyInput]);

  const likeCommentButton = () => {
    setOrRemoveCommentLike({
      slug: slug,
      post_id: post_id,
      comment_id: comment?.comment_id,
    });
  };

  const dislikeCommentButton = () => {
    setOrRemoveCommentDislike({
      slug: slug,
      post_id: post_id,
      comment_id: comment?.comment_id,
    });
  };

  React.useEffect(() => {
    if (!editMode) {
      const handleMouseDown = (e: MouseEvent) => {
        // // @ts-ignore
        // if (commentAdditionalMenuRef.current.contains(e.target)) {
        //   setDisplayAdditionalMenu(true)
        // } else {
        //   setDisplayAdditionalMenu(false)
        // }
      };
      document.addEventListener("mousedown", handleMouseDown);
      return () => document.removeEventListener("mousedown", handleMouseDown);
    }
  });

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
    <div className={styles.root}>
      <div className={styles.commentAuthorAvatarBlock}>
        <Link href={`/profile/${comment.author.username}/`}>
          <Image
            className={styles.commentAuthorAvatar}
            src={
              comment.author.avatar_small
                ? `${BASE_URL}${comment.author.avatar_small}`
                : "/img/default/avatar_default.jpg"
            }
            width={width}
            height={height}
            alt={""}
          />
        </Link>
      </div>
      {editMode ? (
        <CommentBox
          editMode={editMode}
          setEditMode={setEditMode}
          comment={comment}
          placeholder={""}
          submitButtonText={"Сохранить"}
          slug={slug}
          post_id={post_id}
          setDisplayReplyInput={setDisplayReplyInput}
          isReplyToParentComment={true}
        />
      ) : (
        <div className={styles.commentContainer}>
          <div style={{ width: "1000px" }}>
            <div className={styles.commentHeader}>
              {isPinned && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <VscPinned style={{ marginRight: "5px" }} />
                  <div>Закреплено каналом</div>
                </div>
              )}
              <div style={{ display: "flex" }}>
                <Link href={`/profile/${comment.author.username}/`}>
                  {postData?.author.username === comment?.author.username ? (
                    <div className={styles.commentAuthorIsPostAuthor}>
                      {comment?.author.username}
                    </div>
                  ) : (
                    <div className={styles.commentAuthor}>
                      {comment.author.username}
                    </div>
                  )}
                </Link>
                <div className={styles.date}>
                  {moment(comment.created_at).fromNow()}
                </div>
              </div>
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
            <div className={styles.commentFooter}>
              <div className={styles.likeButtonContainer}>
                <div>
                  {comment.isLiked.toString() === "true" ? (
                    <AiFillLike
                      size={20}
                      className={styles.likeIconNotLiked}
                      onClick={likeCommentButton}
                    />
                  ) : (
                    <AiOutlineLike
                      size={20}
                      className={styles.likeIconLiked}
                      onClick={likeCommentButton}
                    />
                  )}
                </div>
                <div>
                  {comment.likes ? (
                    <span className={styles.likeCounter}>{comment.likes}</span>
                  ) : null}
                </div>
              </div>
              <div className={styles.dislikeButtonContainer}>
                <div>
                  {comment.isDisliked.toString() === "true" ? (
                    <AiFillDislike
                      size={20}
                      style={{ color: "black" }}
                      onClick={dislikeCommentButton}
                    />
                  ) : (
                    <AiOutlineDislike
                      size={20}
                      style={{ color: "black" }}
                      onClick={dislikeCommentButton}
                    />
                  )}
                </div>
                <div>
                  {comment.dislikes ? (
                    <span className={styles.likeCounter}>
                      {comment.dislikes}
                    </span>
                  ) : null}
                </div>
              </div>
              {comment?.liked_by_author ? (
                <div className={styles.likedByAuthorContainer}>
                  <Image
                    src={
                      postData?.author.avatar_small
                        ? `${BASE_URL}${postData?.author.avatar_small}`
                        : "/img/default/avatar_default.jpg"
                    }
                    className={styles.likedByAuthorAvatar}
                    width={24}
                    height={24}
                    alt={""}
                  />
                  <FcLike size={10} className={styles.likedByAuthorHeart} />
                </div>
              ) : (
                <div>
                  <FcLike size={20} className={styles.notLikedByAuthorHeart} />
                </div>
              )}
              <div>
                <button
                  className={styles.createReplyButton}
                  onClick={showReplyInputHandleChange}
                >
                  Ответить
                </button>
              </div>
            </div>
            <div className={styles.createReplyContainer}>
              {displayReplyInput && (
                <>
                  <Image
                    src={
                      user?.avatar_small
                        ? `${BASE_URL}${user?.avatar_small}`
                        : "/img/default/avatar_default.jpg"
                    }
                    width={32}
                    height={32}
                    className={styles.createReplyUserAvatar}
                    alt={""}
                  />
                  <CommentBox
                    comment={comment}
                    post_id={post_id}
                    slug={slug}
                    editMode={editMode}
                    displayReplyInput={displayReplyInput}
                    setDisplayReplyInput={setDisplayReplyInput}
                    placeholder={"Введите ответ"}
                    submitButtonText={"Ответить"}
                    isReplyToParentComment={isReplyToParentComment}
                  />
                </>
              )}
            </div>
          </div>
          {!user.isGuest && (
            <div ref={commentAdditionalMenuRef}>
              <BsThreeDotsVertical />
              {displayAdditionalMenu && (
                <CommentaryActionMenu
                  setDisplayAdditionalMenu={setDisplayAdditionalMenu}
                  comment={comment}
                  slug={slug}
                  post_id={post_id}
                  postData={postData}
                  setEditMode={setEditMode}
                  isParent={isParent}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
