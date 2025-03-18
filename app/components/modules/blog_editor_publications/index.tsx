import React, { ChangeEvent } from "react";
import DjangoService from "@/app/store/services/DjangoService";
import Link from "next/link";
import moment from "moment";
import "moment/locale/ru";
import classNames from "classnames";
import { useRouter } from "next/router";

import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";

import postListMenu from "./POST_LIST_MENU";
import PostInputCheckbox from "./PostInputCheckbox";

import styles from "./BlogEditorPublications.module.css";

export default function BlogEditorPublications({ slug }) {
  const router = useRouter();
  const [state, setState] = React.useState("published");
  const [sortOrder, setSortOrder] = React.useState<string | null>(null);
  const [columnType, setColumnType] = React.useState<string | null>(null);
  const { data } = DjangoService.useBlogEditorPostsQuery({
    slug: slug,
    state: state,
    sortOrder: sortOrder,
    columnType: columnType,
  });

  const [selectedPosts, setSelectedPosts] = React.useState([]);

  const POST_LIST_MENU = postListMenu(slug);

  const dateColumnHandleChange = React.useCallback(() => {
    if (columnType !== "date") {
      setColumnType("date");
    } else {
      if (sortOrder === "ascending") {
        setSortOrder("descending");
      } else {
        setSortOrder("ascending");
      }
    }
  }, [columnType, sortOrder, setColumnType, setSortOrder]);

  const viewsColumnHandleChange = React.useCallback(() => {
    if (columnType !== "views") {
      setColumnType("views");
    } else {
      if (sortOrder === "ascending") {
        setSortOrder("descending");
      } else {
        setSortOrder("ascending");
      }
    }
  }, [columnType, sortOrder, setColumnType, setSortOrder]);

  const commentsColumnHandleChange = React.useCallback(() => {
    if (columnType !== "comments") {
      setColumnType("comments");
    } else {
      if (sortOrder === "ascending") {
        setSortOrder("descending");
      } else {
        setSortOrder("ascending");
      }
    }
  }, [columnType, sortOrder, setColumnType, setSortOrder]);

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

  const handleChangeCheckbox = React.useCallback(
    (checked: boolean, post: any) => {
      if (checked) {
        setSelectedPosts([...selectedPosts, post]);
      } else {
        setSelectedPosts(
          selectedPosts.filter((item) => item.post_id !== post.post_id),
        );
      }
    },
    [setSelectedPosts, selectedPosts],
  );

  const selectedPostsResetHandleChange = React.useCallback(() => {
    setSelectedPosts([]);
  }, [setSelectedPosts]);

  console.log(selectedPosts);

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
                {data?.count_of_published_posts}
              </div>
            ) : null}
            {item.id === 2 ? (
              <div style={{ marginLeft: "10px" }}>
                {data?.const_of_drafted_posts}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        {selectedPosts.length !== 0 && (
          <>
            <div>Выбрано {selectedPosts.length} публикаций</div>
            <div>Удалить</div>
            <div onClick={selectedPostsResetHandleChange}>Reset</div>
          </>
        )}
      </div>
      <div>
        <table cellPadding={10}>
          <thead>
            <tr>
              <th></th>
              <th>Публикация</th>
              <th
                className={classNames(styles.dateTh, {
                  [styles.active]: columnType === "date",
                })}
                onClick={dateColumnHandleChange}
              >
                {columnType === "date" ? (
                  <>
                    Дата
                    {sortOrder === "descending" && (
                      <FaArrowUpLong className={styles.arrow} />
                    )}
                    {sortOrder === "ascending" && (
                      <FaArrowDownLong className={styles.arrow} />
                    )}
                  </>
                ) : (
                  <>Дата</>
                )}
              </th>
              <th
                className={classNames(styles.viewsTh, {
                  [styles.active]: columnType === "views",
                })}
                onClick={viewsColumnHandleChange}
              >
                {columnType === "views" ? (
                  <>
                    Просмотры
                    {sortOrder === "descending" && (
                      <FaArrowUpLong className={styles.arrow} />
                    )}
                    {sortOrder === "ascending" && (
                      <FaArrowDownLong className={styles.arrow} />
                    )}
                  </>
                ) : (
                  <>Просмотры</>
                )}
              </th>
              <th
                className={classNames(styles.commentsTh, {
                  [styles.active]: columnType === "comments",
                })}
                onClick={commentsColumnHandleChange}
              >
                {columnType === "comments" ? (
                  <>
                    Просмотры
                    {sortOrder === "descending" && (
                      <FaArrowUpLong className={styles.arrow} />
                    )}
                    {sortOrder === "ascending" && (
                      <FaArrowDownLong className={styles.arrow} />
                    )}
                  </>
                ) : (
                  <>Комментарии</>
                )}
              </th>
              <th>% Нравится</th>
            </tr>
          </thead>
          <tbody>
            {data?.results.map((post) => (
              <tr>
                <td>
                  <PostInputCheckbox
                    onChange={handleChangeCheckbox}
                    checked={selectedPosts.find(
                      (item) => item.post_id === post.post_id,
                    )}
                    post={post}
                  />
                </td>
                <td>
                  <Link href={`/blog/${slug}/post/${post.post_id}/`}>
                    {post.title}
                  </Link>
                </td>
                <td>{moment(post.created_at).format("D MMMM YYYY hh:mm")}</td>
                <td>{post.views}</td>
                <td>{post.comments}</td>
                <td>
                  {post.likes}/{post.dislikes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
