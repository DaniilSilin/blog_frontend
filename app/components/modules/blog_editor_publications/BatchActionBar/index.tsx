import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { PostType } from "@/app/types";

import { RiDeleteBin5Line } from "react-icons/ri";
import { RxReset } from "react-icons/rx";

import styles from "./batch_action_bar.module.css";

export interface Props {
  slug: string;
  selectedPosts: PostType[];
  setSelectedPosts: (value: PostType[]) => void;
  refetchBlogPosts: () => void;
}

export default function BatchActionBar({
  slug,
  selectedPosts,
  setSelectedPosts,
  refetchBlogPosts,
}: Props) {
  const [blogDeletePosts] = DjangoService.useBlogDeletePostsMutation();

  const deleteSelectedPosts = React.useCallback(async () => {
    const filteredPosts = selectedPosts.map((post: PostType) => ({
      post_id: post.post_id,
    }));
    const result = await blogDeletePosts({
      slug,
      selectedPosts: filteredPosts,
    });
    // @ts-ignore
    if (!result.error) {
      setSelectedPosts([]);
      refetchBlogPosts();
    }
  }, [selectedPosts]);

  const selectedPostsResetHandleChange = React.useCallback(() => {
    setSelectedPosts([]);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.selectedCounterTitle}>
        Выбрано {selectedPosts.length} (максимум 100).
      </div>
      <div className={styles.divider}></div>
      <div className={styles.actionBarButtons}>
        <button
          className={styles.deleteButton}
          onClick={deleteSelectedPosts}
          title={"Удалить выбранные публикации"}
        >
          <RiDeleteBin5Line size={20} />
        </button>
        <button
          className={styles.resetButton}
          onClick={selectedPostsResetHandleChange}
          title={"Сбросить выбранные публикации"}
        >
          <RxReset size={20} />
        </button>
      </div>
    </div>
  );
}
