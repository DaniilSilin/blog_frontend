import React from "react";
import Image from "next/image";
import Link from "next/link";

import { PostType } from "@/app/types";
import PostHeaderInformation from "./PostHeaderInformation";

import styles from "./post_header.module.css";

export interface Props {
  post: PostType;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function PostHeader({ post }: Props) {
  return (
    <div>
      <div className={styles.postHeader}>
        <Link href={`/blog/${post?.blog.slug}/`}>
          <Image
            src={
              post?.blog.avatar_small
                ? `${BASE_URL}${post?.blog.avatar_small}`
                : "/img/default/avatar_default.jpg"
            }
            width={32}
            height={32}
            className={styles.avatar}
            alt={""}
          />
        </Link>
        <Link
          className={styles.postBlogTitle}
          href={`/blog/${post?.blog.slug}/`}
        >
          {post.blog.title}
        </Link>
      </div>
      <div className={styles.postTitle}>
        <Link
          href={`/blog/${post?.blog.slug}/post/${post.post_id}/`}
          className={styles.postTitleLink}
        >
          {post.title}
        </Link>
      </div>
      <PostHeaderInformation post={post} />
    </div>
  );
}
