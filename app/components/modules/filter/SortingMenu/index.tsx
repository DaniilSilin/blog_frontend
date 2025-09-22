import React from "react";
import { CleanParamsType } from "@/app/types";
import SortingButton from "./SortingButton";

import styles from "./sorting_menu.module.css";

interface SortParam {
  id: number;
  sort_by: string;
  label: string;
}

const sortingOptions: SortParam[] = [
  {
    id: 1,
    sort_by: "-date",
    label: "По дате (↓)",
  },
  {
    id: 2,
    sort_by: "date",
    label: "По дате (↑)",
  },
  {
    id: 3,
    sort_by: "title_asc",
    label: "По названию (↑)",
  },
  {
    id: 4,
    sort_by: "title_desc",
    label: "По названию (↓)",
  },
];

export interface Props {
  cleanParams: CleanParamsType;
  setPage: (value: number) => void;
}

export default function SortingMenu({ cleanParams, setPage }: Props) {
  const [currentSortParam, setCurrentSortParam] = React.useState(
    cleanParams.sort_by ? cleanParams.sort_by : "-date",
  );

  return (
    <div className={styles.root}>
      {sortingOptions.map((sortingOption: SortParam) => (
        <SortingButton
          key={sortingOption.id}
          sortingOption={sortingOption}
          setPage={setPage}
          currentSortParam={currentSortParam}
          setCurrentSortParam={setCurrentSortParam}
        />
      ))}
    </div>
  );
}
