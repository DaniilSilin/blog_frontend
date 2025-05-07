import React, { ChangeEvent } from "react";
import styles from "@/app/components/modules/blog_editor_publications/BlogEditorPublications.module.css";
import classNames from "classnames";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

export interface Props {
  postList: any;
  selectedPosts: any;
  setSelectedPosts: any;
  setColumnType: any;
  columnType: any;
  sortOrder: any;
  setSortOrder: any;
}

export default function PostListTableHeader({
  postList,
  selectedPosts,
  setSelectedPosts,
  setColumnType,
  columnType,
  sortOrder,
  setSortOrder,
}: Props) {
  const handleChangeMainCheckbox = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setSelectedPosts(postList.results);
      } else {
        setSelectedPosts([]);
      }
    },
    [setSelectedPosts, postList],
  );

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

  return (
    <thead>
      <tr>
        <th>
          <input
            type={"checkbox"}
            onChange={handleChangeMainCheckbox}
            checked={selectedPosts.length === postList?.results.length}
          />
        </th>
        <th className={styles.titleTh}>Публикация</th>
        <th style={{ textAlign: "start" }} onClick={dateColumnHandleChange}>
          <div
            className={classNames(styles.dateTh, {
              [styles.active]: columnType === "date",
            })}
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
          </div>
        </th>
        <th style={{ textAlign: "end" }} onClick={viewsColumnHandleChange}>
          <div
            className={classNames(styles.viewsTh, {
              [styles.active]: columnType === "views",
            })}
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
          </div>
        </th>
        <th
          onClick={commentsColumnHandleChange}
          style={{ minWidth: "120px", textAlign: "end" }}
        >
          <div
            className={classNames(styles.commentsTh, {
              [styles.active]: columnType === "comments",
            })}
          >
            {columnType === "comments" ? (
              <>
                Комментарии
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
          </div>
        </th>
        <th
          style={{
            minWidth: "180px",
            textAlign: "end",
            fontWeight: "500",
          }}
        >
          % Нравится
        </th>
      </tr>
    </thead>
  );
}
