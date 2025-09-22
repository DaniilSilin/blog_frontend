import React from "react";
import PostPage from "@/app/components/modules/post/post_page";

interface Props {
  slug: string;
  post_id: number;
}

export default function PostView({ slug, post_id }: Props) {
  return <PostPage slug={slug} post_id={post_id} />;
}
