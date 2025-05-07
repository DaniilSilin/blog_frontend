import React from "react";
import DjangoService from "@/app/store/services/DjangoService";

import { RiDeleteBin5Line } from "react-icons/ri";
import { RxReset } from "react-icons/rx";

import styles from "./community_batch_action_bar.module.css";

export interface Props {
  slug: string;
  selectedBlogComments: any;
  setSelectedBlogComments: any;
}

export default function CommunityBatchActionBar({
  slug,
  selectedBlogComments,
  setSelectedBlogComments,
}: Props) {
  const [blogCommentListDelete] =
    DjangoService.useBlogCommentListDeleteMutation();

  const blogCommentListDeleteButton = () => {
    blogCommentListDelete({ slug, comment_list: selectedBlogComments });
  };
  console.log(selectedBlogComments);

  const resetSelectedBlogCommentsHandleChange = () => {
    setSelectedBlogComments([]);
  };

  return (
    <div className={styles.root}>
      <div className={styles.selectedCommentsCounterTitle}>
        Выбрано {selectedBlogComments.length} (максимум 100).
      </div>
      <div className={styles.divider}></div>
      <div style={{ display: "flex" }}>
        <div>
          <button
            className={styles.deleteButton}
            onClick={blogCommentListDeleteButton}
            title={"Удалить выбранные комментарии"}
          >
            <RiDeleteBin5Line size={20} />
          </button>
        </div>
        <div>
          <button
            className={styles.resetButton}
            onClick={resetSelectedBlogCommentsHandleChange}
            title={"Сбросить выбранные комментарии"}
          >
            <RxReset size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
