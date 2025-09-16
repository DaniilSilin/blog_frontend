import React, { FormEvent } from "react";
import { useRouter } from "next/router";
import { CleanParams } from "@/app/types";

import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

import FilterInput from "@/app/components/modules/form/FilterInput";

import styles from "./search.module.css";

export interface Props {
  cleanParams: CleanParams;
  setPage: (value: number) => void;
}

export default function Search({ setPage, cleanParams }: Props) {
  const router = useRouter();

  const [inputSearch, setInputSearch] = React.useState<string>(
    cleanParams.search ? cleanParams.search : "",
  );

  const setSearchQueryParam = React.useCallback(
    (search: string) => {
      console.log("Memoized function called");
      setPage(1);
      router.push(
        {
          pathname: `${router.pathname}`,
          query: { ...router.query, search },
        },
        undefined,
        { shallow: true },
      );
    },
    [router],
  );

  const filterInputHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchQueryParam(inputSearch);
  };

  const clearInput = () => {
    setInputSearch("");
    setSearchQueryParam("");
  };

  console.log("Rendering MyComponent");

  return (
    <div className={styles.root}>
      <form onSubmit={filterInputHandleSubmit} className={styles.inputForm}>
        <FilterInput
          width={400}
          height={30}
          value={inputSearch}
          onChange={setInputSearch}
          defaultValue={cleanParams.search}
          placeholder={"Введите запрос"}
        />
        <div className={styles.inputSubForm}>
          {inputSearch && (
            <button className={styles.clearButton} onClick={clearInput}>
              <RxCross2 size={20} className={styles.clearButtonIcon} />
            </button>
          )}
        </div>
      </form>
      <button className={styles.searchButton} onClick={filterInputHandleSubmit}>
        <HiMiniMagnifyingGlass />
      </button>
    </div>
  );
}
