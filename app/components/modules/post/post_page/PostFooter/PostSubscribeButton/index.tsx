import React from "react";
import { useAppSelector } from "@/app/store";
import Link from "next/link";

import styles from "@/app/components/modules/post/post_page/post_page.module.css";
import NoUserPopup from "@/app/components/modules/NoUserPopup";

export interface Props {}

export default function PostSubscribeButton({}: Props) {
  const user = useAppSelector((state) => state.django.profile);

  return (
    <div className={styles.subscribeBlock}>
      {/*{!user?.isGuest ? (*/}
      {/*  <>*/}
      {/*    {post?.blog.authors.find(*/}
      {/*      (author) => author.username === user.username,*/}
      {/*    ) ||*/}
      {/*      (user.username === post.blog.owner.username && (*/}
      {/*        <Link*/}
      {/*          href={`/blog/${post?.blog.slug}/post/${post?.post_id}/edit/`}*/}
      {/*        >*/}
      {/*          <button className={styles.editPostButton}>*/}
      {/*            Редактировать публикацию*/}
      {/*          </button>*/}
      {/*        </Link>*/}
      {/*      ))}*/}
      {/*    {!(user.username === post.blog.owner.username) ? (*/}
      {/*      <>*/}
      {/*        {post?.isSubscribed.toString() === "true" ? (*/}
      {/*          <button*/}
      {/*            onClick={toggleBlogSubscription}*/}
      {/*            className={styles.subscribeButton}*/}
      {/*          >*/}
      {/*            Отписаться*/}
      {/*          </button>*/}
      {/*        ) : (*/}
      {/*          <button*/}
      {/*            onClick={toggleBlogSubscription}*/}
      {/*            className={styles.unsubscribeButton}*/}
      {/*          >*/}
      {/*            Подписаться*/}
      {/*          </button>*/}
      {/*        )}*/}
      {/*      </>*/}
      {/*    ) : null}*/}
      {/*  </>*/}
      {/*) : (*/}
      {/*  <>*/}
      {/*    <div ref={subscribeRef}>*/}
      {/*      <button*/}
      {/*        onClick={handleShowSubscribePopup}*/}
      {/*        className={styles.unsubscribeButton}*/}
      {/*      >*/}
      {/*        Подписаться*/}
      {/*      </button>*/}
      {/*      {displaySubscribePopup && (*/}
      {/*        <NoUserPopup*/}
      {/*          title={"Хотите подписаться на этот канал?"}*/}
      {/*          description={"Войдите, чтобы подписаться на этот канал"}*/}
      {/*          redirectTo={`/blog/${slug}/post/${post_id}`}*/}
      {/*        />*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  </>*/}
      {/*)}*/}
    </div>
  );
}
