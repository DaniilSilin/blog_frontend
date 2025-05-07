import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import "moment/locale/ru";

import { PostType } from "@/app/types";
import { RxDotsHorizontal } from "react-icons/rx";
import AdditionalMenuList from "./AdditionalMenuList";

import styles from "./post_header.module.css";

export interface Props {
  post: PostType;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function PostHeader({ post }: Props) {
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const today = Date.now();

  const mouseOverHandler = () => {
    setShowMenu(true);
  };

  const mouseLeaveHandler = () => {
    setShowMenu(false);
  };

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

  return (
    <div className={styles.root}>
      <div className={styles.postHeader}>
        <div className={styles.postHeaderRightPart}>
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
        <div
          onMouseOver={mouseOverHandler}
          onMouseLeave={mouseLeaveHandler}
          className={styles.postHeaderLeftPart}
        >
          <RxDotsHorizontal />
          {showMenu && (
            <AdditionalMenuList post={post} setShowMenu={setShowMenu} />
          )}
        </div>
      </div>
      <div className={styles.postTitle}>
        <Link href={`/blog/${post?.blog.slug}/post/${post.post_id}/`}>
          {post.title}
        </Link>
      </div>
      <div className={styles.postHeaderInfo}>
        {!post?.author_is_hidden && (
          <>
            <div className={styles.postHeaderAuthor}>
              <Link href={`/profile/${post?.author.username}/`}>
                {post?.author.username}
              </Link>
            </div>
            <div className={styles.postHeaderDelimiter}>·</div>
          </>
        )}
        <div className={styles.postHeaderDate}>
          {moment(post.created_at).diff(today, "days") < 26
            ? moment(post.created_at).format("DD MMMM YYYY hh:mm")
            : moment(post.created_at).fromNow()}
        </div>
        <div className={styles.postHeaderDelimiter}>·</div>
        <div className={styles.postHeaderViews}>{countOfViewsTitle}</div>
      </div>
    </div>
  );
}
