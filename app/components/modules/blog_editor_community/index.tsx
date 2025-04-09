import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { Comment } from "../../../types";

import BlogCommentList from "@/app/components/modules/blog_editor_community/BlogCommentList";

import styles from "./blog_editor_community.module.css";

export default function BlogEditorCommunity({ slug }) {
  const [selectedBlogComments, setSelectedBlogComments] = React.useState([]);
  const [blogCommentListDelete] =
    DjangoService.useBlogCommentListDeleteMutation();

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
          <div onClick={resetSelectedBlogCommentsHandleChange}>Сбросить</div>
        </div>
      )}
      <div>
        <BlogCommentList
          slug={slug}
          setSelectedBlogComments={setSelectedBlogComments}
          selectedBlogComments={selectedBlogComments}
          isParentComment={true}
        />
      </div>
    </div>
  );
}
