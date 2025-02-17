import React from 'react'
import InviteOrRemoveAuthor from './InviteOrRemoveAuthor'
import BlogInvitations from './BlogInvitations'

export default function BlogEditorInvite({ slug }) {
  return (
    <div>
      <div style={{ fontSize: '28px', fontWeight: '600', marginBottom: '20px' }}>Приглашения</div>
        <div style={{ display: 'flex' }}>
          <InviteOrRemoveAuthor slug={slug} />
          <BlogInvitations slug={slug} />
        </div>
    </div>
  )
}