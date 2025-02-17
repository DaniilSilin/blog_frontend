import React from 'react'
import Link from 'next/link'
import { LikeTwoTone, DislikeTwoTone } from "@ant-design/icons/lib"
import 'moment/locale/ru'
import moment from 'moment'
import styles from "@/app/components/modules/post/post_page/post_page.module.css"
import CommentBox from "@/app/components/modules/comment/CommentBox"
import {useAppSelector} from "@/app/store"
import { FcLike } from "react-icons/fc"
import { BsThreeDotsVertical } from "react-icons/bs"
import CommentaryActionMenu from "@/app/components/modules/comment/Commentary/CommentaryActionMenu"
import Image from 'next/image'
import DjangoService from "@/app/store/services/DjangoService"
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"

export interface Props {
  comment: any
  slug: string
  post_id: number
  width: number
  height: number
  postData: any
}

const BASE_URL = 'http://127.0.0.1:8000'

export default function Commentary({ slug, post_id, comment, width, height, postData }: Props) {
  const [ displayReplyInput, setDisplayReplyInput] = React.useState(false)
  const user = useAppSelector(state => state.django.profile)
  const commentAdditionalMenuRef = React.useRef(null)
  const [ displayAdditionalMenu, setDisplayAdditionalMenu ] = React.useState<boolean>(false)
  const [ editMode, setEditMode ] = React.useState(false)
  const [ setOrRemoveCommentLike ] = DjangoService.useSetOrRemoveCommentLikeMutation()
  const [ setOrRemoveCommentDislike ] = DjangoService.useSetOrRemoveCommentDislikeMutation()

  const showReplyInputHandleChange = React.useCallback(() => {
    setDisplayReplyInput(true)
  }, [ setDisplayReplyInput ])

  const likeCommentButton = () => {
    setOrRemoveCommentLike({ slug: slug, post_id: post_id, comment_id: comment?.comment_id })
  }

  const dislikeCommentButton = () => {
    setOrRemoveCommentDislike({ slug: slug, post_id: post_id, comment_id: comment?.comment_id })
  }

  React.useEffect(() => {
    if (!editMode) {
      const handleMouseDown = (e: MouseEvent) => {
        // @ts-ignore
        if (commentAdditionalMenuRef.current.contains(e.target)) {
          setDisplayAdditionalMenu(true)
        } else {
          setDisplayAdditionalMenu(false)
        }
      }
      document.addEventListener("mousedown", handleMouseDown)
      return () => document.removeEventListener("mousedown", handleMouseDown)
    }
  })

  return (
    <div style={{ display: 'flex' }}>
      <div style={{marginRight: '16px'}}>
        <Link href={`/profile/${comment.author.username}/`}>
          <Image className={styles.avatar} src={comment.author.avatar_small ? `${BASE_URL}${comment.author.avatar_small}` : '/img/default/avatar_default.jpg'} width={width} height={height} alt=''/>
        </Link>
      </div>
      {editMode ? (
        <CommentBox editMode={editMode} setEditMode={setEditMode} comment={comment} placeholder={''}
                    submitButtonText={'Сохранить'} slug={slug} post_id={post_id} setDisplayReplyInput={setDisplayReplyInput} isReplyToParentComment={false}
        />
      ) : (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '1000px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link href={`/profile/${comment.author.username}/`}>
                {postData?.author.username === comment?.author.username ? (
                    <div className={styles.commentAuthorIsPostAuthor}>{comment?.author.username}</div>
                ) : (
                    <div className={styles.commentAuthor}>{comment.author.username}</div>
                )}
              </Link>
              <div className={styles.date}>{moment(comment.created_at).fromNow()}</div>
            </div>
            <div>
              <div></div>
              <div>{comment.body}</div>
            </div>
            <div className={styles.commentFooter} style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                {comment.isLiked.toString() === 'true' ? (
                    <AiOutlineLike size={20} style={{ color: 'black' }} onClick={likeCommentButton} />
                ) : (
                    <AiOutlineLike size={20} style={{ color: 'red' }} onClick={likeCommentButton} />
                )}
              </div>
              <span style={{ marginRight: '8px' }}>{comment.likes}</span>
              <div>
                {comment.isDisliked.toString() === 'true' ? (
                    <AiOutlineDislike size={20} style={{ color: 'black' }} onClick={dislikeCommentButton} />
                ) : (
                    <AiOutlineDislike size={20} style={{ color: 'red' }} onClick={dislikeCommentButton} />
                )}
              </div>
              <span style={{ marginRight: '8px' }}>{comment.dislikes}</span>
              {comment?.isLikedByPostAuthor && (
                  <div style={{margin: '0 5px'}}>
                    <img src={postData?.author.avatar_small ? `${BASE_URL}${postData?.author.avatar_small}` : '/img/default/avatar_default.jpg'} style={{ borderRadius: '50%' }}
                         width={24} height={24} alt=''/>
                    <FcLike size={10} style={{
                      position: 'absolute',
                      width: '18px',
                      height: '18px',
                      marginTop: '10px',
                      marginLeft: '-10px'
                    }}/>
                  </div>
              )}
              <div>
                <button className={styles.createReplyButton} onClick={showReplyInputHandleChange}>
                  Ответить
                </button>
              </div>
            </div>
            <div>
              {displayReplyInput && (
                  <div style={{display: 'flex'}}>
                    <Image src={user?.avatar_small ? `${BASE_URL}${user?.avatar_small}` : '/img/default/avatar_default.jpg'} width={32} height={32}
                         style={{ borderRadius: '50%', marginRight: '5px' }} alt=''/>
                    <CommentBox comment={comment} post_id={post_id} slug={slug} editMode={editMode}
                                displayReplyInput={displayReplyInput} setDisplayReplyInput={setDisplayReplyInput}
                                placeholder={'Введите ответ'} submitButtonText={'Ответить'} isReplyToParentComment={true} />
                  </div>
              )}
            </div>
          </div>
          <div ref={commentAdditionalMenuRef}>
            <BsThreeDotsVertical/>
            {displayAdditionalMenu && (
              <CommentaryActionMenu setDisplayAdditionalMenu={setDisplayAdditionalMenu} comment={comment} slug={slug} post_id={post_id} setEditMode={setEditMode} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}