import React from "react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/ru";

import { PostType } from "@/app/types";

import PostInputCheckbox from "@/app/components/modules/blog_editor_publications/PostInputCheckbox";
import LikesSection from "@/app/components/modules/blog_editor_publications/PostListTableContent/PostListTableBody/LikesSection";

export interface Props {
  slug: string;
  setSelectedPosts: any;
  selectedPosts: any;
  postList: any;
}

export default function PostListTableBody({
  slug,
  postList,
  setSelectedPosts,
  selectedPosts,
}: Props) {
  const handleChangeCheckbox = React.useCallback(
    (checked: boolean, post: PostType) => {
      if (checked) {
        setSelectedPosts([...selectedPosts, post]);
      } else {
        setSelectedPosts(
          selectedPosts.filter((item: any) => item.post_id !== post.post_id),
        );
      }
    },
    [setSelectedPosts, selectedPosts],
  );

  return (
    <tbody>
      {postList?.results.map((post: PostType, index: number) => (
        <tr key={index}>
          <td>
            <PostInputCheckbox
              onChange={handleChangeCheckbox}
              checked={selectedPosts.find(
                (item: any) => item.post_id === post.post_id,
              )}
              post={post}
            />
          </td>
          <td>
            <Link href={`/blog/${slug}/post/${post.post_id}/`}>
              {post.title}
            </Link>
          </td>
          <td>{moment(post.created_at).format("D MMM YYYY")}</td>
          <td style={{ textAlign: "end" }}>{post.views}</td>
          <td style={{ textAlign: "end" }}>{post.comments}</td>
          <td>
            <LikesSection post={post} />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
