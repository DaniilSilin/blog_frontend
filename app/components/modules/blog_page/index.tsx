import React from "react";
import DjangoService from "@/app/store/services/DjangoService";

import BlogHeaderToolbar from "./BlogHeaderToolbar";
import BlogHeaderContainer from "./BlogHeaderContainer";

import styles from "./blog_page.module.css";

export interface Props {
  children: React.ReactNode;
  slug: string;
}

export default function BlogItem({ slug, children }: Props) {
  const { data: blog } = DjangoService.useGetBlogQuery({ slug });

  return (
    <div>
      <BlogHeaderContainer blog={blog} slug={slug} />
      <BlogHeaderToolbar slug={slug} />
      {/*<div className={styles.divider}></div>*/}
      {children}
    </div>
  );
}
