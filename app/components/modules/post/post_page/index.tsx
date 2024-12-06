import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import Link from 'next/link'
import CommentCreate from "@/app/components/modules/comment_create"
import moment from 'moment'
import 'moment/locale/ru'

import styles from './post_page.module.css'
import __Input from "@/app/components/modules/form/Input"
import CommentListSort from "@/app/components/modules/post/post_page/CommentListSort"
import { LikeOutlined, LikeTwoTone, EyeOutlined } from '@ant-design/icons/lib'
import CommentList from "@/app/components/modules/post/post_page/CommentList";

const BASE_URL = 'http://localhost:8000'

export default function PostPg({ slug, post_id }) {
  const [ commentText, setCommentText ] = React.useState<string>('')
  const [ commentText1, setCommentText1 ] = React.useState<string>('')
  const [ likeIsSet, setLikeIsSet ] = React.useState<boolean>()
  const [ isSubscribed, setIsSubscribed ] = React.useState<boolean>()
  const [ sortBy, setSortBy] = React.useState<string>('')
  const [ tags, setTags ] = React.useState([])
  const commentListSortRef = React.useRef(null)

  const { data: postData } = DjangoService.useGetPostQuery({ slug, post_id })
  const { data: postCommentList } = DjangoService.usePostCommentListQuery({ slug, post_id, sortBy })
  const [ setPostLike ] = DjangoService.useSetLikeMutation()
  const [ removePostLike ] = DjangoService.useRemoveLikeMutation()
  const [ subscribeBlog ] = DjangoService.useSubscribeBlogMutation()
  const [ unsubscribeBlog ] = DjangoService.useSubscribeBlogMutation()

  // const [ createComment ] = DjangoService.useUnsubscribeBlogMutation()
  // const [ createReplyComment ] = DjangoService.

  React.useEffect(() => {
    if (postData?.isLiked.toString() === 'true') {
      setLikeIsSet(true)
      console.log(likeIsSet)
    } else {
      setLikeIsSet(false)
      console.log(likeIsSet)
    }
  }, [ postData ])

  const setLikeFunction = React.useCallback(() => {
    setPostLike({ post_id, slug })
    setLikeIsSet(true)
  }, [ setLikeIsSet ])

  const removeLikeFunction = React.useCallback(() => {
    removePostLike({ post_id, slug })
    setLikeIsSet(false)
  }, [ setLikeIsSet ])

  const subscribeFunction = React.useCallback(() => {
    subscribeBlog({ slug })
    setIsSubscribed(true)
  }, [])

  const unsubscribeFunction = React.useCallback(() => {
    unsubscribeBlog({ slug })
    setIsSubscribed(false)
  }, [])

  React.useEffect(() => {
    setTags(postData?.tags.split(' '))
  }, [ postData ])

  return (
    <div>
        <div style={{display: 'flex'}}>
          <img src={`${BASE_URL}${postData?.blog.avatar}`} width={32} height={32}/>
          <div style={{fontSize: '28px'}}>{postData?.title}</div>
        </div>
        <div>Подписчиков: {postData?.subscribers}</div>
        <div>Автор поста: {postData?.author}</div>
        <div>Дата публикации: {moment(postData?.created_at).format("D MMMM hh:mm")}</div>
      <div>Тело поста: {postData?.body}</div>
      <div style={{ display: 'flex' }}>
        {likeIsSet ? (
          <div onClick={removeLikeFunction}>
            <LikeTwoTone twoToneColor="#000000"/>
          </div>)
            :
          (<div onClick={setLikeFunction}>
            <LikeOutlined />
          </div>)
        }
        <div>{`${postData?.likes}`} </div>
        <div><EyeOutlined /> {postData?.views}</div>
      </div>
      <div>
        {tags?.map((tag) => (
          <Link href={`/posts/search?hashtag=${tag.slice(1)}`}>{tag} </Link>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <div>Комментарии {postData?.commentCount}</div>
        <CommentListSort setSortBy={setSortBy} commentListSortRef={commentListSortRef} />
      </div>
      <CommentCreate slug={slug} post_id={post_id} />
      <div>{postCommentList?.map((comment) => (
        <CommentList key={comment.id} comment={comment} setCommentText={setCommentText} />
      ))}
      </div>
    </div>
  )
}