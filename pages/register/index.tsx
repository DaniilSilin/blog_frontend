import React from "react";
import RegisterView from "@/app/views/Register";
import MainLayout from "../../app/MainLayout";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

export default function Register() {
  return (
    <MainLayout>
      <RegisterView />
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
