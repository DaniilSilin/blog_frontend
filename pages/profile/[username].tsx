import React from 'react'
import MainLayout from "@/app/MainLayout"
import ProfileView from "@/app/views/Profile"
import type { GetServerSidePropsContext } from "next"

export default function ProfilePage(props) {
  return (
    <MainLayout>
      <ProfileView username={props.username} />
    </MainLayout>
  )
}

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      username: ctx.query.username
    }
  }
})