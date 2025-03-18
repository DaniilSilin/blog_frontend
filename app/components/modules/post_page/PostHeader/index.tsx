import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { RxDotsHorizontal } from "react-icons/rx";
import Link from "next/link";
import Post from "../../../../types";

import moment from "moment";
import "moment/locale/ru";

import styles from "./post_header.module.css";
import AdditionalMenuList from "./AdditionalMenuList";

export interface Props {
  post: Post;
}

const BASE_URL = "http://localhost:8000";

export default function PostHeader({ post }: Props) {
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const today = Date.now();

  const mouseOverHandler = () => {
    setShowMenu(true);
  };

  const mouseLeaveHandler = () => {
    setShowMenu(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.postHeader}>
        <div className={styles.postHeaderRightPart}>
          <Link href={`/blog/${post?.blog.slug}/`}>
            <img
              className={styles.postBlogAvatar}
              src={`${BASE_URL}${post?.blog.avatar_small}`}
              style={{ borderRadius: "50%" }}
              alt=""
              width="32"
              height="32"
            />
          </Link>
          <Link
            className={styles.postBlogTitle}
            href={`/blog/${post?.blog.slug}/`}
          >
            {post.blog.title}
          </Link>
        </div>
        <div className={styles.postHeaderLeftPart}>
          <RxDotsHorizontal />
          {/*{showMenu && (*/}
          <AdditionalMenuList post={post} />
          {/*)}*/}
        </div>
      </div>
      <div className={styles.postTitle}>
        <Link href={`/blog/${post?.blog.slug}/post/${post.post_id}/`}>
          {post.title}
        </Link>
      </div>
      <div className={styles.postHeaderInfo}>
        <div className={styles.postHeaderDate}>
          {moment(post.created_at).diff(today, "days") < 26
            ? moment(post.created_at).format("DD MMMM YYYY hh:mm")
            : moment(post.created_at).fromNow()}
        </div>
        <div className={styles.postHeaderDelimiter}>·</div>
        <div className={styles.postHeaderAuthor}>
          <Link href={`/profile/${post?.author.username}/`}>
            {post?.author.username}
          </Link>
        </div>
      </div>
    </div>
  );
}
