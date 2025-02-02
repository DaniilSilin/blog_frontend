import React from 'react'
import { useAppSelector } from "@/app/store"
import DjangoService from "@/app/store/services/DjangoService"
import { GoPin } from "react-icons/go";
import { CiFlag1 } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiPen } from "react-icons/ti";

import styles from './commentary_action_menu.module.css'

export interface Props {
  slug: string
  post_id: number
  comment: any
  setEditMode: (value: boolean) => void
  setDisplayAdditionalMenu: any
}

export default function CommentaryActionMenu({ slug, post_id, comment, setEditMode, setDisplayAdditionalMenu }: Props) {
  const user = useAppSelector(state => state.django.profile)

  const [ deleteComment ] = DjangoService.useDeleteCommentMutation()

  const deleteCurrentComment = () => {
    deleteComment({ slug: slug, post_id: post_id, comment_id: comment.comment_id })
  }

  const editCommentButton = () => {
    // setDisplayAdditionalMenu(false)
    setEditMode(true)
  }

  if (user?.is_admin || comment?.author.username === user?.username || user?.username === comment?.owner.username) {
    return (
      <div className={styles.root}>
        <div style={{ display: 'flex' }}>
          <GoPin />
          <div>Закрепить</div>
        </div>
        <div style={{ display: 'flex' }}>
            <TiPen />
            <div onClick={editCommentButton}>Изменить</div>
        </div>
        <div style={{ display: 'flex' }} onClick={deleteCurrentComment}>
            <FaRegTrashCan />
            <div>Удалить</div>
        </div>
      </div>
    )
  } else {
    return (
      <div style={{ display: 'flex' }}>
        <CiFlag1 />
        <div>Пожаловаться</div>
      </div>
    )
  }
}