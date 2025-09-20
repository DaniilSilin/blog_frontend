import React from "react";
import Link from "next/link";
import moment from "moment/moment";

import { PostType } from "@/app/types";

import styles from "./post_header_information.module.css";

export interface Props {
  post: PostType;
}

export default function PostHeaderInformation({ post }: Props) {
  const [dateCollapseMode, setIsDateCollapseMode] = React.useState(1);
  const today = Date.now();

  const countOfViewsTitle = React.useMemo(() => {
    // @ts-ignore
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

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 425) {
        setIsDateCollapseMode(1);
      } else if (window.innerWidth <= 425 && window.innerWidth > 385) {
        setIsDateCollapseMode(2);
      } else if (window.innerWidth <= 385) {
        setIsDateCollapseMode(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentDate = React.useMemo(() => {
    switch (dateCollapseMode) {
      case 1:
        return moment(post.created_at).diff(today, "days") < 26
          ? moment(post.created_at).format("DD MMMM YYYY HH:mm")
          : moment(post.created_at).fromNow();
      case 2:
        return moment(post.created_at).format("DD.MM.YYYY HH:mm");
      case 3:
        return moment(post.created_at).format("DD.MM.YY");
      default:
        return moment(post.created_at).fromNow();
    }
  }, [dateCollapseMode]);

  return (
    <div className={styles.root}>
      {!post?.author_is_hidden && (
        <div className={styles.postHeaderAuthor}>
          <Link href={`/profile/${post?.author.username}/`}>
            {post?.author.username}
          </Link>
        </div>
      )}
      <div className={styles.postHeaderDate}>{currentDate}</div>
      <div className={styles.postHeaderViews}>{countOfViewsTitle}</div>
    </div>
  );
}
