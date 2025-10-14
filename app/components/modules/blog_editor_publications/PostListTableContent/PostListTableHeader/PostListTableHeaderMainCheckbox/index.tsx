import React, { ChangeEvent } from "react";

import styles from "./post_list_table_header_main_checkbox.module.css";
import { PostType } from "@/app/types";

export interface Props {
  postList: Record<string, any>;
  setSelectedPosts: (value: PostType[]) => void;
  selectedPosts: PostType[];
}

export default function PostListTableHeaderMainCheckbox({
  postList,
  setSelectedPosts,
  selectedPosts,
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

  return (
    <th className={styles.root}>
      <input
        className={styles.mainCheckboxInput}
        type={"checkbox"}
        onChange={handleChangeMainCheckbox}
        checked={
          selectedPosts.length === postList?.results.length && !!postList?.count
        }
      />
    </th>
  );
}
