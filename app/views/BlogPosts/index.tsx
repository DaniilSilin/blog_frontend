import React from "react";
import BlogPosts from "@/app/components/modules/blog_posts";

interface Props {
  slug: string;
}

export default function BlogPostsView({ slug }: Props) {
  return <BlogPosts slug={slug} />;
}
