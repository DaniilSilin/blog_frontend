import React from 'react'
import MainLayout from "@/app/MainLayout"
import type { GetServerSidePropsContext } from "next"
import ProfileEditView from "@/app/views/ProfileEdit";

export default function ProfilePage(props) {
  return (
    <MainLayout>
      <ProfileEditView username={props.username} />
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