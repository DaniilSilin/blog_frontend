import React from "react";
import DjangoService from "@/app/store/services/DjangoService";

import { RiDeleteBin5Line } from "react-icons/ri";
import { RxReset } from "react-icons/rx";

import styles from "./batch_action_bar.module.css";

export interface Props {
  slug: string;
  selectedPosts: any;
  setSelectedPosts: any;
}

export default function BatchActionBar({
  slug,
  selectedPosts,
  setSelectedPosts,
}: Props) {
  const [blogDeletePosts] = DjangoService.useBlogDeletePostsMutation();

  const deleteSelectedPosts = () => {
    blogDeletePosts({ slug, selectedPosts });
  };

  const selectedPostsResetHandleChange = React.useCallback(() => {
    setSelectedPosts([]);
  }, [setSelectedPosts]);

  return (
    <div className={styles.root}>
      <div className={styles.selectedCounterTitle}>
        Выбрано {selectedPosts.length} (максимум 100).
      </div>
      <div className={styles.divider}></div>
      <div style={{ display: "flex" }}>
        <div>
          <button
            className={styles.deleteButton}
            onClick={deleteSelectedPosts}
            title={"Удалить выбранные публикации"}
          >
            <RiDeleteBin5Line size={20} />
          </button>
        </div>
        <div>
          <button
            className={styles.resetButton}
            onClick={selectedPostsResetHandleChange}
            title={"Сбросить выбранные публикации"}
          >
            <RxReset size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
