import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import Link from 'next/link'
import Image from 'next/image'

import { Post, User } from '@/app/types'
import { IoMdEye } from "react-icons/io"
import { FaRegCommentAlt, FaShare } from "react-icons/fa"
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { HiMiniBookmark } from "react-icons/hi2";
import { IoBookmarkSharp } from "react-icons/io5";
import ShareMenu from './ShareMenu'

import styles from './post_footer.module.css'
import LikedUserList from "@/app/components/modules/post_page/PostFooter/LikedUserList"
import Bookmark from './Bookmark'

export interface Props {
  post: Post
}

const BASE_URL = 'http://127.0.0.1:8000'

export default function PostFooter({ post }: Props) {
  const [ setLike ] = DjangoService.useSetLikeMutation()
  const [ removeLike ] = DjangoService.useRemoveLikeMutation()

  const [ isVisible, setIsVisible ] = React.useState<boolean>(false)
  const [ isVisibleMenu, setIsVisibleMenu ] = React.useState<boolean>(false)
  const [ dynamicContentModalDisplayed, setDynamicContentModalDisplayed ] = React.useState(false)
  const [ page, setPage ] = React.useState(1)
  const [ triggerQuery, { data: likedUserList, isFetching }] = DjangoService.useLazyLikedUserListQuery()

  const visibleFunction = () => {
    if (!dynamicContentModalDisplayed) {
      setIsVisible(true)
    }
  }

  const isVisibleFunction = () => {
    setIsVisible(false)
  }

  const handleShowMenu = () => {
    setIsVisibleMenu(true)
  }

  const handleHideMenu = () => {
    setIsVisibleMenu(false)
  }

  const setPostLike = (post_id: number) => {
    setLike({ post_id, slug: post.blog.slug })
  }

  const removePostLike = (post_id: number) => {
    removeLike({ post_id, slug: post.blog.slug })
  }

  const handleDynamicContentClick = React.useCallback((e) => {
    triggerQuery({ slug: post.blog.slug, post_id: post.post_id, page: page })
    let elem = e.target

    if (dynamicContentModalDisplayed) {
      if (elem.parentNode.parentNode.nextSibling.className.startsWith('post_footer_modal') || elem.className.startsWith('post_footer_close')) {
        elem.parentNode.parentNode.nextSibling.style.display = 'block'
        setDynamicContentModalDisplayed(false)
      }
    } else {
      let modalNode = null
      if (elem.parentNode.parentNode.nextSibling.className.startsWith('post_footer_modal__b8GYi')) {
        modalNode = elem.parentNode.parentNode.nextSibling
        modalNode.style.display = 'block'
        setIsVisible(false)
        setDynamicContentModalDisplayed(true)
      }
    }
  }, [ triggerQuery, dynamicContentModalDisplayed, page ])

  return (
    <div className={styles.root}>
      <div className={styles.postTags}>
        {post?.tags && (post?.tags.split(' ')).map((tag, index) => (
          <Link key={index} href={`/posts/search?hashtag=${tag.slice(1)}`}>{tag} </Link>
        ))}
      </div>
      <div className={styles.postFooterActionMenu}>
        <div className={styles.likeButton} onMouseOver={visibleFunction} onMouseLeave={isVisibleFunction}>
          {post?.isLiked.toString() === 'true' ? (
            <AiFillLike className={styles.likeIcon} size={20} style={{ color: 'black' }} onClick={() => removePostLike(post?.post_id)} />
          ) : (
            <AiOutlineLike className={styles.likeIcon} size={20} onClick={() => setPostLike(post?.post_id)} />
          )}
          <div>{post?.likes}</div>
          <div>
            {post.likes > 0 && (
              <>
                {isVisible && (
                  <div className={styles.liked_users_container}>
                    {post?.liked_users.map((user: User) => (
                      <div key={user.id}>
                        <Link href={`/profile/${user.username}/`}>
                          <Image src={user.avatar_small ? `${BASE_URL}${user.avatar_small}` : '/img/default/avatar_default.jpg'} width={20} height={20} alt="" />
                        </Link>
                        <Link href={`/profile/${user.username}/`}>{user.username}</Link>
                      </div>
                    ))}
                    <div onClick={handleDynamicContentClick}>Посмотреть всех пользователей</div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <LikedUserList setPage={setPage} likedUserList={likedUserList} page={page} triggerQuery={triggerQuery} isFetching={isFetching} post={post} />
            </div>
          </div>
        </div>
        <div className={styles.viewButton}>
          <IoMdEye size={20} className={styles.viewIcon} />
          <div>{post?.views}</div>
        </div>
        <div>
          <FaRegCommentAlt size={20} className={styles.commentIcon} />
          <Link style={{ display: 'flex' }} href={`/blog/${post.blog.slug}/post/${post.post_id}/`} />
          <div>{post?.comments}</div>
        </div>
        <Bookmark post={post} />
        <div onMouseOver={handleShowMenu} onMouseLeave={handleHideMenu}>
          <FaShare size={20} />
          {isVisibleMenu && (
            <ShareMenu post={post} />
          )}
        </div>
      </div>
    </div>
  )
}