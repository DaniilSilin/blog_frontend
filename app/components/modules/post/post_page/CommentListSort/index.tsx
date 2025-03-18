import React from "react";
import classNames from "classnames";
import { BsListNested } from "react-icons/bs";

import styles from "./comment_list.module.css";

export interface Props {
  sortBy: string;
  setSortBy: (value: string) => void;
}

const sortingList = [
  {
    id: 1,
    label: "Сначала новые",
    queryParam: "newest",
  },
  {
    id: 2,
    label: "Сначала старые",
    queryParam: "oldest",
  },
];

export default function CommentListSort({ setSortBy, sortBy }: Props) {
  const commentListSortRef = React.useRef(null);
  const [showDropdown, setShowDropdown] = React.useState(false);

  const setParam = React.useCallback(
    (queryParam: string) => {
      setSortBy(queryParam);
      setShowDropdown(false);
    },
    [setSortBy, setShowDropdown],
  );

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      // @ts-ignore
      if (!commentListSortRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [commentListSortRef]);

  const showParamMenuHandler = React.useCallback(() => {
    setShowDropdown(!showDropdown);
  }, [setShowDropdown, showDropdown]);

  return (
    <div className={styles.root} ref={commentListSortRef}>
      <div className={styles.title} onClick={showParamMenuHandler}>
        <BsListNested size={20} className={styles.titleIcon} />
        Упорядочить
      </div>
      {showDropdown && (
        <div className={styles.dropdown}>
          {sortingList.map((param, index) => (
            <button
              key={index}
              className={classNames(styles.dropdownElement, {
                [styles.active]: param.queryParam === sortBy,
              })}
              onClick={() => setParam(param.queryParam)}
            >
              {param.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
