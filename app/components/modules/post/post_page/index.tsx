import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import { useAppSelector } from '@/app/store'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'
import 'moment/locale/ru'

import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import { IoBookmarkSharp, IoBookmarkOutline } from 'react-icons/io5'
import { TiArrowForwardOutline } from 'react-icons/ti'

import NoUserPopup from '@/app/components/modules/NoUserPopup'
import Comment from '../../comment'
import CommentListSort from './CommentListSort'
import CommentCreate from '../../../modules/comment_create'

import styles from './post_page.module.css'

const BASE_URL = 'http://127.0.0.1:8000'

export default function PostPage({ slug, post_id }) {
  const subscribeRef = React.useRef(null)
  const likeRef = React.useRef(null)
  const dislikeRef = React.useRef(null)
  const bookmarkRef = React.useRef(null)

  const user = useAppSelector(state => state.django.profile)
  const [ sortBy, setSortBy ] = React.useState<string>('newest')
  const [ tags, setTags ] = React.useState([])
  const [ page, setPage ] = React.useState(1)

  const [ displaySubscribePopup, setDisplaySubscribePopup ] = React.useState(false)
  const [ displayLikePopup, setDisplayLikePopup ] = React.useState(false)
  const [ displayDislikePopup, setDisplayDislikePopup ] = React.useState(false)
  const [ displayBookmarkPopup, setDisplayBookmarkPopup ] = React.useState(false)

  const { data: postData, refetch: refetchPost } = DjangoService.useGetPostQuery({ slug, post_id })
  const { data: postCommentList, isFetching } = DjangoService.usePostCommentListQuery({ slug, post_id, page, sort_by: sortBy })

  const [ setOrRemoveLike ] = DjangoService.useSetOrRemoveLikeMutation()
  const [ setOrRemoveDislike ] = DjangoService.useSetOrRemoveDislikeMutation()
  const [ subscribeBlog ] = DjangoService.useSubscribeBlogMutation()
  const [ unsubscribeBlog ] = DjangoService.useUnsubscribeBlogMutation()
  const [ addOrRemoveBookmark ] = DjangoService.useAddOrRemoveBookmarkMutation()

  React.useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight
      if (scrolledToBottom && !isFetching) {
        if (postCommentList.next != null) {
          setPage(page + 1)
        } else {
          return
        }
      }
    }
    document.addEventListener("scroll", onScroll)
    return () => document.removeEventListener("scroll", onScroll)
  }, [ page, isFetching ])

  const addOrRemoveBookmarksFunction = async () => {
    const result = await addOrRemoveBookmark({ slug, post_id })
    if (!result.error && result.data.status !== 'unsuccessful') {
      refetchPost()
    }
  }

  const setLikeFunction = async () => {
    const result = await setOrRemoveLike({ post_id, slug })
    if (!result.error && result.data.status !== 'unsuccessful') {
      refetchPost()
    }
  }

  const removeLikeFunction = async () => {
    const result = await setOrRemoveDislike({ post_id, slug })
    if (!result.error && result.data.status !== 'unsuccessful') {
      refetchPost()
    }
  }

  const subscribeButton = async () => {
    const result = await subscribeBlog({ slug })
    if (!result.error && result.data.status !== 'unsuccessful') {
      refetchPost()
    }
  }

  const unsubscribeButton = async () => {
    const result = await unsubscribeBlog({ slug })
    if (!result.error && result.data.status !== 'unsuccessful') {
      refetchPost()
    }
  }

  React.useEffect(() => {
    if (postData?.tags) {
      setTags(postData?.tags.split(' '))
    }
  }, [ postData ])

  const handleShowSubscribePopup = React.useCallback(() => {
    setDisplaySubscribePopup(!displaySubscribePopup)
  }, [ setDisplaySubscribePopup, displaySubscribePopup ])

  const handleShowLikePopup = React.useCallback(() => {
    setDisplayLikePopup(!displayLikePopup)
  }, [ setDisplayLikePopup, displayLikePopup ])

  const handleShowDislikePopup = React.useCallback(() => {
    setDisplayDislikePopup(!displayDislikePopup)
  }, [ setDisplayDislikePopup, displayDislikePopup ])

  const handleShowBookmarkPopup = React.useCallback(() => {
    setDisplayBookmarkPopup(!displayBookmarkPopup)
  }, [ setDisplayBookmarkPopup, displayBookmarkPopup ])

  React.useEffect(() => {
   const handleMouse = (e: MouseEvent) => {
     // @ts-ignore
     if (user.isGuest) {
       // @ts-ignore
       if (!subscribeRef.current.contains(e.target)) {
         setDisplaySubscribePopup(false)
       }
       // @ts-ignore
       if (!likeRef.current.contains(e.target)) {
         setDisplayLikePopup(false)
       }
       // @ts-ignore
       if (!dislikeRef.current.contains(e.target)) {
         setDisplayDislikePopup(false)
       }
       // @ts-ignore
       if (!bookmarkRef.current.contains(e.target)) {
         setDisplayBookmarkPopup(false)
       }
     }
   }
    document.addEventListener("mousedown", handleMouse)
    return () => document.removeEventListener("mousedown", handleMouse)
  })

  const commentsCount = React.useMemo(() => {
    const commentCount = postData?.commentCount.toString() || '0'

    if (commentCount.slice(-1) === '1' && commentCount.slice(-2) !== '11') {
      return `${commentCount} комментарий`
    } else if (((commentCount.slice(-1) === '2' || commentCount.slice(-1) === '3' || commentCount.slice(-1) === '4') &&
        (commentCount.slice(-2) !== '12' && commentCount.slice(-2) !== '13' && commentCount.slice(-2) !== '14'))) {
      return `${commentCount} комментария`
    } else {
      return `${commentCount} комментариев`
    }
  }, [ postData?.commentCount ])

  return (
    <div>
      <div className={styles.contentPublishedInformationBlock}>
        <div className={styles.postHeaderInformation}>
          <Link href={`/blog/${slug}/`}>
            <Image src={postData?.blog.avatar_small ? `${BASE_URL}${postData?.blog.avatar_small}` : '/img/default/avatar_default.jpg'}
                className={styles.blogAvatar} alt={''} width={60} height={60}/>
          </Link>
          <div className={styles.contentPublisher}>
            <Link href={`/blog/${slug}/`}>
              <div className={styles.channelName}>
                {postData?.blog.title}
              </div>
            </Link>
            <div>{postData?.subscribers} подписчиков</div>
          </div>
        </div>
        <div className={styles.subscribeBlock}>
          {!user?.isGuest ? (
            <>
              {postData?.isSubscribed.toString() === 'true' ? (
                <button onClick={unsubscribeButton} className={styles.subscribeButton}>
                  Отписаться
                </button>
              ) : (
                <button onClick={subscribeButton} className={styles.unsubscribeButton}>
                  Подписаться
                </button>
              )}
            </>
          ) : (
            <>
              <div ref={subscribeRef}>
                <button onClick={handleShowSubscribePopup} className={styles.unsubscribeButton}>Подписаться</button>
                {displaySubscribePopup && (
                  <NoUserPopup title={'Хотите подписаться на этот канал?'} description={'Войдите, чтобы подписаться на этот канал'} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <div className={styles.postTitle}>{postData?.title}</div>
        <div className={styles.postInformation}>
          <Link href={`/profile/${postData?.author.username}/`}>
            <div>{postData?.author.username}</div>
          </Link>
          <div className={styles.delimiter}>·</div>
          <div>{moment(postData?.created_at).format("D MMMM hh:mm")}</div>
          <div className={styles.delimiter}>·</div>
          <div>{postData?.views} просмотров</div>
        </div>
      </div>
      <div>
        <div style={{ margin: '15px 0', overflowWrap: 'break-word' }}>{postData?.body}</div>
      </div>
      <div className={styles.map} dangerouslySetInnerHTML={{__html: postData?.map}}></div>
      <div className={styles.tagsContainer}>
        {tags?.map((tag, index) => (
            <Link key={index} href={`/posts/search/${tag.slice(1)}/`}>{tag} </Link>
        ))}
      </div>
      <div className={styles.actionContainer}>
        <div className={styles.likedAndDislikeContainer}>
          {user.isGuest ? (
            <div className={styles.likeContainer} ref={likeRef}>
              <button className={styles.likeButton} onClick={handleShowLikePopup}>
                <AiFillLike className={styles.likeIcon} size={20}/>
                <div className={styles.likeCounter}>
                  {postData?.likes}
                </div>
              </button>
              {displayLikePopup && (
                <div style={{marginTop: '37px', marginLeft: '-50px', cursor: 'default'}}>
                  <NoUserPopup title={'Нравится эта публикация?'} description={'Войдите, чтобы поставить лайк на этот канал'} />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.likeContainer}>
              <button onClick={setLikeFunction} className={styles.likeButton}>
                {postData?.isLiked.toString() === 'true' ? (
                  <AiFillLike className={styles.likeIconLiked} size={20}/>
                ) : (
                  <AiOutlineLike className={styles.likeIconNotLiked} size={20}/>
                )}
                <div className={styles.likeCounter}>
                  {postData?.likes}
                </div>
              </button>
            </div>
          )}
          {user.isGuest ? (
            <div className={styles.dislikeContainer} ref={dislikeRef}>
              <button className={styles.dislikeButton} onClick={handleShowDislikePopup}>
                <AiOutlineDislike className={styles.dislikeIconNotLiked} size={20}/>
              </button>
              <div className={styles.dislikeCounter}>
                {postData?.dislikes}
              </div>
              {displayDislikePopup && (
                <div style={{ marginTop: '35px', marginLeft: '-30px' }}>
                  <NoUserPopup title={'Не нравится эта публикация?'} description={'Войдите, чтобы поставить дизлайк на этот канал'} />
                </div>
              )}
            </div>
          ) : (
              <div className={styles.dislikeContainer}>
                <button onClick={removeLikeFunction} className={styles.dislikeButton}>
                  {postData?.isDisliked.toString() === 'true' ? (
                      <AiFillDislike className={styles.dislikeIconLiked} size={20}/>
                  ) : (
                      <AiOutlineDislike className={styles.dislikeIconNotLiked} size={20}/>
                  )}
                  <div className={styles.dislikeCounter}>
                    {postData?.dislikes}
                  </div>
                </button>
              </div>
          )}
        </div>
        <div className={styles.bookmarkContainer}>
          {user.isGuest ? (
            <div ref={bookmarkRef}>
              <button className={styles.boo} onClick={handleShowBookmarkPopup}>
                <IoBookmarkSharp style={{ color: 'white' }} size={20}/>
              </button>
              {displayBookmarkPopup && (
                <div style={{ marginTop: '35px', marginLeft: '-30px' }}>
                  <NoUserPopup title={'Хотите посмотреть публикацию позже?'} description={'Войдите, чтобы добавить публикацию в сохранённые'} />
                </div>
              )}
            </div>
          ) : (
            <div>
              <button className={styles.bookmarkButton} onClick={addOrRemoveBookmarksFunction}>
                {postData?.isBookmarked.toString() === 'true' ? (
                  <IoBookmarkSharp className={styles.bookmarkIconAdded} size={20} />
                ) : (
                  <IoBookmarkOutline className={styles.bookmarkIconNotAdded} size={20} />
                )}
                <div>Сохранить</div>
              </button>
            </div>
          )}
        </div>
        <div className={styles.shareButton}>
          <TiArrowForwardOutline className={styles.shareIcon} size={20} />
          <div>Поделиться</div>
        </div>
      </div>
      <div>
        <div className={styles.commentsDataAndCreateComment}>
          <div className={styles.commentsData}>
            <h2 className={styles.commentsCountTitle}>
            <span>{commentsCount}</span>
            </h2>
            <CommentListSort setPage={setPage} setSortBy={setSortBy} sortBy={sortBy} />
          </div>
          <CommentCreate slug={slug} post_id={post_id}/>
        </div>
        <div>
          {/*{postData?.pinned_comment && (*/}
          {/*  <>*/}
          {/*    <Comment slug={slug} post_id={post_id} comment={postData?.pinned_comment} postData={postData} isPinned={true} />*/}
          {/*  </>*/}
          {/*)}*/}
        </div>
        <div className={styles.commentsBlock}>
          {postCommentList?.results.map((comment: Comment, index: number) => (
              <Comment key={index} slug={slug} post_id={post_id} comment={comment} postData={postData} isPinned={false} />
          ))}
        </div>
      </div>
    </div>
  )
}