import React from "react";
import CookieHelper from "@/app/store/cookieHelper";
import { Layout } from "antd/lib";

import MainSider from "./MainSider";
import Footer from "./Footer";
import Header from "./Header";
import Content from "./Content";
import Sider from "./Sider";

import ClipboardTextNotification from "../contexts/ClipboardTextNotification";
import DataSentSuccessfullyNotification from "../contexts/DataSentSuccessfully";

import classNames from "classnames";

const BASE_URL = "http://127.0.0.1:8000";

import styles from "./mainlayout.module.css";

export interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const [wasCopiedOnce, setWasCopiedOnce] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const [dataSentSuccessfully, setDataSentSuccessfully] = React.useState(false);

  const [isMainSiderHidden, setIsMainSiderHidden] = React.useState(true);
  const [isWideScreen, setIsWideScreen] = React.useState(false);
  const [isSiderExpanded, setIsSiderExpanded] = React.useState(false);

  const createDataSentSuccessfullyNotification = (value: any) => {
    setDataSentSuccessfully(true);
    setTimeout(() => {
      setDataSentSuccessfully(false);
    }, 5000);
  };

  const copyToClipboard = (value: any) => {
    setWasCopiedOnce(true);
    navigator.clipboard.writeText(
      `${BASE_URL}/blog/${value.blog.slug}/post/${value.post_id}/`,
    );
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  React.useEffect(() => {
    const handleResize = () => {
      const isWideScreenConst = window.innerWidth > 1312;
      setIsWideScreen(isWideScreenConst);
      if (isWideScreen) {
        setIsMainSiderHidden(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  React.useEffect(() => {
    if (isWideScreen) {
      setIsSiderExpanded(true);
    }
  }, [isWideScreen]);

  return (
    <Layout>
      {!isWideScreen && (
        <MainSider
          setIsMainSiderHidden={setIsMainSiderHidden}
          isMainSiderHidden={isMainSiderHidden}
        />
      )}
      <Layout
        className={classNames(styles.mainLayout, {
          [styles.active]: !isMainSiderHidden,
        })}
      >
        <Header
          isWideScreen={isWideScreen}
          setIsMainSiderHidden={setIsMainSiderHidden}
          setIsSiderExpanded={setIsSiderExpanded}
        />
        <Layout className={styles.layout}>
          <Sider
            isWideScreen={isWideScreen}
            isSiderExpanded={isSiderExpanded}
          />
          <ClipboardTextNotification.Provider value={copyToClipboard}>
            <DataSentSuccessfullyNotification.Provider
              value={createDataSentSuccessfullyNotification}
            >
              <Content
                isCopied={isCopied}
                setIsCopied={setIsCopied}
                wasCopiedOnce={wasCopiedOnce}
                dataSentSuccessfully={dataSentSuccessfully}
              >
                {children}
              </Content>
            </DataSentSuccessfullyNotification.Provider>
          </ClipboardTextNotification.Provider>
        </Layout>
        <Footer />
      </Layout>
    </Layout>
  );
}
