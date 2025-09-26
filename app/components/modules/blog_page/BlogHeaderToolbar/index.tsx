import React from "react";

import BlogHeaderToolbarItem from "./BlogHeaderToolbarItem";
import blogToolbar from "./constants";

import styles from "./blog_header_toolbar.module.css";

export interface Props {
  slug: string;
}

export default function BlogHeaderToolbar({ slug }: Props) {
  const blogToolbarList = blogToolbar(slug);

  return (
    <div className={styles.root}>
      {blogToolbarList.map((toolbarItemButton: Record<string, any>) => (
        <BlogHeaderToolbarItem
          key={toolbarItemButton.id}
          item={toolbarItemButton}
        />
      ))}
    </div>
  );
}
