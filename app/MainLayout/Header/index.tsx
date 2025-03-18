import React from "react";
import { useAppSelector } from "@/app/store";
import { Layout, Menu } from "antd/lib";
const { Header } = Layout;

import HeaderProfile from "./HeaderProfile";
import HeaderNotifications from "./HeaderNotifications";
import SignIn from "./SignIn";

export default function HeaderReact() {
  const user = useAppSelector((state) => state.django.profile);

  return (
    <Header
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        lineHeight: "30px",
      }}
    >
      <Menu theme="dark" mode="horizontal">
        {!user.isGuest ? (
          <>
            <HeaderNotifications />
            <HeaderProfile />
          </>
        ) : (
          <>
            <SignIn />
          </>
        )}
      </Menu>
    </Header>
  );
}
