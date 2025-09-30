import React from "react";
import Link from "next/link";
import moment from "moment/moment";

import { PostType } from "@/app/types";

import styles from "./post_header_information.module.css";

export interface Props {
  post: PostType;
}

export default function PostHeaderInformation({ post }: Props) {
  const today = Date.now();

  const countOfViewsTitle = React.useMemo(() => {
    const countOfViews = post?.views.toString();

    if (countOfViews.slice(-1) === "1" && countOfViews.slice(-2) !== "11") {
      return `${countOfViews} просмотр`;
    } else if (
      (countOfViews.slice(-1) === "2" ||
        countOfViews.slice(-1) === "3" ||
        countOfViews.slice(-1) === "4") &&
      countOfViews.slice(-2) !== "12" &&
      countOfViews.slice(-2) !== "13" &&
      countOfViews.slice(-2) !== "14"
    ) {
      return `${countOfViews} просмотра`;
    } else {
      return `${countOfViews} просмотров`;
    }
  }, [post]);

  return (
    <div className={styles.root}>
      {!post?.author_is_hidden && (
        <div className={styles.postHeaderAuthor}>
          <Link href={`/profile/${post?.author.username}/`}>
            {post?.author.username}
          </Link>
        </div>
      )}
      <div className={styles.postHeaderDate}>
        {moment(post.created_at).diff(today, "days") < 26
          ? moment(post.created_at).format("DD MMMM YYYY HH:mm")
          : moment(post.created_at).fromNow()}
      </div>
      <div className={styles.postHeaderViews}>{countOfViewsTitle}</div>
    </div>
  );
}
