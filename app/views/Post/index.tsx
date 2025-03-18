import React from "react";
import PostPage from "@/app/components/modules/post/post_page";

export default function PostView({ slug, post_id }) {
  return <PostPage slug={slug} post_id={post_id} />;
}
