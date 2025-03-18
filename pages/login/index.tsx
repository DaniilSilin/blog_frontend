import React from "react";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

import LoginView from "@/app/views/Login";
import MainLayout from "../../app/MainLayout";

export default function LoginPage() {
  return (
    <MainLayout>
      <LoginView />
    </MainLayout>
  );
}

const resolveConfig = getConfig([]);

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  (ctx) => {
    return {
      props: {},
    };
  },
);
