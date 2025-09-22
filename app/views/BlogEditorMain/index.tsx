import React from "react";
import BlogEditorMain from "@/app/components/modules/blog_editor_main";

interface Props {
  slug: string;
}

export default function BlogEditorMainView({ slug }: Props) {
  return <BlogEditorMain slug={slug} />;
}
