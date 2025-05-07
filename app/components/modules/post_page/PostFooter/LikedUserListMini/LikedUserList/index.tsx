import React from "react";
import DjangoService from "@/app/store/services/DjangoService";

import { PostType } from "@/app/types";
import LikedUser from "./LikedUser";

import styles from "./liked_user_list.module.css";

export interface Props {
  post: PostType;
}

export default function LikedUserList({ post }: Props) {
  const [page, setPage] = React.useState(1);
  const { data: likedUserList, isFetching } =
    DjangoService.useLikedUserListQuery({
      slug: post?.blog.slug,
      post_id: post.post_id,
      page,
    });

  React.useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        if (likedUserList.next != null) {
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
    <div className={"modalContentUserList"}>
      <div>
        <div style={{ padding: "15px 30px 0 30px", fontSize: "22px" }}>
          Оценили {post.likes}
        </div>
        <div className={styles.userListContainer}>
          {likedUserList?.results.map((user: any, index: number) => (
            <LikedUser key={index} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
