import React from "react";
import PostCreate from "@/app/components/modules/post_create";

interface Props {
  slug: string;
}

export default function PostCreateView({ slug }: Props) {
  return <PostCreate slug={slug} />;
}
