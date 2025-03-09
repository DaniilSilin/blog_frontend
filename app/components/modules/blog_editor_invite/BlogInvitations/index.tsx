import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import Link from 'next/link'

import InvitationList from './InvitationList'

import styles from './blog_invitations.module.css'

export interface Props {
  slug: string
}

export default function BlogInvitations({ slug }: Props) {
  const [ page, setPage ] = React.useState(1)
  const { data: blogInvitations } = DjangoService.useBlogInvitationsQuery({ slug })

  return (
    <div>
      <div>История приглашений</div>
      <div className={styles.title}>
        {blogInvitations?.results.map((invite: any, index: number) => (
          <InvitationList key={index} invite={invite} />
        ))}
      </div>
    </div>
  )
}