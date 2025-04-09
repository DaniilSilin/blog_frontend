import React from "react";
import Blog from "../../../types";
import moment from "moment";
import "moment/locale/ru";
import Link from "next/link";
import Image from "next/image";
import IsBlogOwner from "@/app/components/modules/blog_item/IsBlogOwner";
import NoUserPopup from "@/app/components/modules/NoUserPopup";

import styles from "./blog_item.module.css";
import { useAppSelector } from "@/app/store";
import DjangoService from "@/app/store/services/DjangoService";

export interface Props {
  blog: Blog;
  refetchBlogList: any;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function BlogItem({ blog, refetchBlogList }: Props) {
  const user = useAppSelector((state) => state.django.profile);

  const [blogSubscription] = DjangoService.useBlogSubscriptionMutation();

  const blogSubscriptionFunction = () => {
    blogSubscription({ slug: blog?.slug });
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
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
            <div style={{ display: "flex" }}>
              <Link className={styles.blogTitle} href={`/blog/${blog.slug}/`}>
                <div>{blog?.title}</div>
              </Link>
              {blog.isBlogAuthor?.toString() === "true" && (
                <div
                  style={{
                    fontSize: "13px",
                    justifyContent: "center",
                    marginLeft: "5px",
                    marginTop: "5px",
                  }}
                >
                  * Являетесь автором
                </div>
              )}
            </div>
            <div>{blog?.subscriberList} подписчиков</div>
          </div>
        </div>
        <div>
          <div>
            {blog?.isSubscribed.toString() === "true" ? (
              <div
                className={styles.unsubscribeButton}
                onClick={blogSubscriptionFunction}
              >
                Отписаться
              </div>
            ) : (
              <div
                className={styles.subscribeButton}
                onClick={blogSubscriptionFunction}
              >
                Подписаться
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.blogInformationContainer}>
        {blog?.description && (
          <div>
            <div className={styles.descriptionTitle}>Описание:</div>
            <div className={styles.descriptionContent}>{blog?.description}</div>
          </div>
        )}
        <div>
          <div className={styles.dateTitle}>Последнее обновление:</div>
          <div className={styles.dateData}>
            {moment(blog?.updated_at).format("D MMMM YYYY hh:mm")}
          </div>
        </div>
        <div className={styles.blogStatsContainer}>
          <div className={styles.countOfPostsStatContainer}>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              {blog?.count_of_posts}
            </div>
            <div
              style={{ fontSize: "14px", color: "#7A9199", marginTop: "3.5px" }}
            >
              &nbsp;Постов
            </div>
          </div>
          <div className={styles.commentsStatContainer}>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              {blog?.count_of_commentaries}
            </div>
            <div
              style={{ fontSize: "14px", color: "#7A9199", marginTop: "3.5px" }}
            >
              &nbsp;Комментариев
            </div>
          </div>
          <div className={styles.viewsStatContainer}>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              {blog?.views}
            </div>
            <div
              style={{ fontSize: "14px", color: "#7A9199", marginTop: "3.5px" }}
            >
              &nbsp;Просмотров
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
