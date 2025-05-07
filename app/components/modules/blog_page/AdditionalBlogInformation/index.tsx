import React from "react";

import { BlogType } from "@/app/types";
import BlogExternalLinks from "./BlogExternalLinks";
import BlogSummary from "./BlogSummary";

import styles from "./addition_information.module.css";

export interface Props {
  blog: BlogType;
}

export default function AdditionalBlogInformation({ blog }: Props) {
  const [doesHaveLink, setDoesHaveLinks] = React.useState(false);
  const [blogSummaryTitle, setBlogSummaryTitle] = React.useState("О канале");

  React.useEffect(() => {
    if (
      blog?.phone_number ||
      blog?.email ||
      blog?.site_link ||
      blog?.vk_link ||
      blog?.telegram_link ||
      blog?.dzen_link ||
      blog?.youtube_link
    ) {
      setDoesHaveLinks(true);
      setBlogSummaryTitle("Дополнительная информация");
    } else {
      setDoesHaveLinks(false);
    }
  }, [blog]);

  return (
    <div className={styles.root}>
      <div style={{ margin: "8px 8px 0" }}>
        <div style={{ padding: "4px 2px 4px 16px" }}>
          <div style={{ margin: "10px 8px 10px 0" }}>
            <h2>{blog.title}</h2>
          </div>
          <div>x</div>
        </div>
      </div>
      <div className={styles.mainInformationContainer}>
        {blog?.description && (
          <>
            <h1 className={styles.descriptionTitle}>Описание</h1>
            <div className={styles.description}>{blog?.description}</div>
          </>
        )}

        {doesHaveLink && <BlogExternalLinks blog={blog} />}
        <BlogSummary blog={blog} blogSummaryTitle={blogSummaryTitle} />
      </div>
    </div>
  );
}
