import React from "react";
import { useAppSelector } from "@/app/store";
import DjangoService from "@/app/store/services/DjangoService";

import Image from "next/image";
import classNames from "classnames";

import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";

import styles from "./comment_action_buttons.module.css";
import { GoPin } from "react-icons/go";
import { TiPen } from "react-icons/ti";
import { FaRegTrashCan } from "react-icons/fa6";

export interface Props {
  slug: string;
  comment: any;
  setDisplayCommentInputReply: (value: boolean) => void;
  isParentComment?: boolean;
  shouldDisplayRepliesButton: any;
  shouldDisplayReplies: boolean;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function CommentActionButtons({
  slug,
  comment,
  setDisplayCommentInputReply,
  isParentComment,
  shouldDisplayRepliesButton,
  shouldDisplayReplies,
}: Props) {
  const menuRef = React.useRef(null);
  const user = useAppSelector((state) => state.django.profile);

  const [setOrRemoveCommentLike] =
    DjangoService.useSetOrRemoveCommentLikeMutation();
  const [setOrRemoveCommentDislike] =
    DjangoService.useSetOrRemoveCommentDislikeMutation();
  const [setOrRemoveLikeByAuthor] =
    DjangoService.useSetOrRemoveLikeByAuthorMutation();
  const [deleteComment] = DjangoService.useDeleteCommentMutation();

  const [displayAdditionalMenu, setDisplayAdditionalMenu] =
    React.useState(false);

  const additionalMenuMouseHandleChange = React.useCallback(() => {
    setDisplayAdditionalMenu((displayAdditionalMenu) => !displayAdditionalMenu);
  }, []);

  const commentReplyInputHandle = React.useCallback(() => {
    setDisplayCommentInputReply(
      (displayCommentInputReply) => !displayCommentInputReply,
    );
  }, []);

  const countOfReliesLabel = React.useMemo(() => {
    const countOfReplies = comment.count_of_replies.toString();

    if (countOfReplies.slice(-1) === "1" && countOfReplies.slice(-2) !== "11") {
      return `${countOfReplies} ответ`;
    } else if (
      (countOfReplies.slice(-1) === "2" ||
        countOfReplies.slice(-1) === "3" ||
        countOfReplies.slice(-1) === "4") &&
      countOfReplies.slice(-2) !== "12" &&
      countOfReplies.slice(-2) !== "13" &&
      countOfReplies.slice(-2) !== "14"
    ) {
      return `${countOfReplies} ответа`;
    } else {
      return `${countOfReplies} ответов`;
    }
  }, [comment]);

  const likeCommentButton = () => {
    setOrRemoveCommentLike({
      slug: slug,
      post_id: comment.post.post_id,
      comment_id: comment?.comment_id,
    });
  };

  const dislikeCommentButton = () => {
    setOrRemoveCommentDislike({
      slug,
      post_id: comment.post.post_id,
      comment_id: comment?.comment_id,
    });
  };

  const deleteCommentButton = () => {
    deleteComment({
      slug,
      post_id: comment.post.post_id,
      comment_id: comment?.comment_id,
    });
  };

  const setOrRemoveLikeByAuthorButton = () => {
    setOrRemoveLikeByAuthor({
      slug,
      post_id: comment.post.post_id,
      comment_id: comment?.comment_id,
    });
  };

  return (
    <div className={styles.root}>
      <button className={styles.replyButton} onClick={commentReplyInputHandle}>
        Ответить
      </button>
      {isParentComment && (
        <>
          {!!comment.count_of_replies ? (
            <button
              onClick={shouldDisplayRepliesButton}
              className={styles.showMoreRepliesButton}
            >
              {countOfReliesLabel}
              {shouldDisplayReplies ? (
                <IoIosArrowUp className={styles.arrow} />
              ) : (
                <IoIosArrowDown className={styles.arrow} />
              )}
            </button>
          ) : (
            <div className={styles.noRepliesButton}>
              Нет ответов
              <IoIosArrowDown className={styles.arrow} />
            </div>
          )}
        </>
      )}
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
            <div className={styles.likeCounter}>{comment.likes}</div>
          ) : null}
        </div>
      </div>
      <div className={styles.dislikeButtonContainer}>
        <div className={styles.dislikeButton}>
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
                className={styles.likeIcon}
                onClick={dislikeCommentButton}
              />
            ) : (
              <AiOutlineDislike
                size={20}
                className={styles.likeIcon}
                onClick={dislikeCommentButton}
              />
            )}
          </button>
        </div>
        <div>
          {comment.dislikes ? (
            <div className={styles.dislikeCounter}>{comment.dislikes}</div>
          ) : null}
        </div>
      </div>
      <div>
        {!user.isGuest && user?.username === comment?.post.author.username ? (
          <div className={styles.likedByAuthorContainer}>
            {comment?.liked_by_author ? (
              <button
                className={styles.likedByAuthorButton}
                onClick={setOrRemoveLikeByAuthorButton}
                title={'Удалить отметку "Нравится"'}
              >
                <Image
                  src={
                    comment?.post.author.avatar_small
                      ? `${BASE_URL}${comment?.post.author.avatar_small}`
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
                  onClick={setOrRemoveLikeByAuthorButton}
                />
              </button>
            )}
          </div>
        ) : (
          <>
            {comment?.liked_by_author.toString() === "true" && (
              <div
                className={styles.likedByAuthorContainer}
                title={`❤️ от автора поста "${comment?.post.author.username}"`}
              >
                <Image
                  src={
                    comment?.post.author.avatar_small
                      ? `${BASE_URL}${comment?.post.author.avatar_small}`
                      : "/img/default/avatar_default.jpg"
                  }
                  className={styles.likedByAuthorAvatar}
                  width={24}
                  height={24}
                  alt={""}
                />
                <FcLike size={10} className={styles.likedByAuthorHeart} />
              </div>
            )}
          </>
        )}
      </div>
      <div className={styles.actionMenuContainer} ref={menuRef}>
        <button onClick={additionalMenuMouseHandleChange}>
          <BsThreeDotsVertical />
          {displayAdditionalMenu && (
            <div className={styles.actionMenu}>
              <button onClick={deleteCommentButton}>
                <FaRegTrashCan size={21} className={styles.icon} />
                Удалить
              </button>
              <button>
                <TiPen size={21} className={styles.icon} />
                Изменить
              </button>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
