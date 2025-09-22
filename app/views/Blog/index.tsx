import React from "react";
import BlogMain from "@/app/components/modules/blog_main";

interface Props {
  slug: string;
}

export default function BlogView({ slug }: Props) {
  return <BlogMain slug={slug} />;
}
