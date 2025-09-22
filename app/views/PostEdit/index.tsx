import React from "react";
import PostEdit from "@/app/components/modules/post_edit";

interface Props {
  slug: string;
  post_id: number;
}

export default function PostEditView({ slug, post_id }: Props) {
  return <PostEdit slug={slug} post_id={post_id} />;
}
