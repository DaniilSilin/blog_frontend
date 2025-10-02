import React from "react";
import { BlogType } from "@/app/types";

import BlogHeaderAvatar from "./BlogHeaderAvatar";
import BlogHeaderHeadlineInfo from "./BlogHeaderHeadlineInfo";

export interface Props {
  blog: BlogType;
  slug: string;
}

export default function BlogHeaderInformation({ blog, slug }: Props) {
  return (
    <div style={{ display: "flex" }}>
      <BlogHeaderAvatar blog={blog} />
      <BlogHeaderHeadlineInfo blog={blog} slug={slug} />
    </div>
  );
}
