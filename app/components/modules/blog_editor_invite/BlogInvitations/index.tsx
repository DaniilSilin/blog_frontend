import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import Link from 'next/link'
import InvitationList from "@/app/components/modules/blog_editor_invite/BlogInvitations/InvitationList";

export interface Props {
  slug: string
}

export default function BlogInvitations({ slug }: Props) {
  const { data: blogInvitations } = DjangoService.useBlogInvitationsQuery({ slug })

  return (
    <div>
      <div style={{ fontSize: '22px', fontWeight: '600', marginBottom: '15px' }}>История приглашений</div>
      <div style={{ border: '1px solid black', borderRadius: '15px' }}>
        {blogInvitations?.results.map((invite) => (
            <InvitationList invite={invite} />

        ))}
      </div>
    </div>
  )
}