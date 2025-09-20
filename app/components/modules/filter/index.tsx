import React from "react";

import { ConfigProvider } from "antd/lib";
import locale from "antd/locale/ru_RU";
import { CleanParamsType } from "@/app/types";

import DatePicker2 from "@/app/components/modules/filter/DatePicker";
import SortingMenu from "./SortingMenu";
import Search from "./Search";

import styles from "./filter.module.css";

export interface Props {
  setPage: (value: number) => void;
  cleanParams: CleanParamsType;
}

export default function Filter({ cleanParams, setPage }: Props) {
  return (
    <ConfigProvider locale={locale}>
      <div className={styles.root}>
        <Search cleanParams={cleanParams} setPage={setPage} />
        {/*<DatePicker setPage={setPage} cleanParams={cleanParams} />*/}
        <SortingMenu setPage={setPage} cleanParams={cleanParams} />
      </div>
    </ConfigProvider>
  );
}
