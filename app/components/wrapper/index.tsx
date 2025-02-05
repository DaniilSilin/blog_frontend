import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import { useAppSelector } from "@/app/store"
import { useRouter } from "next/router"

export interface Props {
  children: React.ReactNode
}

export default function Wrapper({ children }: Props ) {
  const router = useRouter()

  const [ getUserProfile, lastResult ] = DjangoService.useLazyGetUserDataQuery()
  const user = useAppSelector(state => state.django.profile)
  // React.useEffect(() => {
  //   const token = localStorage.getItem("authToken")
  //   if (token) {
  //     getUserProfile()
  //   }
  // }, [ router.pathname ])

  return children
}