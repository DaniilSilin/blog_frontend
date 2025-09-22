import React from "react";

import CommunityBatchActionBar from "./CommunityBatchActionBar";
import BlogCommentList from "./BlogCommentList";

import styles from "./blog_editor_community.module.css";

export interface Props {
  slug: string;
}

export default function BlogEditorCommunity({ slug }: Props) {
  const [selectedBlogComments, setSelectedBlogComments] = React.useState([]);

  return (
    <div>
      <div className={styles.title}>Сообщество</div>
      {selectedBlogComments.length !== 0 && (
        <CommunityBatchActionBar
          slug={slug}
          selectedBlogComments={selectedBlogComments}
          setSelectedBlogComments={setSelectedBlogComments}
        />
      )}
      <BlogCommentList
        slug={slug}
        setSelectedBlogComments={setSelectedBlogComments}
        selectedBlogComments={selectedBlogComments}
        isParentComment
      />
    </div>
  );
}
