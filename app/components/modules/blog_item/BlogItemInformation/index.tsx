import React from "react";
import moment from "moment";
import "moment/locale/ru";
import { BlogType } from "@/app/types";

import styles from "./blog_item_information.module.css";

export interface Props {
  blog: BlogType;
}

export default function BlogItemInformation({ blog }: Props) {
  return (
    <div className={styles.root}>
      {blog?.description && (
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionTitle}>Описание:</div>
          <div className={styles.descriptionContent}>{blog?.description}</div>
        </div>
      )}
      <div className={styles.lastUpdatedContainer}>
        <div className={styles.dateTitle}>Последнее обновление:</div>
        <div className={styles.dateData}>
          {moment(blog?.updated_at).format("D MMMM YYYY hh:mm")}
        </div>
      </div>
      <div className={styles.blogStatsContainer}>
        <div className={styles.countOfPostsStatContainer}>
          <div className={styles.statName}>{blog?.count_of_posts}</div>
          <div className={styles.statValue}>Постов</div>
        </div>
        <div className={styles.commentsStatContainer}>
          <div className={styles.statName}>{blog?.count_of_commentaries}</div>
          <div className={styles.statValue}>Комментариев</div>
        </div>
        <div className={styles.viewsStatContainer}>
          <div className={styles.statName}>{blog?.views}</div>
          <div className={styles.statValue}>Просмотров</div>
        </div>
      </div>
    </div>
  );
}
