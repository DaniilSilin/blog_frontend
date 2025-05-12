import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";

import { AiFillDislike, AiOutlineDislike } from "react-icons/ai";
import NoUserPopup from "@/app/components/modules/NoUserPopup";

import styles from "./dislike_button.module.css";

export interface Props {
  slug: string;
  post_id: number;
  comment: any;
}

export default function DislikeButton({ slug, post_id, comment }: Props) {
  const user = useAppSelector((state) => state.django.profile);
  const dislikeButtonRef = React.useRef(null);

  const [setOrRemoveCommentDislike] =
    DjangoService.useSetOrRemoveCommentDislikeMutation();

  const [displayDislikePopup, setDisplayDislikePopup] = React.useState(false);

  const handleShowDislikePopup = React.useCallback(() => {
    setDisplayDislikePopup(!displayDislikePopup);
  }, [setDisplayDislikePopup, displayDislikePopup]);

  const dislikeCommentButton = () => {
    setOrRemoveCommentDislike({
      slug,
      post_id,
      comment_id: comment?.comment_id,
    });
  };

  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      // @ts-ignore
      if (user.isGuest) {
        // @ts-ignore
        if (!dislikeButtonRef.current.contains(e.target)) {
          setDisplayDislikePopup(false);
        }
      }
    };
    document.addEventListener("mousedown", handleMouse);
    return () => document.removeEventListener("mousedown", handleMouse);
  });

  return (
    <>
      {user.isGuest ? (
        <div className={styles.root} ref={dislikeButtonRef}>
          <button
            className={styles.dislikeButton}
            onClick={handleShowDislikePopup}
            title={"Не нравится"}
          >
            <AiOutlineDislike size={20} className={styles.dislikeIcon} />
          </button>
          <div>
            {comment.dislikes ? (
              <span className={styles.dislikeCounter}>{comment.dislikes}</span>
            ) : null}
          </div>
          {displayDislikePopup && (
            <NoUserPopup
              marginTop={210}
              title={"Хотите присоединиться к обсуждению?"}
              description={"Войдите, чтобы продолжить"}
              redirectTo={`/blog/${slug}/post/${post_id}`}
            />
          )}
        </div>
      ) : (
        <div className={styles.root}>
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
              <span className={styles.dislikeCounter}>{comment.dislikes}</span>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
