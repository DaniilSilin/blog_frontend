import React from "react";
import CommentCreate from "@/app/components/modules/comment_create";

interface Props {
  slug: string;
  post_id: number;
}

export default function CommentCreateView({ post_id, slug }: Props) {
  return <CommentCreate post_id={post_id} slug={slug} />;
}
