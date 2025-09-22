import React from "react";
import { useAppSelector } from "@/app/store";
import DjangoService from "@/app/store/services/DjangoService";
import Image from "next/image";

import { PostType, CommentType } from "@/app/types";

import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";

import styles from "./notification_commentary_main_footer.module.css";
import CommentBox from "@/app/components/modules/comment/CommentBox";

export interface Props {
  slug: string;
  post_id: number;
  post: PostType;
  comment: CommentType;
  displayReplyInput: boolean;
  setDisplayReplyInput: (value: boolean) => void;
}

const BASE_URL = "http://127.0.0.1:8000/";

export default function NotificationCommentaryMainFooter({
  slug,
  post_id,
  post,
  comment,
  displayReplyInput,
  setDisplayReplyInput,
}: Props) {
  const user = useAppSelector((state) => state.django.profile);

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

  const likeCommentButton = () => {
    setOrRemoveCommentLike({
      slug,
      post_id,
      comment_id: comment?.comment_id,
    });
  };

  const dislikeCommentButton = () => {
    setOrRemoveCommentDislike({
      slug,
      post_id,
      comment_id: comment?.comment_id,
    });
  };

  const setLikeByAuthorButton = () => {
    setOrRemoveLikeByAuthor({ slug, post_id, comment_id: comment?.comment_id });
  };

  const showReplyInputHandleChange = React.useCallback(() => {
    // @ts-ignore
    setDisplayReplyInput((displayReplyInput) => !displayReplyInput);
  }, []);

  return (
    <div className={styles.commentFooter}>
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
            <span className={styles.likeCounter}>{comment.likes}</span>
          ) : null}
        </div>
      </div>
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
            <span className={styles.likeCounter}>{comment.dislikes}</span>
          ) : null}
        </div>
      </div>
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
              <FcLike size={10} className={styles.likedByAuthorHeart} />
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
  );
}
