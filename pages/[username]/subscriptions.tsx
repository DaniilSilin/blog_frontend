import React from 'react'
import SubscriptionsView from '@/app/views/Subscriptions'
import MainLayout from '@/app/MainLayout'
import type { GetServerSidePropsContext } from 'next'

export default function SubscriptionsPage(props) {
  return (
    <MainLayout>
      <SubscriptionsView username={props.username} />
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