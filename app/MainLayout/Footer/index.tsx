import React from "react";
const { Footer } = Layout;
import { Layout } from "antd/lib";

export default function FooterReact() {
  return (
    <Footer style={{ textAlign: "center" }}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
}
