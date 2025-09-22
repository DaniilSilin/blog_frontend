import React from "react";
import BlogEditorPublications from "@/app/components/modules/blog_editor_publications";

interface Props {
  slug: string;
}

export default function BlogEditorPublicationsView({ slug }: Props) {
  return <BlogEditorPublications slug={slug} />;
}
