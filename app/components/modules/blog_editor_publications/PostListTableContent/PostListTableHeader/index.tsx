import React from "react";
import { PostType } from "@/app/types";

import PostListTableHeaderDateColumn from "./PostListTableHeaderDateColumn";
import PostListTableHeaderViewsColumn from "./PostListTableHeaderViewsColumn";
import PostListTableHeaderMainCheckbox from "./PostListTableHeaderMainCheckbox";
import PostListTableHeaderCommentsCountColumn from "./PostListTableHeaderCommentsCountColumn";

import styles from "./post_list_table_header.module.css";

export interface Props {
  postList: Record<string, any>;
  selectedPosts: PostType[];
  setSelectedPosts: (value: PostType[]) => void;
  setColumnType: (value: string | null) => void;
  columnType: string | null;
  sortOrder: string | null;
  setSortOrder: (value: string | null) => void;
}

export default function PostListTableHeader({
  postList,
  selectedPosts,
  setSelectedPosts,
  setColumnType,
  columnType,
  sortOrder,
  setSortOrder,
}: Props) {
  return (
    <thead>
      <tr>
        <PostListTableHeaderMainCheckbox
          postList={postList}
          selectedPosts={selectedPosts}
          setSelectedPosts={setSelectedPosts}
        />
        <th className={styles.titleTh}>Публикация</th>
        <PostListTableHeaderDateColumn
          columnType={columnType}
          setColumnType={setColumnType}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <PostListTableHeaderViewsColumn
          columnType={columnType}
          setColumnType={setColumnType}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <PostListTableHeaderCommentsCountColumn
          columnType={columnType}
          setColumnType={setColumnType}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <th className={styles.likedPercent}>% Нравится</th>
      </tr>
    </thead>
  );
}
