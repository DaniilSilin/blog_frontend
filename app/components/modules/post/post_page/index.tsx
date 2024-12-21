import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import Link from 'next/link'
import CommentCreate from "@/app/components/modules/comment_create"
import moment from 'moment'
import 'moment/locale/ru'
import { BiRepost } from "react-icons/bi"
import __Input from "@/app/components/modules/form/Input"
import CommentListSort from "@/app/components/modules/post/post_page/CommentListSort"
import { LikeOutlined, LikeTwoTone, EyeOutlined } from '@ant-design/icons/lib'
import CommentList from "@/app/components/modules/post/post_page/CommentList"

import styles from './post_page.module.css'
const BASE_URL = 'http://localhost:8000'

export default function PostPg({ slug, post_id }) {
  const [ commentText, setCommentText ] = React.useState<string>('')
  const [ likeIsSet, setLikeIsSet ] = React.useState<boolean>()
  const [ sortBy, setSortBy] = React.useState<string>('')
  const [ tags, setTags ] = React.useState([])
  const commentListSortRef = React.useRef(null)
  const [ page, setPage ] = React.useState(1)

  const { data: postData } = DjangoService.useGetPostQuery({ slug, post_id })
  const { data: postCommentList, isFetching } = DjangoService.usePostCommentListQuery({ slug, post_id, sortBy, page })

  const [ setPostLike ] = DjangoService.useSetLikeMutation()
  const [ removePostLike ] = DjangoService.useRemoveLikeMutation()
  const [ subscribeBlog ] = DjangoService.useSubscribeBlogMutation()
  const [ unsubscribeBlog ] = DjangoService.useSubscribeBlogMutation()

  React.useEffect(() => {
    if (postData?.isLiked.toString() === 'true') {
      setLikeIsSet(true)
    } else {
      setLikeIsSet(false)
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
  }, [])

  const unsubscribeFunction = React.useCallback(() => {
    unsubscribeBlog({ slug })
  }, [])

  React.useEffect(() => {
    setTags(postData?.tags.split(' '))
  }, [ postData ])

  React.useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight
      if (scrolledToBottom && !isFetching) {
          if (postCommentList.next !== null) {
            setPage(page + 1)
          } else {
            return
        }
      }
    }
    document.addEventListener("scroll", onScroll)
    return function () {
      document.removeEventListener("scroll", onScroll)
    }
  }, [ page, isFetching ])

  return (
      <div>
        <div className={styles.contentPublishedInformationBlock}>
          <Link href={`/blog/${slug}/`}>
            <img src={`${BASE_URL}${postData?.blog.avatar}`} width={32} height={32}/>
          </Link>
          <div className={styles.contentPublisher}>
            <Link href={`/blog/${slug}/`}>
              <div className={styles.channelName}>
                {postData?.title}
              </div>
            </Link>
            <div>{postData?.subscribers} подписчиков</div>
          </div>
          <div>
            <div style={{marginLeft: '40px'}}>
              {postData?.isSubscribed.toString() === 'true' ? (
                  <div className={styles.unsubscribeButton}>Отписаться</div>
              ) : (
                  <div className={styles.subscribeButton}>Подписаться</div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className={styles.postTitle}>{postData?.blog.title}</div>
          <div className={styles.postInformation}>
            <Link href={`/profile/${postData?.author.username}/`}>
              <div>{postData?.author.username}</div>
            </Link>
            <div style={{padding: '0 5px'}}>·</div>
            <div>{moment(postData?.created_at).format("D MMMM hh:mm")}</div>
            <div style={{padding: '0 5px'}}>·</div>
            <div>{postData?.views} просмотров</div>
          </div>
        </div>
        <div>
          <div style={{margin: '15px 0'}}>{postData?.body}</div>
        </div>
        <div>
          <div style={{display: 'flex'}}>
            <div style={{display: 'flex'}}>
              {likeIsSet ? (
                  <div onClick={removeLikeFunction}>
                    <LikeTwoTone twoToneColor="#000000"/>
                  </div>
              ) : (
                  <div onClick={setLikeFunction}>
                    <LikeOutlined/>
                  </div>
              )}
              <div>{postData?.likes}</div>
            </div>
            <div>
              <BiRepost size={20}/>
            </div>
          </div>
          <div>
            {tags?.map((tag) => (
                <Link href={`/posts/search?hashtag=${tag.slice(1)}`}>{tag} </Link>
            ))}
          </div>
          <div style={{ display: 'flex' }}>
            <div>Комментарии {postData?.commentCount}</div>
            <CommentListSort setSortBy={setSortBy} commentListSortRef={commentListSortRef}/>
          </div>
        </div>
        <div>
          <CommentCreate placeholder={'Написать комментарий'} slug={slug} post_id={post_id}/>
          <div>
            {postCommentList?.results.map((comment) => (
              <CommentList key={comment.id} slug={slug} post_id={post_id} comment={comment} setCommentText={setCommentText} />
            ))}
          </div>
        </div>
      </div>
  )
}