import React from "react";
import MainLayout from "../app/MainLayout";
import SubscriptionsView from "../app/views/Subscriptions";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

export default function SubscriptionsPage() {
  return (
    <MainLayout>
      <SubscriptionsView />
    </MainLayout>
  );
}

const resolveConfig = getConfig([["subscriptionList", () => ({ page: 1 })]]);

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  (ctx) => {
    return {
      props: {},
    };
  },
);
