import React, { FormEvent } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { ConfigProvider, DatePicker, Space } from "antd/lib";
const { RangePicker } = DatePicker;
import moment from "moment";
import classNames from "classnames";
import FilterInput from "@/app/components/modules/form/FilterInput";
import locale from "antd/locale/ru_RU";
import { useRouter } from "next/router";

import styles from "./filter.module.css";

export interface Props {
  page: number;
  setPage: (value: number) => void;
  cleanParams: any;
}

const params = [
  {
    id: 1,
    sort_by: "-date",
    label: "Новые",
  },
  {
    id: 2,
    sort_by: "date",
    label: "Старые",
  },
  {
    id: 3,
    sort_by: "title_asc",
    label: "По названию (вверх)",
  },
  {
    id: 4,
    sort_by: "title_desc",
    label: "По названию (вниз)",
  },
];

const dateFormat = "YYYY-MM-DD";

export default function Filter({ cleanParams, page, setPage }: Props) {
  const router = useRouter();
  const [inputSearch, setInputSearch] = React.useState<string>(
    cleanParams.search ? cleanParams.search : "",
  );
  const [currentSortParam, setCurrentSortParam] = React.useState(
    cleanParams.sorting ? cleanParams.sorting : "-date",
  );

  const setSearchQueryParam = React.useCallback(
    (search: string) => {
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

  const setSortingParam = React.useCallback(
    (sorting: string) => {
      if (currentSortParam !== sorting) {
        setCurrentSortParam(sorting);
        setPage(1);
      }
      router.push(
        {
          pathname: `${router.pathname}`,
          query: { ...router.query, sorting: sorting },
        },
        undefined,
        { shallow: true },
      );
    },
    [router],
  );

  const setSortByDateParam = React.useCallback(
    (before: string, after: string) => {
      setPage(1);
      router.push(
        {
          pathname: `${router.pathname}`,
          query: { ...router.query, before: before, after: after },
        },
        undefined,
        { shallow: true },
      );
    },
    [router],
  );

  const handleChangeDate = React.useCallback(
    (date_1, date_2) => {
      setSortByDateParam(date_2[1], date_2[0]);
    },
    [setSortByDateParam],
  );

  const filterInputHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchQueryParam(inputSearch);
  };

  const clearInput = React.useCallback(() => {
    setInputSearch("");
  }, [setInputSearch]);

  const defaultDateValues =
    cleanParams.after && cleanParams.before
      ? [moment(cleanParams.after), moment(cleanParams.before)]
      : undefined;

  return (
    <ConfigProvider locale={locale}>
      <div className={styles.root}>
        <div className={styles.menu}>
          <div style={{ display: "flex" }}>
            <form onSubmit={filterInputHandleSubmit}>
              <FilterInput
                width={400}
                height={30}
                value={inputSearch}
                onChange={setInputSearch}
                defaultValue={cleanParams.search}
                placeholder={"Введите запрос"}
              />
            </form>
            {inputSearch && (
              <div
                style={{ position: "relative", right: "20px", top: "-3.5px" }}
                onClick={clearInput}
              >
                x
              </div>
            )}
            <div>
              <HiMiniMagnifyingGlass onClick={filterInputHandleSubmit} />
            </div>
          </div>
        </div>
        <div className={styles.additionalSettings}>
          <div style={{ width: "300px" }}>
            <Space direction="vertical" size={12}>
              <RangePicker
                defaultValue={defaultDateValues}
                format={dateFormat}
                picker="day"
                onChange={handleChangeDate}
              />
            </Space>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "15px" }}>
          {params.map((item) => (
            <button
              className={classNames(styles.sortingItem, {
                [styles.active]: currentSortParam === item.sorting,
              })}
              onClick={() => setSortingParam(item.sorting)}
            >
              <div>{item.label}</div>
            </button>
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
}
