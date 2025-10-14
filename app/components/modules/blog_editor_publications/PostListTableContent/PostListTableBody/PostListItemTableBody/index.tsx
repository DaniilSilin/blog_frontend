import React from "react";
import Link from "next/link";
import moment from "moment/moment";
import { PostType } from "@/app/types";

import PostInputCheckbox from "./PostInputCheckbox";
import LikesSection from "./LikesSection";

export interface Props {
  slug: string;
  post: PostType;
  selectedPosts: PostType[];
  setSelectedPosts: (value: PostType[]) => void;
}

export default function PostListItemTableBody({
  post,
  slug,
  selectedPosts,
  setSelectedPosts,
}: Props) {
  const handleChangeCheckbox = React.useCallback(
    (checked: boolean, post: PostType) => {
      if (checked) {
        setSelectedPosts([...selectedPosts, post]);
      } else {
        setSelectedPosts(
          selectedPosts.filter(
            (selectedPost: PostType) => selectedPost.post_id !== post.post_id,
          ),
        );
      }
    },
    [setSelectedPosts, selectedPosts],
  );

  return (
    <tr>
      <td>
        <PostInputCheckbox
          onChange={handleChangeCheckbox}
          checked={selectedPosts.some(
            (selectedPost: PostType) => selectedPost.post_id === post.post_id,
          )}
          post={post}
        />
      </td>
      <td>
        <Link href={`/blog/${slug}/post/${post.post_id}/`}>{post.title}</Link>
      </td>
      <td>{moment(post.created_at).format("D MMM YYYY")}</td>
      <td style={{ textAlign: "end" }}>{post.views}</td>
      <td style={{ textAlign: "end" }}>{post.comments}</td>
      <td>
        <LikesSection post={post} />
      </td>
    </tr>
  );
}
