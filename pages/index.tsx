import React from "react";
import MainLayout from "../app/MainLayout";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

export default function In() {
  return <MainLayout> </MainLayout>;
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
