import React from "react";
import classNames from "classnames";

import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

import styles from "./post_list_table_header_views_column.module.css";

export interface Props {
  columnType: string | null;
  setColumnType: (value: string | null) => void;
  sortOrder: string | null;
  setSortOrder: (value: string | null) => void;
}

export default function PostListTableHeaderViewsColumn({
  columnType,
  setColumnType,
  setSortOrder,
  sortOrder,
}: Props) {
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
  }, [columnType, sortOrder]);

  return (
    <th className={styles.root} onClick={viewsColumnHandleChange}>
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
  );
}
