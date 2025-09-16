import React from "react";
import { useRouter } from "next/router";
import classNames from "classnames";

import styles from "./filter_button.module.css";

export interface Props {
  setPage: (value: number) => void;
  sortingOption: Record<string, any>;
  currentSortParam: string;
  setCurrentSortParam: (value: string) => void;
}

export default function SortingButton({
  setPage,
  sortingOption,
  currentSortParam,
  setCurrentSortParam,
}: Props) {
  const router = useRouter();

  const setSortingParam = React.useCallback(
    (sort_by: string) => {
      if (currentSortParam !== sort_by) {
        setCurrentSortParam(sort_by);
        setPage(1);
      }
      router.push(
        {
          pathname: `${router.pathname}`,
          query: { ...router.query, sort_by },
        },
        undefined,
        { shallow: true },
      );
    },
    [router],
  );

  const changeSortParam = React.useCallback(
    (sort_by: string) => {
      setSortingParam(sort_by);
    },
    [setSortingParam],
  );

  const handleClickSortingButton = () => {
    changeSortParam(sortingOption.sort_by);
  };

  return (
    <button
      className={classNames(styles.root, {
        [styles.active]: currentSortParam === sortingOption.sort_by,
      })}
      onClick={handleClickSortingButton}
    >
      <div>{sortingOption.label}</div>
    </button>
  );
}
