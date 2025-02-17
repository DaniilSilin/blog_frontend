import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import { useAppSelector } from "@/app/store"
import Image from 'next/image'

import styles from './comment_create.module.css'
import CommentInput from "@/app/components/modules/form/CommentInput";
import CommentBox from "@/app/components/modules/comment/CommentBox";

export interface Props {
  slug: string
  post_id: number
}

const BASE_URL = 'http://127.0.0.1:8000/'

export default function CommentCreate({ post_id, slug }: Props) {
  const user = useAppSelector(state => state.django.profile)

  return (
    <div className={styles.root}>
      <Image className={styles.avatarCreateComment} src={user?.avatar_small ? `${BASE_URL}${user.avatar_small}` : '/img/default/avatar_default.jpg'} width={40} height={40} alt='' />
      <CommentBox placeholder={'Введите комментарий'} submitButtonText={'Оставить комментарий'} slug={slug} post_id={post_id} isCreateComment={true} />
    </div>
  )
}