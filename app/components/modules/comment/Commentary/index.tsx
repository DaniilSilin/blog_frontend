import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import "moment/locale/ru";
import classNames from "classnames";

import { PostType, CommentType } from "@/app/types";

import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";

import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { VscPinned } from "react-icons/vsc";

import CommentText from "@/app/utils/CustomText";
import CommentBox from "@/app/components/modules/comment/CommentBox";
import CommentaryActionMenu from "./CommentaryActionMenu";

import styles from "./commentary.module.css";
import NoUserPopup from "@/app/components/modules/NoUserPopup";

export interface Props {
  comment: CommentType;
  slug: string;
  post_id: number;
  width: number;
  height: number;
  post: PostType;
  isReplyToParentComment?: boolean;
  isParent?: boolean;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function Commentary({
  slug,
  post_id,
  comment,
  width,
  height,
  post,
  isReplyToParentComment,
  isParent,
}: Props) {
  const bodyRef = React.useRef(null);
  const likeButtonRef = React.useRef(null);
  const dislikeButtonRef = React.useRef(null);

  const [displayLikePopup, setDisplayLikePopup] = React.useState(false);
  const [displayDislikePopup, setDisplayDislikePopup] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
  const [setOrRemoveLikeByAuthor] =
    DjangoService.useSetOrRemoveLikeByAuthorMutation();
  const [commentButtonLabel, setCommentButtonLabel] =
    React.useState<string>("Читать дальше");
  const [isNormalMode, setIsNormalMode] = React.useState<boolean | undefined>(
    undefined,
  );
  const [isBodyCollapsed, setIsBodyCollapsed] = React.useState(false);

  const showReplyInputHandleChange = React.useCallback(() => {
    setDisplayReplyInput(true);
  }, [setDisplayReplyInput]);

  const handleShowLikePopup = React.useCallback(() => {
    setDisplayLikePopup(!displayLikePopup);
  }, [setDisplayLikePopup, displayLikePopup]);

  const handleShowDislikePopup = React.useCallback(() => {
    setDisplayDislikePopup(!displayDislikePopup);
  }, [setDisplayDislikePopup, displayDislikePopup]);

  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      // @ts-ignore
      if (user.isGuest) {
        // @ts-ignore
        if (!likeButtonRef.current.contains(e.target)) {
          setDisplayLikePopup(false);
        }
        // @ts-ignore
        if (!dislikeButtonRef.current.contains(e.target)) {
          setDisplayDislikePopup(false);
        }
      }
    };
    document.addEventListener("mousedown", handleMouse);
    return () => document.removeEventListener("mousedown", handleMouse);
  });

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

  const setLikeByAuthorButton = () => {
    setOrRemoveLikeByAuthor({ slug, post_id, comment_id: comment?.comment_id });
  };

  const displayAdditionalMenuHandler = React.useCallback(() => {
    setDisplayAdditionalMenu((displayAdditionalMenu) => !displayAdditionalMenu);
  }, []);

  React.useEffect(() => {
    if (!editMode) {
      const handleMouseDown = (e: MouseEvent) => {
        if (displayAdditionalMenu) {
          // @ts-ignore
          if (!commentAdditionalMenuRef.current.contains(e.target)) {
            setDisplayAdditionalMenu(false);
          }
        }
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
          setLoading={setLoading}
        />
      ) : (
        <>
          {loading ? (
            <div className={styles.commentContainer}>123</div>
          ) : (
            <div className={styles.commentContainer}>
              <div style={{ width: "inherit" }}>
                <div className={styles.commentHeader}>
                  {comment.is_pinned && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <VscPinned style={{ marginRight: "5px" }} />
                      <div>
                        Закреплено пользователем{" "}
                        {comment.pinned_by_user.username}
                      </div>
                    </div>
                  )}
                  <div style={{ display: "flex" }}>
                    <Link href={`/profile/${comment.author.username}/`}>
                      {post?.author.username === comment?.author.username ? (
                        <div className={styles.commentAuthorIsPostAuthor}>
                          {comment?.author.username}
                        </div>
                      ) : (
                        <div className={styles.commentAuthor}>
                          {comment.author.username}
                        </div>
                      )}
                    </Link>
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
                </div>
                <div ref={bodyRef} className={styles.commentBody}>
                  {isNormalMode ? (
                    <div>{CommentText(comment.body)}</div>
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
                  {user.isGuest ? (
                    <div
                      className={styles.likeButtonContainer}
                      ref={likeButtonRef}
                    >
                      <button
                        className={styles.likeButton}
                        onClick={handleShowLikePopup}
                        title={"Нравится"}
                      >
                        <AiOutlineLike size={20} className={styles.likeIcon} />
                      </button>
                      {displayLikePopup && (
                        <NoUserPopup
                          description={
                            "Войдите, чтобы подписаться на этот канал"
                          }
                          redirectTo={`/blog/${slug}/post/${post_id}`}
                        />
                      )}
                      <div>
                        {comment.likes ? (
                          <span className={styles.likeCounter}>
                            {comment.likes}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.likeButtonContainer}>
                      <button
                        className={styles.likeButton}
                        title={
                          comment.isLiked.toString() === "true"
                            ? "Больше не нравится"
                            : "Нравится"
                        }
                      >
                        {comment.isLiked.toString() === "true" ? (
                          <AiFillLike
                            size={20}
                            className={styles.likeIcon}
                            onClick={likeCommentButton}
                          />
                        ) : (
                          <AiOutlineLike
                            size={20}
                            className={styles.likeIcon}
                            onClick={likeCommentButton}
                          />
                        )}
                      </button>
                      <div>
                        {comment.likes ? (
                          <span className={styles.likeCounter}>
                            {comment.likes}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  )}
                  {user.isGuest ? (
                    <div
                      className={styles.dislikeButtonContainer}
                      ref={dislikeButtonRef}
                    >
                      <button
                        className={styles.dislikeButton}
                        onClick={handleShowDislikePopup}
                        title={"Не нравится"}
                      >
                        <AiOutlineDislike
                          size={20}
                          className={styles.dislikeIcon}
                        />
                      </button>
                      {displayDislikePopup && (
                        <NoUserPopup
                          description={
                            "Войдите, чтобы подписаться на этот канал"
                          }
                          redirectTo={`/blog/${slug}/post/${post_id}`}
                        />
                      )}
                      <div>
                        {comment.dislikes ? (
                          <span className={styles.likeCounter}>
                            {comment.dislikes}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.dislikeButtonContainer}>
                      <button
                        className={styles.dislikeButton}
                        title={
                          comment.isLiked.toString() === "true"
                            ? 'Снять отметку "Не нравится"'
                            : "Не нравится"
                        }
                      >
                        {comment.isDisliked.toString() === "true" ? (
                          <AiFillDislike
                            size={20}
                            className={styles.dislikeIcon}
                            onClick={dislikeCommentButton}
                          />
                        ) : (
                          <AiOutlineDislike
                            size={20}
                            className={styles.dislikeIcon}
                            onClick={dislikeCommentButton}
                          />
                        )}
                      </button>
                      <div>
                        {comment.dislikes ? (
                          <span className={styles.likeCounter}>
                            {comment.dislikes}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  )}
                  {!user.isGuest && user?.username === post?.author.username ? (
                    <div className={styles.likedByAuthorContainer}>
                      {comment?.liked_by_author ? (
                        <button
                          className={styles.likedByAuthorButton}
                          onClick={setLikeByAuthorButton}
                          title={'Удалить отметку "Нравится"'}
                        >
                          <Image
                            src={
                              post?.author.avatar_small
                                ? `${BASE_URL}${post?.author.avatar_small}`
                                : "/img/default/avatar_default.jpg"
                            }
                            className={styles.likedByAuthorAvatar}
                            width={24}
                            height={24}
                            alt={""}
                          />
                          <FcLike
                            size={5}
                            className={styles.likedByAuthorHeart}
                            style={{ marginRight: "-8px" }}
                          />
                        </button>
                      ) : (
                        <button title={"Понравилось автору"}>
                          <FaRegHeart
                            size={18}
                            className={styles.notLikedByAuthorButton}
                            onClick={setLikeByAuthorButton}
                          />
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      {comment?.liked_by_author.toString() === "true" && (
                        <div
                          className={styles.likedByAuthorContainer}
                          title={`❤️ от автора поста "${post?.author.username}"`}
                        >
                          <Image
                            src={
                              post?.author.avatar_small
                                ? `${BASE_URL}${post?.author.avatar_small}`
                                : "/img/default/avatar_default.jpg"
                            }
                            className={styles.likedByAuthorAvatar}
                            width={24}
                            height={24}
                            alt={""}
                          />
                          <FcLike
                            size={10}
                            className={styles.likedByAuthorHeart}
                          />
                        </div>
                      )}
                    </>
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
                        setLoading={setLoading}
                      />
                    </>
                  )}
                </div>
              </div>
              {!user.isGuest && (
                <div>
                  <button
                    className={styles.commentActionMenuButton}
                    onClick={displayAdditionalMenuHandler}
                  >
                    <BsThreeDotsVertical />
                  </button>
                  {displayAdditionalMenu && (
                    <div ref={commentAdditionalMenuRef}>
                      <CommentaryActionMenu
                        setDisplayAdditionalMenu={setDisplayAdditionalMenu}
                        comment={comment}
                        slug={slug}
                        post_id={post_id}
                        postData={post}
                        setEditMode={setEditMode}
                        isParent={isParent}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
