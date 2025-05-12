import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";

import { CommentType } from "@/app/types";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import NoUserPopup from "@/app/components/modules/NoUserPopup";

import styles from "./like_button.module.css";

export interface Props {
  slug: string;
  post_id: number;
  comment: CommentType;
}

export default function LikeButton({ slug, post_id, comment }: Props) {
  const user = useAppSelector((state) => state.django.profile);
  const likeButtonRef = React.useRef(null);

  const [setOrRemoveCommentLike] =
    DjangoService.useSetOrRemoveCommentLikeMutation();

  const likeCommentButton = () => {
    setOrRemoveCommentLike({
      slug,
      post_id,
      comment_id: comment?.comment_id,
    });
  };

  const [displayLikePopup, setDisplayLikePopup] = React.useState(false);

  const handleShowLikePopup = React.useCallback(() => {
    setDisplayLikePopup(!displayLikePopup);
  }, [setDisplayLikePopup, displayLikePopup]);

  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (user.isGuest) {
        // @ts-ignore
        if (!likeButtonRef.current.contains(e.target)) {
          setDisplayLikePopup(false);
        }
      }
    };
    document.addEventListener("mousedown", handleMouse);
    return () => document.removeEventListener("mousedown", handleMouse);
  });

  return (
    <>
      {user.isGuest ? (
        <>
          <div className={styles.root} ref={likeButtonRef}>
            <button
              className={styles.likeButton}
              onClick={handleShowLikePopup}
              title={"Нравится"}
            >
              <AiOutlineLike size={20} className={styles.likeIcon} />
            </button>
            <div>
              {comment.likes ? (
                <span className={styles.likeCounter}>{comment.likes}</span>
              ) : null}
            </div>
            {displayLikePopup && (
              <NoUserPopup
                marginTop={210}
                title={"Хотите присоединиться к обсуждению?"}
                description={"Войдите, чтобы продолжить"}
                redirectTo={`/blog/${slug}/post/${post_id}`}
              />
            )}
          </div>
        </>
      ) : (
        <div className={styles.root}>
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
      )}
    </>
  );
}
