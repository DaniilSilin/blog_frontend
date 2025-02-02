import React from 'react'
import CreateInvite from "@/app/components/modules/blog_editor_invite/CreateInvite";
import BlogInvitations from "@/app/components/modules/blog_editor_invite/BlogInvitations";

export default function BlogEditorInvite({ slug }) {
  return (
      <div>
        <div style={{ fontSize: '28px', fontWeight: '600', marginBottom: '20px' }}>Приглашения</div>
          <div style={{ display: 'flex' }}>
            <CreateInvite slug={slug} />
            <BlogInvitations slug={slug} />
          </div>
      </div>
  )
}