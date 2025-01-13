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

export interface Props {
  comment: any
  slug: string
  post_id: number
  width: any
  height: any
  postData: any
}

const BASE_URL = 'http://localhost:8000'

export default function Commentary({ slug, post_id, comment, width, height, postData }: Props) {
  const [ displayReplyInput, setDisplayReplyInput] = React.useState(false)
  const user = useAppSelector(state => state.django.profile)

  const showReplyInputHandleChange = React.useCallback(() => {
    setDisplayReplyInput(true)
  }, [ setDisplayReplyInput ])

  return (
    <div style={{ display: 'flex', marginBottom: '10px' }}>
      <div style={{ marginRight: '16px' }}>
        <Link href={`/profile/${comment.author.username}/`}>
          <img className={styles.avatar} src={`${BASE_URL}${comment.author.avatar_small}`} width={width} height={height} alt='' />
        </Link>
      </div>
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
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
          <div>{comment.body}</div>
        </div>
        <div className={styles.commentFooter} style={{ display: 'flex' }}>
            <LikeTwoTone twoToneColor="#000000" />
            <div>{comment.likes}</div>
            <DislikeTwoTone twoToneColor="#000000" />
            <div>{comment.dislikes}</div>
            {comment?.isLikedByPostAuthor && (
              <div style={{ margin: '0 5px' }}>
                <img src={`${BASE_URL}${postData?.author.avatar_small}`} style={{  borderRadius: '50%' }} width={24} height={24} alt='' />
                <FcLike size={10} style={{ position: 'absolute', width: '18px', height: '18px', marginTop: '10px', marginLeft: '-10px' }} />
              </div>
            )}
            <div className={styles.commentAnswer} onClick={showReplyInputHandleChange}>Ответить</div>
        </div>
        <div>
            {displayReplyInput && (
              <div style={{ display: 'flex' }}>
                <img src={`${BASE_URL}${user?.avatar_small}`} width={24} height={24} style={{ borderRadius: '50%', marginTop: '15px', marginRight: '5px' }} alt='' />
                <CommentBox comment={comment} post_id={post_id} slug={slug} displayReplyInput={displayReplyInput} setDisplayReplyInput={setDisplayReplyInput} placeholder={'Введите ответ'} submitButtonText={'Ответить'} />
              </div>
            )}
        </div>
      </div>
      <div>
        <BsThreeDotsVertical />
      </div>
    </div>
  )
}