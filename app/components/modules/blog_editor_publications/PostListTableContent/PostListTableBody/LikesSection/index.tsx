import React from "react";

import { PostType } from "@/app/types";
import LikesAndDislikesHover from "./LikesAndDislikesHover";

import styles from "./likes_section.module.css";

export interface Props {
  post: PostType;
}

export default function LikesSection({ post }: Props) {
  const [displayLikesDislikes, setDisplayLikesDislikes] = React.useState(false);

  const onMouseLeaveHide = () => {
    setDisplayLikesDislikes(false);
  };

  const onMouseDisplayOver = () => {
    setDisplayLikesDislikes(true);
  };

  const calculatedInPercent = React.useMemo(() => {
    return (Math.abs(post.likes / (post.likes + post.dislikes)) * 100).toFixed(
      1,
    );
  }, [post]);

  const likesLabel = React.useMemo(() => {
    // @ts-ignore
    const countOfLikes = post?.likes.toString();
    if (countOfLikes === "0") {
      return 'Нет отметок "Нравится"';
    } else if (
      countOfLikes.slice(-1) === "1" &&
      countOfLikes.slice(-2) !== "11"
    ) {
      return `${countOfLikes} отметка "Нравится"`;
    } else if (
      (countOfLikes.slice(-1) === "2" ||
        countOfLikes.slice(-1) === "3" ||
        countOfLikes.slice(-1) === "4") &&
      countOfLikes.slice(-2) !== "12" &&
      countOfLikes.slice(-2) !== "13" &&
      countOfLikes.slice(-2) !== "14"
    ) {
      return `${countOfLikes} отметки "Нравится"`;
    } else {
      return `${countOfLikes} отметок "Нравится"`;
    }
  }, [post]);

  if (post.likes === 0 && post.dislikes === 0) {
    return <div>-</div>;
  }

  return (
    <>
      <div
        className={styles.root}
        onMouseOver={onMouseDisplayOver}
        onMouseLeave={onMouseLeaveHide}
      >
        {displayLikesDislikes && <LikesAndDislikesHover post={post} />}
        <div className={styles.likesInPercent}>{calculatedInPercent} %</div>
        <div className={styles.likesAmountTitle}>{likesLabel}</div>
        <div className={styles.likesProgressBar}>
          <div
            className={styles.likesProgressFill}
            style={{
              width: `${calculatedInPercent}%`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
