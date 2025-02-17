import React from 'react'
import MainLayout from "@/app/MainLayout"
import ProfileView from "@/app/views/Profile"
import type { GetServerSidePropsContext } from "next"
import {getConfig, serverSideResolverWrapper} from "@/app/store/wrapper";

export default function ProfilePage(props) {
  return (
    <MainLayout>
      <ProfileView username={props.username} />
    </MainLayout>
  )
}

//
// const resolveConfig = getConfig([
//   ["getPostPaginatedList", () => ({ page: 1 })],
// ])
//
// export const getServerSideProps = serverSideResolverWrapper(
//   resolveConfig,
//   ctx => {
//     return {
//       props: {},
//     }
//   }
// )
//

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      username: ctx.query.username
    }
  }
})