import React from "react";
import { useAppSelector } from "@/app/store";
import DjangoService from "@/app/store/services/DjangoService";

import styles from "@/app/components/modules/post_page/PostFooter/post_footer.module.css";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import NoUserPopup from "@/app/components/modules/NoUserPopup";
import LikedUserListMini from "@/app/components/modules/post_page/PostFooter/LikedUserListMini";

export interface Props {
  post: any;
}

export default function LikeDislikeButton({ post }: Props) {
  const user = useAppSelector((state) => state.django.profile);
  const likeRef = React.useRef(null);
  const dislikeRef = React.useRef(null);

  const [setOrRemoveLike] = DjangoService.useSetOrRemoveLikeMutation();
  const [setOrRemoveDislike] = DjangoService.useSetOrRemoveDislikeMutation();

  const [displayLikePopup, setDisplayLikePopup] = React.useState(false);
  const [displayDislikePopup, setDisplayDislikePopup] = React.useState(false);

  const setOrRemovePostLike = (slug: string, post_id: number) => {
    setOrRemoveLike({ post_id, slug });
  };

  const setOrRemovePostDislike = (slug: string, post_id: number) => {
    setOrRemoveDislike({ slug, post_id });
  };

  const handleShowLikePopup = React.useCallback(() => {
    setDisplayLikePopup((displayLikePopup) => !displayLikePopup);
  }, []);

  const handleShowDislikePopup = React.useCallback(() => {
    setDisplayDislikePopup((displayDislikePopup) => !displayDislikePopup);
  }, []);

  const [visibleLikedUserList, setVisibleLikedUserList] = React.useState(true);

  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      // @ts-ignore
      if (user.isGuest) {
        // @ts-ignore
        if (!likeRef.current.contains(e.target)) {
          setDisplayLikePopup(false);
        }
        // @ts-ignore
        if (!dislikeRef.current.contains(e.target)) {
          setDisplayDislikePopup(false);
        }
      }
    };
    document.addEventListener("mousedown", handleMouse);
    return () => document.removeEventListener("mousedown", handleMouse);
  });

  return (
    <div className={styles.likedAndDislikeContainer}>
      {user.isGuest ? (
        <div className={styles.likeContainer} ref={likeRef}>
          <button className={styles.likeButton} onClick={handleShowLikePopup}>
            <AiOutlineLike className={styles.likeIconNotLiked} size={20} />
            <div className={styles.likeCounter}>{post?.likes}</div>
            {/*<div>*/}
            {/*  {post?.likes > 0 && visibleLikedUserList && (*/}
            {/*    <LikedUserListMini post={post} />*/}
            {/*  )}*/}
            {/*</div>*/}
          </button>
          {displayLikePopup && (
            <div
              style={{
                marginTop: "35px",
                marginLeft: "-50px",
                cursor: "default",
              }}
            >
              <NoUserPopup
                title={"Нравится эта публикация?"}
                description={"Войдите, чтобы поставить лайк на эту публикацию."}
                redirectTo={`/blog/${post.blog.slug}/post/${post.post_id}`}
              />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.likeContainer}>
          <button
            onClick={() => setOrRemovePostLike(post.blog.slug, post.post_id)}
            className={styles.likeButton}
          >
            {post?.isLiked.toString() === "true" ? (
              <AiFillLike className={styles.likeIconLiked} size={20} />
            ) : (
              <AiOutlineLike className={styles.likeIconNotLiked} size={20} />
            )}
            <div className={styles.likeCounter}>{post?.likes}</div>
          </button>
          <div>
            {post?.likes > 0 && visibleLikedUserList && (
              <LikedUserListMini post={post} />
            )}
          </div>
        </div>
      )}
      {user.isGuest ? (
        <div className={styles.dislikeContainer} ref={dislikeRef}>
          <button
            className={styles.dislikeButton}
            onClick={handleShowDislikePopup}
          >
            <AiOutlineDislike
              className={styles.dislikeIconNotLiked}
              size={20}
            />
            <div className={styles.dislikeCounter}>{post?.dislikes}</div>
          </button>
          {displayDislikePopup && (
            <div
              style={{
                marginTop: "35px",
                marginLeft: "-30px",
                cursor: "default",
              }}
            >
              <NoUserPopup
                title={"Не нравится эта публикация?"}
                description={
                  "Войдите, чтобы поставить дизлайк на эту публикацию."
                }
                redirectTo={`/blog/${post.blog.slug}/post/${post.post_id}`}
              />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.dislikeContainer}>
          <button
            onClick={() => setOrRemovePostDislike(post.blog.slug, post.post_id)}
            className={styles.dislikeButton}
          >
            {post?.isDisliked.toString() === "true" ? (
              <AiFillDislike className={styles.dislikeIconLiked} size={20} />
            ) : (
              <AiOutlineDislike
                className={styles.dislikeIconNotLiked}
                size={20}
              />
            )}
            <div className={styles.dislikeCounter}>{post?.dislikes}</div>
          </button>
        </div>
      )}
    </div>
  );
}
