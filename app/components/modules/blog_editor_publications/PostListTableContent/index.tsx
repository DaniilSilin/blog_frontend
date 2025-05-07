import React from "react";

import PostListTableHeader from "./PostListTableHeader";
import PostListTableBody from "./PostListTableBody";

export interface Props {
  setColumnType: any;
  columnType: any;
  sortOrder: any;
  setSortOrder: any;
  slug: string;
  setSelectedPosts: any;
  selectedPosts: any;
  postList: any;
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
    <table cellPadding={10}>
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
