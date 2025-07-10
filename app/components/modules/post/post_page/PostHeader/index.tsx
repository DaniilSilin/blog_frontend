import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ru";

import { PostType } from "@/app/types";
import NoUserPopup from "@/app/components/modules/NoUserPopup";

import styles from "@/app/components/modules/post/post_page/post_page.module.css";

const BASE_URL = "http://127.0.0.1:8000";

export interface Props {
  post: PostType;
  slug: string;
  post_id: number;
}

export default function PostHeader({ post, slug, post_id }: Props) {
  const user = useAppSelector((state) => state.django.profile);
  const [blogSubscription] = DjangoService.useBlogSubscriptionMutation();

  const subscribersCount = React.useMemo(() => {
    const subscribers = post?.subscribers.toString() || "0";

    if (subscribers.slice(-1) === "1" && subscribers.slice(-2) !== "11") {
      return `${subscribers} подписчик`;
    } else if (
      (subscribers.slice(-1) === "2" ||
        subscribers.slice(-1) === "3" ||
        subscribers.slice(-1) === "4") &&
      subscribers.slice(-2) !== "12" &&
      subscribers.slice(-2) !== "13" &&
      subscribers.slice(-2) !== "14"
    ) {
      return `${subscribers} подписчика`;
    } else {
      return `${subscribers} подписчиков`;
    }
  }, [post?.subscribers]);

  const viewsCount = React.useMemo(() => {
    const views = post?.views.toString() || "0";

    if (views.slice(-1) === "1" && views.slice(-2) !== "11") {
      return `${views} просмотр`;
    } else if (
      (views.slice(-1) === "2" ||
        views.slice(-1) === "3" ||
        views.slice(-1) === "4") &&
      views.slice(-2) !== "12" &&
      views.slice(-2) !== "13" &&
      views.slice(-2) !== "14"
    ) {
      return `${views} просмотра`;
    } else {
      return `${views} просмотров`;
    }
  }, [post?.subscribers]);

  const toggleBlogSubscription = async () => {
    const result = await blogSubscription({ slug });
    if (!result.error && result.data.status !== "unsuccessful") {
      refetchPost();
    }
  };

  return (
    <div>
      <div className={styles.contentPublishedInformationBlock}>
        <div className={styles.postHeaderInformation}>
          <Link href={`/blog/${slug}/`}>
            <Image
              src={
                post?.blog.avatar_small
                  ? `${BASE_URL}${post?.blog.avatar_small}`
                  : "/img/default/avatar_default.jpg"
              }
              className={styles.blogAvatar}
              alt={""}
              width={60}
              height={60}
            />
          </Link>
          <div className={styles.contentPublisher}>
            <Link href={`/blog/${slug}/`}>
              <div className={styles.channelName} title={`${post?.blog.title}`}>
                {post?.blog.title}
              </div>
            </Link>
            <div>{subscribersCount}</div>
          </div>
        </div>
        <div className={styles.subscribeBlock}>
          {!user?.isGuest ? (
            <>
              {post?.blog.authors.find(
                (author) => author.username === user.username,
              ) ||
                (user.username === post.blog.owner.username && (
                  <Link
                    href={`/blog/${post?.blog.slug}/post/${post?.post_id}/edit/`}
                  >
                    <button className={styles.editPostButton}>
                      Редактировать публикацию
                    </button>
                  </Link>
                ))}
              {!(user.username === post.blog.owner.username) ? (
                <>
                  {post?.isSubscribed.toString() === "true" ? (
                    <button
                      onClick={toggleBlogSubscription}
                      className={styles.subscribeButton}
                    >
                      Отписаться
                    </button>
                  ) : (
                    <button
                      onClick={toggleBlogSubscription}
                      className={styles.unsubscribeButton}
                    >
                      Подписаться
                    </button>
                  )}
                </>
              ) : null}
            </>
          ) : (
            <>
              {/*<div ref={subscribeRef}>*/}
              {/*  <button*/}
              {/*    onClick={handleShowSubscribePopup}*/}
              {/*    className={styles.unsubscribeButton}*/}
              {/*  >*/}
              {/*    Подписаться*/}
              {/*  </button>*/}
              {/*  {displaySubscribePopup && (*/}
              {/*    <NoUserPopup*/}
              {/*      title={"Хотите подписаться на этот канал?"}*/}
              {/*      description={"Войдите, чтобы подписаться на этот канал"}*/}
              {/*      redirectTo={`/blog/${slug}/post/${post_id}`}*/}
              {/*    />*/}
              {/*  )}*/}
              {/*</div>*/}
            </>
          )}
        </div>
      </div>
      <div>
        <div className={styles.postTitle} title={`${post?.title}`}>
          {post?.title}
        </div>
        <div className={styles.postInformation}>
          {post?.author_is_hidden.toString() === "false" ? (
            <>
              <Link href={`/profile/${post?.author.username}/`}>
                <div>{post?.author.username}</div>
              </Link>
              <div className={styles.delimiter}>·</div>
            </>
          ) : null}
          <div>{moment(post?.created_at).format("D MMMM hh:mm")}</div>
          <div className={styles.delimiter}>·</div>
          <div>{viewsCount}</div>
        </div>
      </div>
    </div>
  );
}
