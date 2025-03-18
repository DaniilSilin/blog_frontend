import React from "react";
import PostEdit from "@/app/components/modules/post_edit";

export default function PostEditView({ slug, post_id }) {
  return <PostEdit slug={slug} post_id={post_id} />;
}
