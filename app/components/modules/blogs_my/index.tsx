import React from "react";
import { useAppSelector } from "@/app/store";
import DjangoService from "@/app/store/services/DjangoService";

import { BlogType } from "@/app/types";

import OwnerBlogList from "@/app/components/modules/blogs_my/OwnerBlogList";

import styles from "./blogs_my.module.css";

export default function BlogsMy() {
  const blogRef = React.useRef(null);
  const user = useAppSelector((state) => state.django.profile);
  const { data: blogsWhereUserIsOwner } =
    DjangoService.useBlogsWhereUserIsOwnerQuery({ username: user?.username });
  const { data: blogsWhereUserIsAuthor } =
    DjangoService.useBlogsWhereUserIsAuthorQuery({ username: user?.username });

  return (
    <div>
      <div>
        <div className={styles.title}>Блоги, созданные Вами:</div>
        {blogsWhereUserIsOwner?.count === 0 ? (
          <div style={{ fontSize: "16px" }}>
            Вы не являетесь создателем какого-либо блога
          </div>
        ) : (
          <div className={styles.blogContainer}>
            {blogsWhereUserIsOwner?.results.map(
              (blog: BlogType, index: number) => (
                <OwnerBlogList key={index} blog={blog} ref={blogRef} owner />
              ),
            )}
          </div>
        )}
      </div>
      <div>
        <div className={styles.title}>Блоги, где Вы являетесь автором:</div>
        {blogsWhereUserIsAuthor?.count === 0 ? (
          <div style={{ fontSize: "16px" }}>
            Вы не являетесь автором какого-либо блога
          </div>
        ) : (
          <div className={styles.blogContainer}>
            {blogsWhereUserIsAuthor?.results.map(
              (blog: BlogType, index: number) => (
                <OwnerBlogList key={index} blog={blog} ref={blogRef} />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
