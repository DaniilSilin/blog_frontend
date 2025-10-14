import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { PostType } from "@/app/types";

import postListMenu from "./POST_LIST_MENU";
import BatchActionBar from "./BatchActionBar";
import PostListTableContent from "./PostListTableContent";
import BlogPostListMenuBarItem from "./BlogPostListMenuBarItem";

import styles from "./BlogEditorPublications.module.css";

export interface Props {
  slug: string;
}

export default function BlogEditorPublications({ slug }: Props) {
  const [currentPostListType, setCurrentPostListType] =
    React.useState<string>("published");
  const [sortOrder, setSortOrder] = React.useState<string | null>(null);
  const [columnType, setColumnType] = React.useState<string | null>(null);
  const [selectedPosts, setSelectedPosts] = React.useState<PostType[]>([]);

  const { data: postList, refetch: refetchBlogPosts } =
    DjangoService.useBlogEditorPostsQuery({
      slug,
      currentPostListType,
      sortOrder,
      columnType,
    });
  const POST_LIST_MENU = postListMenu(slug);

  return (
    <div className={styles.root}>
      <div className={styles.title}>Публикации</div>
      <div className={styles.tabsMenu}>
        {POST_LIST_MENU.map((menuBarItem: Record<string, any>) => (
          <BlogPostListMenuBarItem
            key={menuBarItem.id}
            setSelectedPosts={setSelectedPosts}
            currentPostListType={currentPostListType}
            setCurrentPostListType={setCurrentPostListType}
            postList={postList}
            menuBarItem={menuBarItem}
          />
        ))}
      </div>
      {selectedPosts.length !== 0 && (
        <BatchActionBar
          slug={slug}
          refetchBlogPosts={refetchBlogPosts}
          selectedPosts={selectedPosts}
          setSelectedPosts={setSelectedPosts}
        />
      )}
      <PostListTableContent
        setColumnType={setColumnType}
        columnType={columnType}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        slug={slug}
        setSelectedPosts={setSelectedPosts}
        selectedPosts={selectedPosts}
        postList={postList}
      />
    </div>
  );
}
