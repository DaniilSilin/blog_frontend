import React from "react";
import { BlogType } from "@/app/types";

import styles from "./blog_header_metadata.module.css";

export interface Props {
  blog: BlogType;
}

export default function BlogHeaderMetadata({ blog }) {
  const blogSubscribersTitle = React.useMemo(() => {
    // @ts-ignore
    const blogSubscribers = blog?.subscriberList.toString();
    if (
      blogSubscribers.slice(-1) === "1" &&
      blogSubscribers.slice(-2) !== "11"
    ) {
      return `${blogSubscribers} подписчик`;
    } else if (
      (blogSubscribers.slice(-1) === "2" ||
        blogSubscribers.slice(-1) === "3" ||
        blogSubscribers.slice(-1) === "4") &&
      blogSubscribers.slice(-2) !== "12" &&
      blogSubscribers.slice(-2) !== "13" &&
      blogSubscribers.slice(-2) !== "14"
    ) {
      return `${blogSubscribers} подписчика`;
    } else {
      return `${blogSubscribers} подписчиков`;
    }
  }, [blog?.subscriberList]);

  const blogCountOfPostsTitle = React.useMemo(() => {
    // @ts-ignore
    const blogSubscribers = blog?.count_of_posts.toString();
    if (
      blogSubscribers.slice(-1) === "1" &&
      blogSubscribers.slice(-2) !== "11"
    ) {
      return `${blogSubscribers} подписчик`;
    } else if (
      (blogSubscribers.slice(-1) === "2" ||
        blogSubscribers.slice(-1) === "3" ||
        blogSubscribers.slice(-1) === "4") &&
      blogSubscribers.slice(-2) !== "12" &&
      blogSubscribers.slice(-2) !== "13" &&
      blogSubscribers.slice(-2) !== "14"
    ) {
      return `${blogSubscribers} подписчика`;
    } else {
      return `${blogSubscribers} подписчиков`;
    }
  }, [blog?.subscriberList]);

  return (
    <div className={styles.root}>
      <div className={styles.blogTitleContainer}>
        <span className={styles.blogTitle}>{blog?.title}</span>
      </div>
      <div className={styles.blogMetadataContainer}>
        <div>
          <span>{blog?.slug}</span>
          <span className={styles.delimiter}>·</span>
        </div>
        <div className={styles.blogContentCountersContainer}>
          <div className={styles.blogSubscribersCounterContainer}>
            <span>{blogSubscribersTitle}</span>
            <span className={styles.delimiter}>·</span>
          </div>
          <div className={styles.blogPostsCounterContainer}>
            <span>{blogCountOfPostsTitle} постов</span>
          </div>
        </div>
      </div>
    </div>
  );
}
