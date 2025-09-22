import React from "react";
// @ts-ignore
import Comment from "@/app/components/modules/comment";
import DjangoService from "@/app/store/services/DjangoService";
import styles from "@/app/components/modules/post/post_page/post_page.module.css";

export interface Props {
  commentReply: any;
  slug: string;
  post_id: number;
  comment: any;
}

export default function Comment({ slug, post_id, comment }: Props) {
  return (
    <div key={comment.id} className={styles.commentBlock}>
      {/*<Comment comment={comment} slug={slug} post_id={post_id} />*/}
    </div>
  );
}
