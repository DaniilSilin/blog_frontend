import React from 'react'
import Profile from "@/app/components/modules/profile"

export default function ProfileView({ username}) {

  React.useEffect(() => {

  }, [])

  return (
    <Profile username={username} />
  )
}