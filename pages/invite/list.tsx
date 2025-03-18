import React from "react";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

import MainLayout from "@/app/MainLayout";
import InviteListView from "@/app/views/InviteList";

export default function InviteListPage() {
  return (
    <MainLayout>
      <InviteListView />
    </MainLayout>
  );
}

const resolveConfig = getConfig([["getInviteList", () => ({ page: 1 })]]);

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  (ctx) => {
    return {
      props: {},
    };
  },
);
