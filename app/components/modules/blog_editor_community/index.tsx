import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { Comment } from "../../../types";
import CommentList from "./CommentList";

import styles from "./blog_editor_community.module.css";

export default function BlogEditorCommunity({ slug }) {
  const [page, setPage] = React.useState(1);
  const { data: blogCommentList, isFetching } =
    DjangoService.useBlogCommentsQuery({ slug, page });
  const [selectedBlogComments, setSelectedBlogComments] = React.useState([]);
  const [blogCommentListDelete] =
    DjangoService.useBlogCommentListDeleteMutation();

  React.useEffect(() => {
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
  }, [page, isFetching]);

  const blogCommentListDeleteButton = () => {
    blogCommentListDelete({ slug: slug, comment_list: selectedBlogComments });
  };

  const resetSelectedBlogCommentsHandleChange = React.useCallback(() => {
    setSelectedBlogComments([]);
  }, [setSelectedBlogComments]);

  return (
    <div>
      <div className={styles.title}>Сообщество</div>
      {selectedBlogComments.length !== 0 && (
        <div style={{ height: "48px" }}>
          Выбрано {selectedBlogComments.length} (максимум 100)
          <div onClick={blogCommentListDeleteButton}>Удалить</div>
          <div onClick={resetSelectedBlogCommentsHandleChange}>Reset</div>
        </div>
      )}
      <div>
        {blogCommentList?.results.map((comment: Comment, index: number) => (
          <CommentList
            key={index}
            comment={comment}
            slug={slug}
            setSelectedBlogComments={setSelectedBlogComments}
            selectedBlogComments={selectedBlogComments}
          />
        ))}
      </div>
    </div>
  );
}
