import React from 'react'
import Link from "next/link";

export interface Props {
  invite: any
}

export default function InvitationList({ invite }: Props) {

  const inviteStatus = React.useMemo(() => {
    const currentInvite = invite.status
    if (currentInvite !== null) {
      if (currentInvite.toString() === 'true') {
        return 'Принята'
      } else {
        return 'Отклонена'
      }
    } else {
      return 'Без ответа'
    }
  }, [ invite ])


  return (
        <div style={{border: '1px solid black', padding: '10px', borderRadius: '10px'}}>
          <div style={{display: 'flex', fontSize: '16px'}}>
            <div style={{fontWeight: '600'}}>Отправить:&nbsp;</div>
            <Link href={`/profile/${invite.admin}/`}>
              <div>{invite.admin}</div>
            </Link>
          </div>
          <div style={{display: 'flex', fontSize: '16px'}}>
            <div style={{fontWeight: '600'}}>Получатель:&nbsp;</div>
            <Link href={`/profile/${invite.addressee}/`}>
              <div>{invite.addressee}</div>
            </Link>
          </div>
          <div>Дата создания: {invite.created_at}</div>
          <div>Статус:</div>
          <div>{inviteStatus}</div>
          <div>Текст сообщения {invite.description}</div>
        </div>
  )
}