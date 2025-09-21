import React from "react";
import { useAppSelector } from "@/app/store";
import DjangoService from "@/app/store/services/DjangoService";
import Link from "next/link";
import Image from "next/image";
import { BlogType } from "@/app/types";

import styles from "./blog_item_header.module.css";

const BASE_URL = "http://127.0.0.1:8000";

export interface Props {
  blog: BlogType;
}

export default function BlogItemHeader({ blog }: Props) {
  const user = useAppSelector((state) => state.django.profile);
  const [blogSubscription] = DjangoService.useBlogSubscriptionMutation();

  const blogSubscriptionFunction = React.useCallback(() => {
    blogSubscription({ slug: blog?.slug });
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.subHeader}>
        <Link href={`/blog/${blog.slug}/`}>
          <Image
            className={styles.blogAvatar}
            src={
              blog?.avatar_small
                ? `${BASE_URL}${blog?.avatar_small}`
                : "/img/default/avatar_default.jpg"
            }
            alt=""
            width={50}
            height={50}
          />
        </Link>
        <div>
          <div className={styles.titleContainer}>
            <Link className={styles.blogTitle} href={`/blog/${blog.slug}/`}>
              {blog?.title}
            </Link>
            {blog.isBlogAuthor?.toString() === "true" && (
              <div className={styles.blogOwnerNotification}>
                * Являетесь автором
              </div>
            )}
          </div>
          <div className={styles.blogSubscribersCountTitle}>
            {blog?.subscriberList} подписчиков
          </div>
        </div>
      </div>
      {blog.owner.username == user.username && (
        <div>
          {blog?.isSubscribed.toString() === "true" ? (
            <button
              className={styles.unsubscribeButton}
              onClick={blogSubscriptionFunction}
            >
              Отписаться
            </button>
          ) : (
            <button
              className={styles.subscribeButton}
              onClick={blogSubscriptionFunction}
            >
              Подписаться
            </button>
          )}
        </div>
      )}
    </div>
  );
}
