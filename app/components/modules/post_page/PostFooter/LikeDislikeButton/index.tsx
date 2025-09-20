import React from "react";
import { useAppSelector } from "@/app/store";
import DjangoService from "@/app/store/services/DjangoService";
import { PostType } from "@/app/types";

import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import NoUserPopup from "@/app/components/modules/NoUserPopup";

import styles from "./like_dislike_button.module.css";

export interface Props {
  post: PostType;
}

export default function LikeDislikeButton({ post }: Props) {
  const user = useAppSelector((state) => state.django.profile);
  const likeRef = React.useRef(null);
  const dislikeRef = React.useRef(null);

  const [setOrRemoveLike] = DjangoService.useSetOrRemoveLikeMutation();
  const [setOrRemoveDislike] = DjangoService.useSetOrRemoveDislikeMutation();

  const [displayLikePopup, setDisplayLikePopup] = React.useState(false);
  const [displayDislikePopup, setDisplayDislikePopup] = React.useState(false);

  const setOrRemovePostLike = React.useCallback(() => {
    setOrRemoveLike({ post_id: post.post_id, slug: post.blog.slug });
  }, [post]);

  const setOrRemovePostDislike = React.useCallback(() => {
    setOrRemoveDislike({ post_id: post.post_id, slug: post.blog.slug });
  }, [post]);

  const handleShowLikePopup = React.useCallback(() => {
    setDisplayLikePopup((displayLikePopup) => !displayLikePopup);
  }, []);

  const handleShowDislikePopup = React.useCallback(() => {
    setDisplayDislikePopup((displayDislikePopup) => !displayDislikePopup);
  }, []);

  // React.useEffect(() => {
  //   const handleMouse = (e: MouseEvent) => {
  //     // @ts-ignore
  //     if (user.isGuest) {
  //       // @ts-ignore
  //       if (!likeRef.current.contains(e.target)) {
  //         setDisplayLikePopup(false);
  //       }
  //       // @ts-ignore
  //       if (!dislikeRef.current.contains(e.target)) {
  //         setDisplayDislikePopup(false);
  //       }
  //     }
  //   };
  //   document.addEventListener("mousedown", handleMouse);
  //   return () => document.removeEventListener("mousedown", handleMouse);
  // });

  return (
    <div className={styles.root}>
      {user.isGuest ? (
        <>
          <button
            className={styles.likeButton}
            onClick={handleShowLikePopup}
            ref={likeRef}
          >
            <AiOutlineLike className={styles.likeIcon} size={20} />
            <div>{post?.likes}</div>
          </button>
          {/*{displayLikePopup && (*/}
          {/*  <div*/}
          {/*    style={{*/}
          {/*      marginTop: "35px",*/}
          {/*      marginLeft: "-50px",*/}
          {/*      cursor: "default",*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <NoUserPopup*/}
          {/*      title={"Нравится эта публикация?"}*/}
          {/*      description={"Войдите, чтобы поставить лайк на эту публикацию."}*/}
          {/*      redirectTo={`/blog/${post.blog.slug}/post/${post.post_id}`}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*)}*/}
        </>
      ) : (
        <button onClick={setOrRemovePostLike} className={styles.likeButton}>
          {post?.isLiked.toString() === "true" ? (
            <AiFillLike className={styles.likeIcon} size={20} />
          ) : (
            <AiOutlineLike className={styles.likeIcon} size={20} />
          )}
          <div>{post?.likes}</div>
        </button>
      )}
      {user.isGuest ? (
        <>
          <button
            ref={dislikeRef}
            className={styles.dislikeButton}
            onClick={handleShowDislikePopup}
          >
            <AiOutlineDislike className={styles.dislikeIcon} size={20} />
            <div>{post?.dislikes}</div>
          </button>
          {/*{displayDislikePopup && (*/}
          {/*  <div*/}
          {/*    style={{*/}
          {/*      marginTop: "35px",*/}
          {/*      marginLeft: "-30px",*/}
          {/*      cursor: "default",*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <NoUserPopup*/}
          {/*      title={"Не нравится эта публикация?"}*/}
          {/*      description={*/}
          {/*        "Войдите, чтобы поставить дизлайк на эту публикацию."*/}
          {/*      }*/}
          {/*      redirectTo={`/blog/${post.blog.slug}/post/${post.post_id}`}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*)}*/}
        </>
      ) : (
        <button
          onClick={setOrRemovePostDislike}
          className={styles.dislikeButton}
        >
          {post?.isDisliked.toString() === "true" ? (
            <AiFillDislike className={styles.dislikeIcon} size={20} />
          ) : (
            <AiOutlineDislike className={styles.dislikeIcon} size={20} />
          )}
          <div>{post?.dislikes}</div>
        </button>
      )}
    </div>
  );
}
