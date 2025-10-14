import React from "react";
import classNames from "classnames";

import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

import styles from "./post_list_table_header_comments_count_column.module.css";

export interface Props {
  columnType: string | null;
  setColumnType: (value: string | null) => void;
  sortOrder: string | null;
  setSortOrder: (value: string | null) => void;
}

export default function PostListTableHeaderCommentsCountColumn({
  columnType,
  setColumnType,
  sortOrder,
  setSortOrder,
}: Props) {
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
  }, [columnType, sortOrder]);

  return (
    <th onClick={commentsColumnHandleChange} className={styles.root}>
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
  );
}
