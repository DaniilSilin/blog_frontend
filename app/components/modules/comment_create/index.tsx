import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import { useAppSelector } from "@/app/store"

import styles from './comment_create.module.css'
import CommentInput from "@/app/components/modules/form/CommentInput";
import CommentBox from "@/app/components/modules/comment/CommentBox";

export interface Props {
  slug: string
  post_id: number
}

const BASE_URL = 'http://localhost:8000'

export default function CommentCreate({ post_id, slug }: Props) {
  const user = useAppSelector(state => state.django.profile)

  return (
    <div className={styles.root}>
      <img className={styles.avatarCreateComment} src={`${BASE_URL}${user.avatar_small}`} width={40} height={40} alt='' />
      <CommentBox placeholder={'Введите комментарий'} submitButtonText={'Оставить комментарий'} slug={slug} post_id={post_id} />
    </div>
  )
}