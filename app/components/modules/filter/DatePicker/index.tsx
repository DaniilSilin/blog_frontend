import React from "react";
import { useRouter } from "next/router";
import moment from "moment/moment";

const { RangePicker } = DatePicker;
import { DatePicker, Space } from "antd/lib";
import { CleanParamsType } from "@/app/types";

import styles from "./date_picker.module.css";

export interface Props {
  setPage: (value: number) => void;
  cleanParams: CleanParamsType;
}

const dateFormat = "YYYY-MM-DD";

export default function DatePicker2({ setPage, cleanParams }: Props) {
  const router = useRouter();

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

  const defaultDateValues =
    cleanParams.after && cleanParams.before
      ? [moment(cleanParams.after), moment(cleanParams.before)]
      : undefined;

  const handleChangeDate = React.useCallback((date_1: any, date_2: any) => {
    setSortByDateParam(date_2[1], date_2[0]);
  }, []);

  return (
    <div className={styles.root}>
      <div style={{ width: "300px" }}>
        <Space direction="vertical" size={12}>
          <RangePicker
            // @ts-ignore
            defaultValue={defaultDateValues}
            format={dateFormat}
            // @ts-ignore
            picker="day"
            onChange={handleChangeDate}
          />
        </Space>
      </div>
    </div>
  );
}
