import React from "react";

import { PostType } from "@/app/types";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

import styles from "./likes_and_dislikes_hover.module.css";

export interface Props {
  post: PostType;
}

export default function LikesAndDislikesHover({ post }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.likedAndDislikeContainer}>
        <div className={styles.likeContainer}>
          <div className={styles.likeButton}>
            {post?.isLiked.toString() === "true" ? (
              <AiFillLike className={styles.likeIconLiked} size={20} />
            ) : (
              <AiOutlineLike className={styles.likeIconNotLiked} size={20} />
            )}
            <div className={styles.likeCounter}>{post?.likes}</div>
          </div>
        </div>
        <div className={styles.dislikeContainer}>
          <div className={styles.dislikeButton}>
            {post?.isDisliked.toString() === "true" ? (
              <AiFillDislike className={styles.dislikeIconLiked} size={20} />
            ) : (
              <AiOutlineDislike
                className={styles.dislikeIconNotLiked}
                size={20}
              />
            )}
            <div className={styles.dislikeCounter}>{post?.dislikes}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
