import React from "react";
import DjangoService from "@/app/store/services/DjangoService";

import { PostType } from "@/app/types";
import PostItem from "@/app/components/modules/post_page";

import styles from "./posts_search.module.css";

interface Props {
  hashtag: string;
}

export default function PostsSearch({ hashtag }: Props) {
  const [page, setPage] = React.useState(1);
  const { data: postList, isFetching } = DjangoService.usePostsSearchQuery({
    hashtag,
    page,
  });

  React.useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        if (postList.next != null) {
          setPage(page + 1);
        } else {
          return;
        }
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [page, isFetching]);

  return (
    <div>
      <h1 className={styles.hashtagTitle}>#{hashtag}</h1>
      <div className={styles.infoContainer}>
        <div>{postList?.count_of_posts} публикаций</div>
        <div className={styles.divider}>•</div>
        <div>{postList?.count_of_blogs} блогов</div>
      </div>
      {postList?.results.map((post: PostType, index: number) => (
        <PostItem key={index} post={post} />
      ))}
    </div>
  );
}
