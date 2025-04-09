import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { Comment as CommentType } from "@/app/types";

import BlogComment from "../CommentList";

import styles from "./blog_comment_list.module.css";

export interface Props {
  slug: string;
  setSelectedBlogComments: any;
  selectedBlogComments: Record<string, any>;
  isParentComment?: boolean;
  comment_id?: number;
}

export default function BlogCommentList({
  slug,
  setSelectedBlogComments,
  selectedBlogComments,
  isParentComment,
  comment_id,
}: Props) {
  const [page, setPage] = React.useState(1);

  const { data: blogCommentList, isFetching } =
    DjangoService.useBlogCommentsQuery({
      slug,
      parent_id: comment_id,
      page,
    });

  React.useEffect(() => {
    if (isParentComment) {
      const onScroll = () => {
        const scrolledToBottom =
          window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if (scrolledToBottom && !isFetching) {
          if (blogCommentList.next != null) {
            setPage(page + 1);
          } else {
            return;
          }
        }
      };
      document.addEventListener("scroll", onScroll);
      return () => document.removeEventListener("scroll", onScroll);
    }
  }, [page, isFetching]);

  const loadMoreReplies = React.useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  return (
    <div>
      {blogCommentList?.results.map((comment: CommentType, index: number) => (
        <BlogComment
          key={index}
          comment={comment}
          slug={slug}
          setSelectedBlogComments={setSelectedBlogComments}
          selectedBlogComments={selectedBlogComments}
          isParentComment={isParentComment}
        />
      ))}
      <div className={styles.loadMoreContainer}>
        {!!blogCommentList?.next && !isParentComment && (
          <button className={styles.showMoreReplies} onClick={loadMoreReplies}>
            Другие ответы
          </button>
        )}
      </div>
    </div>
  );
}
