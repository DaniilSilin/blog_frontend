import React from "react";
import classNames from "classnames";

import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

import styles from "./post_list_table_header_date_column.module.css";

export interface Props {
  columnType: string | null;
  setColumnType: (value: string | null) => void;
  sortOrder: string | null;
  setSortOrder: (value: string | null) => void;
}

export default function PostListTableHeaderDateColumn({
  columnType,
  setColumnType,
  sortOrder,
  setSortOrder,
}: Props) {
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
  }, [columnType, sortOrder]);

  return (
    <th className={styles.root} onClick={dateColumnHandleChange}>
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
  );
}
