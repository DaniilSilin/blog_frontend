import React from 'react'
import InviteView from '@/app/views/Invite'
import MainLayout from '@/app/MainLayout'
import { useAppSelector } from "@/app/store"
import { useRouter } from "next/router"


export default function InvitePage() {
  const router = useRouter()
  const user = useAppSelector(state => state.django.profile)

  React.useEffect(() => {
    if (user) {
      router.push('/login/')
    }
  }, [ user ])

  return (
    <MainLayout>
      <InviteView />
    </MainLayout>
  )
}