import React from "react";

import { PostType } from "@/app/types";

import PostHeaderInformation from "./PostHeaderInformation";
import PostHeaderBlogInformation from "./PostHeaderBlogInformation";

export interface Props {
  post: PostType;
}

export default function PostHeader({ post }: Props) {
  return (
    <div>
      <PostHeaderBlogInformation post={post} />
      <PostHeaderInformation post={post} />
    </div>
  );
}
