import React from "react";
import BlogEdit from "@/app/components/modules/blog_edit";

interface Props {
  slug: string;
}

export default function BlogEditView({ slug }: Props) {
  return <BlogEdit slug={slug} />;
}
