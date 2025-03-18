import React from "react";
import { Layout } from "antd/lib";

import Footer from "./Footer";
import Header from "./Header";
import Content from "./Content";
import Sider from "./Sider";

export interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <Layout>
      <Header />
      <Layout style={{ display: "flex" }}>
        <Sider />
        <Content>{children}</Content>
      </Layout>
      <Footer />
    </Layout>
  );
}
