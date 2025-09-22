import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import PostItem from "@/app/components/modules/post_page";

import { PostType } from "@/app/types";

import styles from "./posts_my.module.css";

export default function PostsMy() {
  const { data: myPostsList } = DjangoService.useGetMyPostsQuery({});

  return (
    <div className={styles.root}>
      <div className={styles.title}>Мои посты</div>
      {myPostsList?.map((post: PostType, index: number) => (
        <PostItem key={index} post={post} />
      ))}
    </div>
  );
}
