import React from "react";
import { Layout } from "antd/lib";

import Footer from "./Footer";
import Header from "./Header";
import Content from "./Content";
import Sider from "./Sider";
import ClipboardTextNotification from "../contexts/ClipboardTextNotification";
import DataSentSuccessfullyNotification from "../contexts/DataSentSuccessfully";

const BASE_URL = "http://127.0.0.1:8000";

import styles from "./mainlayout.module.css";
import CookieHelper from "@/app/store/cookieHelper";
import { Cookie } from "undici-types";

export interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const [wasCopiedOnce, setWasCopiedOnce] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const [dataSentSuccessfully, setDataSentSuccessfully] = React.useState(false);
  const currentTheme = CookieHelper.getCookie("theme");

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

  return (
    <Layout>
      <Header />
      <Layout style={{ display: "flex" }}>
        <Sider />
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
  );
}
