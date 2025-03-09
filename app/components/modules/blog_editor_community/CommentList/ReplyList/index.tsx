import React from 'react'
import { useAppSelector } from '@/app/store'
import DjangoService from '@/app/store/services/DjangoService'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'
import 'moment/locale/ru'
import classNames from 'classnames'

import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { FaRegHeart } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

import CommentReply from '../CommentReply'
import CommentInput from '../CommentInput'

import styles from './reply_list.module.css'

export interface Props {
  commentReply: any
  slug: string
  selectedBlogComments: any
  setSelectedBlogComments: any
}

const BASE_URL = 'http://127.0.0.1:8000'

export default function ReplyList({ commentReply, slug, selectedBlogComments, setSelectedBlogComments }: Props) {
  const user = useAppSelector(state => state.django.profile)
  const bodyRef = React.useRef(null)
  const [ isNormalMode, setIsNormalMode ] = React.useState(false)
  const [ isBodyCollapsed, setIsBodyCollapsed ] = React.useState(false)
  const [ commentButtonLabel, setCommentButtonLabel ] = React.useState<string>('Читать дальше')
  const [ displayCommentInputReply, setDisplayCommentInputReply ] = React.useState(false)
  const [ setOrRemoveCommentLike ] = DjangoService.useSetOrRemoveCommentLikeMutation()
  const [ setOrRemoveCommentDislike ] = DjangoService.useSetOrRemoveCommentDislikeMutation()
  const [ setOrRemoveLikeByAuthor ] = DjangoService.useSetOrRemoveLikeByAuthorMutation()

  const likeCommentButton = () => {
    setOrRemoveCommentLike({ slug: slug, post_id: commentReply.post.post_id, comment_id: commentReply?.comment_id })
  }

  const dislikeCommentButton = () => {
    setOrRemoveCommentDislike({ slug: slug, post_id: commentReply.post.post_id, comment_id: commentReply?.comment_id })
  }

  const setOrRemoveLikeByAuthorButton = () => {
    setOrRemoveLikeByAuthor({ slug: slug, post_id: commentReply.post.post_id, comment_id: commentReply?.comment_id })
  }

  const additionalMenuMouseOverHandleChange = () => {
    // setDisplayAdditionalMenu(true)
  }

  const additionalMenuMouseLeaveHandleChange = () => {
    // setDisplayAdditionalMenu(false)
  }

  const resizeBodyHandleChange = React.useCallback(() => {
    setIsBodyCollapsed(!isBodyCollapsed)
    if (isBodyCollapsed) {
      setCommentButtonLabel('Читать дальше')
    } else {
      setCommentButtonLabel('Свернуть')
    }
  }, [ setIsBodyCollapsed, isBodyCollapsed ])

  const commentReplyInputHandleChange = React.useCallback(() => {
    if (!displayCommentInputReply) {
      setDisplayCommentInputReply(true)
    }
  }, [ displayCommentInputReply, setDisplayCommentInputReply ])

  React.useEffect(() => {
    // @ts-ignore
    if (bodyRef.current.offsetHeight > 190) {
      setIsNormalMode(false)
    } else {
      setIsNormalMode(true)
    }
  }, [ bodyRef.current ])

  const CustomText = (text: string) => {
    const renderText = () => {
      console.log(text)
      const parts = text.split(' ')
      console.log(parts)
      return parts.map((part, index) => {
        console.log(part)
        if (part === '@admin') {
          const username = part.slice(1,)
          return (
            <Link href={`/profile/${username}/`} key={index}>
              @admin
            </Link>
          )
        }
        return part
      })
    }
    return <span>{renderText()}</span>
  }

  const blogCommentInputCheckboxHandleChange = React.useCallback((checked: boolean, comment: any) => {
    if (checked) {
      setSelectedBlogComments([...selectedBlogComments, comment])
    } else {
      setSelectedBlogComments(selectedBlogComments.filter((item: any)=> item.comment_id !== comment.comment_id))
    }
  }, [ setSelectedBlogComments, selectedBlogComments, commentReply ])

  return (
    <div className={styles.root}>
      <div style={{ display: 'flex' }}>
        <div className={styles.inputContainer}>
            <CommentInput
              comment={commentReply}
              checked={selectedBlogComments.find((item: any) => item.comment_id === commentReply.comment_id)}
              onChange={blogCommentInputCheckboxHandleChange}
              isParent={false}
            />
        </div>
        <div className={styles.commentReplyAuthorAvatarContainer}>
          <Link href={`/profile/${commentReply.author.username}/`}>
            <Image
                src={commentReply.post.blog.avatar_smal ? `${BASE_URL}${commentReply.post.blog.avatar_small}` : '/img/default/avatar_default.jpg'}
                className={styles.commentReplyAuthorAvatar}
                alt={''} width={32} height={32}/>
          </Link>
        </div>
        <div className={styles.commentReplyMainContainer}>
          <div className={styles.commentHeaderContainer}>
            <div className={styles.commentReplyAuthorUsername}>
              <Link href={`/profile/${commentReply.author.username}/`}>
                {commentReply.author.username}
              </Link>
            </div>
            <div className={styles.commentReplyDate}>
              {moment(commentReply.created_at).fromNow()}
            </div>
          </div>
          <div ref={bodyRef} className={styles.commentBody}>
            {isNormalMode ? (
                <div>{CustomText(commentReply.body)}</div>
            ) : (
                <>
                  <div className={classNames(styles.commentBodyCollapsed, {[styles.commentBodyFull]: commentButtonLabel === 'Свернуть'})}>{commentReply.body}</div>
                  <button className={styles.bodyButton} onClick={resizeBodyHandleChange}>{commentButtonLabel}</button>
                </>
            )}
          </div>
          <div className={styles.commentActionButtons}>
            <button className={styles.replyButton} onClick={commentReplyInputHandleChange}>
              Ответить
            </button>
            <div style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
              <div style={{padding: '10px', backgroundColor: 'blue', borderRadius: '50%'}}>
                {commentReply.isLiked.toString() === 'true' ? (
                    <AiOutlineLike size={15} style={{color: 'black'}} onClick={likeCommentButton}/>
                ) : (
                    <AiOutlineLike size={15} style={{color: 'red'}} onClick={likeCommentButton}/>
                )}
              </div>
              {commentReply.likes ? (
                  <div style={{marginRight: '8px'}}>{commentReply.likes}</div>
              ) : null}
            </div>
            <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
              <div style={{ padding: '10px', backgroundColor: 'blue', borderRadius: '50%' }}>
                {commentReply.isDisliked.toString() === 'true' ? (
                    <AiOutlineDislike size={15} style={{color: 'black'}} onClick={dislikeCommentButton}/>
                ) : (
                    <AiOutlineDislike size={15} style={{color: 'red'}} onClick={dislikeCommentButton}/>
                )}
              </div>
              {commentReply.dislikes ? (
                  <div style={{marginRight: '8px'}}>{commentReply.dislikes}</div>
              ) : null}
            </div>
            <div>
              {commentReply.liked_by_author.toString() === 'true' ? (
                  <div
                      className={classNames(styles.likedByAuthor, {[styles.active]: user.username === commentReply.post.author.username})}
                      onClick={setOrRemoveLikeByAuthorButton}>
                    <Image
                        src={commentReply.post.author.avatar_small ? `${BASE_URL}${commentReply.post.author.avatar_small}` : '/img/default/avatar_default.jpg'}
                        className={styles.authorAvatar} alt={''} width={25} height={25}/>
                    <FaRegHeart color={'red'} style={{left: '-7px', position: 'relative'}}/>
                  </div>
              ) : (
                  <div onClick={setOrRemoveLikeByAuthorButton}>
                    <FaRegHeart/>
                  </div>
              )}
            </div>
            <div onMouseOver={additionalMenuMouseOverHandleChange} onMouseLeave={additionalMenuMouseLeaveHandleChange}>
              <BsThreeDotsVertical/>
              {/*{displayAdditionalMenu && (*/}
              {/*    <div style={{position: 'absolute'}}>*/}
              {/*      <button onClick={deleteCommentButton}>*/}
              {/*        Удалить*/}
              {/*      </button>*/}
              {/*      <button>*/}
              {/*        Изменить*/}
              {/*      </button>*/}
              {/*    </div>*/}
              {/*)}*/}
            </div>
          </div>
        </div>
      </div>
      <div>
        {displayCommentInputReply && (
          <CommentReply slug={slug} comment={commentReply} setDisplayCommentInputReply={setDisplayCommentInputReply} />
        )}
      </div>
    </div>
  )
}