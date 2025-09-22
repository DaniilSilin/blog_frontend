import React from "react";
import BlogEditorCommunity from "@/app/components/modules/blog_editor_community";

interface Props {
  slug: string;
}

export default function BlogEditorCommunityView({ slug }: Props) {
  return <BlogEditorCommunity slug={slug} />;
}
