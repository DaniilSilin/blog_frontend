import React from "react";
import classNames from "classnames";
import { useRouter } from "next/router";

import styles from "./blog_post_list_menu_bar_item.module.css";

export interface Props {
  menuBarItem: Record<string, any>;
  setCurrentPostListType: (value: string) => void;
  currentPostListType: string;
  postList: Record<string, any>;
  setSelectedPosts: any;
}

export default function BlogPostListMenuBarItem({
  menuBarItem,
  setCurrentPostListType,
  currentPostListType,
  postList,
  setSelectedPosts,
}: Props) {
  const router = useRouter();

  const handleChooseCurrentPostListType = React.useCallback(() => {
    if (menuBarItem.title === "Опубликованные") {
      setCurrentPostListType("published");
    } else {
      setCurrentPostListType("draft");
    }
    setSelectedPosts([]);
  }, [menuBarItem, setCurrentPostListType, setSelectedPosts]);

  return (
    <button
      onClick={handleChooseCurrentPostListType}
      className={classNames(styles.root, {
        [styles.active]:
          `${router.pathname}?state=${currentPostListType}` ===
          menuBarItem.pathname,
      })}
    >
      <div className={styles.rootItems}>
        {menuBarItem.title}
        {menuBarItem.id === 1 ? (
          <div>{postList?.count_of_published_posts}</div>
        ) : null}
        {menuBarItem.id === 2 ? (
          <div>{postList?.const_of_drafted_posts}</div>
        ) : null}
      </div>
    </button>
  );
}
