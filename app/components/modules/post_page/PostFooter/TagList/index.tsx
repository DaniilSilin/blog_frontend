import React from "react";
import Link from "next/link";

import styles from "./tag_list.module.css";

export interface Props {
  tags: any;
}

export default function TagList({ tags }: Props) {
  return (
    <div className={styles.root}>
      {tags &&
        // @ts-ignore
        tags.split(" ").map((tag, index) => (
          <Link key={index} href={`/hashtag/${tag.slice(1)}`}>
            {tag}{" "}
          </Link>
        ))}
    </div>
  );
}
