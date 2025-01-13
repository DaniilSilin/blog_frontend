import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import { useAppSelector } from '@/app/store'
import Post from '../../../../../types'

import styles from './additional_menu_list.module.css'

export interface Props {
  post: Post
}

export default function AdditionalMenuList({ post }: Props) {
  const [ addBookmark ] = DjangoService.useAddToBookmarksMutation()
  const [ removeBookmark ] = DjangoService.useRemoveFromBookmarksMutation()
  const [ deletePost ] = DjangoService.useDeletePostMutation()
  const user = useAppSelector(state => state.django.profile)

  // const addToBookmarksRequest = () => {
  //
  // }
  //
  // const deletePostRequest = (post) => {
  //   deletePost({ slug: post?.blog.slug, post_id: post?.post_id })
  // }
  //
  // if (user?.username === post?.blog.owner.username || user?.is_admin) {
  //   return (
  //     <div>
  //       <div>Закрепить пост</div>
  //       <div>Отключить комментарии</div>
  //       <div onClick={addToBookmarksRequest}>Добавить в закладки</div>
  //       <div onClick={deletePostRequest}>Удалить</div>
  //     </div>
  //   )
  // } else if (post?.blog.authors.find(author => author.username === user.username)) {
  //   return (
  //     <div>
  //       <div>Закрепить пост</div>
  //       <div>Отключить комментарии</div>
  //       <div>Добавить в закладки</div>
  //     </div>
  //   )
  // } else {
  //   return (
  //     <div>
  //       <div>Добавить в закладки</div>
  //       <div>Скопировать ссылку</div>
  //       <div>Пожаловаться</div>
  //     </div>
  //   )
  // }
}