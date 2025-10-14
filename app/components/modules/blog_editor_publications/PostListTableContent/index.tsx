import React from "react";

import { PostType } from "@/app/types";
import PostListTableHeader from "./PostListTableHeader";
import PostListTableBody from "./PostListTableBody";

import styles from "./post_list_table_content.module.css";

export interface Props {
  setColumnType: (value: string | null) => void;
  columnType: string | null;
  sortOrder: string | null;
  setSortOrder: (value: string | null) => void;
  slug: string;
  setSelectedPosts: (value: PostType[]) => void;
  selectedPosts: PostType[];
  postList: Record<string, any>;
}

export default function PostListTableContent({
  setColumnType,
  columnType,
  sortOrder,
  setSortOrder,
  slug,
  setSelectedPosts,
  selectedPosts,
  postList,
}: Props) {
  return (
    <table cellPadding={10} className={styles.root}>
      <PostListTableHeader
        postList={postList}
        selectedPosts={selectedPosts}
        setSelectedPosts={setSelectedPosts}
        setColumnType={setColumnType}
        columnType={columnType}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <PostListTableBody
        slug={slug}
        postList={postList}
        setSelectedPosts={setSelectedPosts}
        selectedPosts={selectedPosts}
      />
    </table>
  );
}
