import React from "react";

import InviteOrRemoveAuthor from "./InviteOrRemoveAuthor";
import BlogInvitations from "./BlogInvitations";

import styles from "./blog_editor_invite.module.css";

export interface Props {
  slug: string;
}

export default function BlogEditorInvite({ slug }: Props) {
  return (
    <div>
      <div className={styles.title}>Приглашения</div>
      <div style={{ display: "flex" }}>
        <InviteOrRemoveAuthor slug={slug} />
        <BlogInvitations slug={slug} />
      </div>
    </div>
  );
}
