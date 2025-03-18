import React from "react";
import CommentCreate from "@/app/components/modules/comment_create";

export default function CommentCreateView({ post_id, slug }) {
  return <CommentCreate post_id={post_id} slug={slug} />;
}
