import React from "react";
import { PostType } from "@/app/types";

import PostListItemTableBody from "./PostListItemTableBody";

export interface Props {
  slug: string;
  setSelectedPosts: (value: PostType[]) => void;
  selectedPosts: PostType[];
  postList: Record<string, any>;
}

export default function PostListTableBody({
  slug,
  postList,
  setSelectedPosts,
  selectedPosts,
}: Props) {
  return (
    <tbody>
      {!!postList?.count ? (
        <>
          {postList?.results.map((post: PostType) => (
            <PostListItemTableBody
              key={post.id}
              slug={slug}
              post={post}
              setSelectedPosts={setSelectedPosts}
              selectedPosts={selectedPosts}
            />
          ))}
        </>
      ) : (
        <tr>
          <td>Нет данных</td>
        </tr>
      )}
    </tbody>
  );
}
