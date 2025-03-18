import React from "react";
import { getConfig, serverSideResolverWrapper } from "@/app/store/wrapper";

import MainLayout from "@/app/MainLayout";
import ProfileEditView from "@/app/views/ProfileEdit";

export default function ProfilePage(props) {
  return (
    <MainLayout>
      <ProfileEditView username={props.username} />
    </MainLayout>
  );
}

const resolveConfig = getConfig([
  ["userProfile", (ctx) => ({ username: ctx!.query.username })],
]);

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  (ctx) => {
    return {
      props: {
        username: ctx.query.username,
      },
    };
  },
  (results) => {
    return false;
  },
);
