import React from "react";
import Image from "next/image";
import { Select, Space } from "antd/lib";

export interface Props {
  title: string;
  data: any;
  setAddressee: (value: string) => void;
  setUsername: (value: string) => void;
  onClear: any;
}

import styles from "./SelectField.module.css";

const BASE_URL = "http://127.0.0.1:8000";

export default function SelectField({
  title,
  data,
  setAddressee,
  setUsername,
  onClear,
}: Props) {
  const searchUserByUsername = React.useCallback(
    (value: string) => {
      setUsername(value);
    },
    [setUsername],
  );

  const clearUser = React.useCallback(() => {
    setAddressee("");
  }, []);

  const selectUser = React.useCallback(
    (value: any) => {
      setAddressee(value.value);
    },
    [setAddressee],
  );

  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <Select
        labelInValue
        showSearch
        onSearch={searchUserByUsername}
        className={styles.selectContainer}
        placeholder="Выберите пользователя"
        onSelect={selectUser}
        options={data}
        allowClear={true}
        onClear={clearUser}
        optionRender={(option) => (
          <Space>
            <span role="img" aria-label={option.data.username}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  src={
                    option.data.avatar_small
                      ? `${BASE_URL}${option.data.avatar_small}`
                      : "/img/default/avatar_default.jpg"
                  }
                  className={styles.userAvatar}
                  width={40}
                  height={40}
                  alt=""
                />
                <div>
                  <div className={styles.userUsername}>{option.data.value}</div>
                  <div className={styles.userEmail}>{option.data.email}</div>
                </div>
              </div>
            </span>
          </Space>
        )}
      />
    </div>
  );
}
