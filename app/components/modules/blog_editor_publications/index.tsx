import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useRouter } from "next/router";
import classNames from "classnames";

import PostListTableContent from "./PostListTableContent";
import BatchActionBar from "./BatchActionBar";
import postListMenu from "./POST_LIST_MENU";

import styles from "./BlogEditorPublications.module.css";

export interface Props {
  slug: string;
}

export default function BlogEditorPublications({ slug }: Props) {
  const router = useRouter();
  const [state, setState] = React.useState("published");
  const [sortOrder, setSortOrder] = React.useState<string | null>(null);
  const [columnType, setColumnType] = React.useState<string | null>(null);
  const { data: postList } = DjangoService.useBlogEditorPostsQuery({
    slug,
    state,
    sortOrder,
    columnType,
  });

  const [selectedPosts, setSelectedPosts] = React.useState([]);
  const POST_LIST_MENU = postListMenu(slug);

  const postListHandleChange = React.useCallback(
    (item: any) => {
      if (item.title === "Опубликованные") {
        setState("published");
      } else {
        setState("draft");
      }
    },
    [setState],
  );

  return (
    <div className={styles.root}>
      <div className={styles.title}>Публикации</div>
      <div className={styles.tabsMenu}>
        {POST_LIST_MENU.map((item, index) => (
          <div
            key={index}
            className={classNames(styles.postTabsMenu, {
              [styles.active]:
                `${router.pathname}?state=${state}` === item.pathname,
            })}
          >
            <div onClick={() => postListHandleChange(item)}>{item.title}</div>
            {item.id === 1 ? (
              <div style={{ marginLeft: "10px" }}>
                {postList?.count_of_published_posts}
              </div>
            ) : null}
            {item.id === 2 ? (
              <div style={{ marginLeft: "10px" }}>
                {postList?.const_of_drafted_posts}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {selectedPosts.length !== 0 && (
        <BatchActionBar
          slug={slug}
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
