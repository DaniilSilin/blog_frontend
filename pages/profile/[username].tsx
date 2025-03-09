import React from 'react'
import MainLayout from '@/app/MainLayout'
import ProfileView from '@/app/views/Profile'
import {getConfig, serverSideResolverWrapper} from '@/app/store/wrapper'

export default function ProfilePage(props) {
  return (
    <MainLayout>
      <ProfileView username={props.username} />
    </MainLayout>
  )
}

const resolveConfig = getConfig([
  ["userProfile", (ctx) => ({ username: ctx!.query.username })],
])

export const getServerSideProps = serverSideResolverWrapper(
  resolveConfig,
  ctx => {
    return {
      props: {
        username: ctx.query.username,
      },
    }
  },
  results => {
    return false
  }
)
