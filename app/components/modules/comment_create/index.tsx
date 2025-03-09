import React from 'react'
import { useAppSelector } from "@/app/store"
import Image from 'next/image'

import CommentBox from '../comment/CommentBox'

import styles from './comment_create.module.css'

export interface Props {
  slug: string
  post_id: number
}

const BASE_URL = 'http://127.0.0.1:8000/'

export default function CommentCreate({ post_id, slug }: Props) {
  const user = useAppSelector(state => state.django.profile)

  if (!user.isGuest) {
    return (
      <div className={styles.root}>
        <Image className={styles.avatarCreateComment} src={user?.avatar_small ? `${BASE_URL}${user.avatar_small}` : '/img/default/avatar_default.jpg'} width={40} height={40} alt=''/>
        <CommentBox placeholder={'Введите комментарий'} submitButtonText={'Оставить комментарий'} slug={slug} post_id={post_id} isCreateComment={true} isReplyToParentComment={false}/>
      </div>
    )
  } else {
    return (
      <div className={styles.root}>
        <Image className={styles.avatarCreateComment} src={'/img/default/avatar_default.jpg'} width={40} height={40} alt='' />
        {/*<CommentBox placeholder={'Введите комментарий'} submitButtonText={'Оставить комментарий'} slug={slug}*/}
        {/*                  post_id={post_id} isCreateComment={true} isReplyToParentComment={false}/>*/}
      </div>
    )
  }
}