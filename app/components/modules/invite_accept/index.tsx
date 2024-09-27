import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"


export default function InviteAccept() {
  const [ acceptInvite ] = DjangoService.useAcceptInviteMutation()

  const acceptInviteFunction = () => {
    acceptInvite({ pk: 5 })
  }

  return (
    <div>
      <input type={"submit"} onClick={acceptInviteFunction} />
    </div>
  )
}