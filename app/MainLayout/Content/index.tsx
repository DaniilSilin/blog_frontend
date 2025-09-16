import React from "react";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

const { Content } = Layout;
import { Layout, theme } from "antd/lib";

import "@/public/style/style.css";
import styles from "./content.module.css";

export interface Props {
  isCopied: boolean;
  setIsCopied: (value: boolean) => void;
  wasCopiedOnce: boolean;
  dataSentSuccessfully: boolean;
  children: React.ReactNode;
}

export default function ContentReact({
  children,
  isCopied,
  setIsCopied,
  dataSentSuccessfully,
  wasCopiedOnce,
}: Props) {
  const router = useRouter();
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  const closeNotification = React.useCallback(() => {
    setIsCopied(false);
  }, [setIsCopied]);

  return (
    <Content>
      <div
        className={styles.global}
        style={{
          minHeight: 720,
          padding: 24,
        }}
      >
        <div style={{ width: "100%", margin: "20px auto" }}>{children}</div>
        {wasCopiedOnce && (
          <button
            className={classNames(styles.notification, {
              [styles.close]: !isCopied,
            })}
          >
            Ссылка скопирована.
            <button className={styles.close} onClick={closeNotification}>
              x
            </button>
          </button>
        )}
        {dataSentSuccessfully && (
          <div className={classNames(styles.dataSentSuccessfullyNotification)}>
            Изменения опубликованы.
            <Link href={`/blog/${router.query.slug}/`}>
              <button className={styles.blogLink}>Перейти на канал</button>
            </Link>
          </div>
        )}
      </div>
    </Content>
  );
}
