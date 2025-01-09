import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import 'moment/locale/ru'
import moment from 'moment'
import Comment from '../../../types'
import __Input from "@/app/components/modules/form/Input"
import Link from "next/link"
import { LikeTwoTone, DislikeTwoTone } from "@ant-design/icons/lib"

import styles from "@/app/components/modules/post/post_page/post_page.module.css"

export interface Props {
  slug: string,
  post_id: number,
  comment: Comment
  reply_to: any
}

const BASE_URL = 'http://localhost:8000'

export default function Comment({ post_id, slug, comment, reply_to }) {
  const [ body, setBody ] = React.useState<string>('')
  const [ answerInput, setAnswerInput ] = React.useState(false)
  const [ showReplies, setShowReplies ] = React.useState(false)

  const [ triggerQuery, { data: replyList }] = DjangoService.useLazyPostCommentListQuery({ slug, post_id, parent_id: comment.comment_id })
  const [ createReply ] = DjangoService.useCreateCommentMutation()

  const replyToComment = () => {
    createReply({ body, post_id, slug, reply_to })
  }

  const showAnswerInput = React.useCallback(() => {
    setAnswerInput(!answerInput)
  }, [ setAnswerInput, answerInput ])

  const getReplies = () => {
    triggerQuery({ slug: slug, post_id: post_id, parent_id: comment.comment_id })
    setShowReplies(!showReplies)
  }

  if (reply_to) {
    return (
      <div>
      <div className={styles.commentHeader}>
        <Link href={`/profile/${comment.author.username}/`} style={{ display: 'flex' }}>
          <img className={styles.avatar} src={`${BASE_URL}${comment.author.avatar}`} width={32} height={32} alt=''/>
          <div className={styles.author}>{comment.author.username}</div>
        </Link>
        <div className={styles.date}>{moment(comment.created_at).fromNow()}</div>
      </div>
      <div style={{ margin: '5px 0' }}>
        <div>{comment.body}</div>
      </div>
      <div>
        <div className={styles.commentFooter} style={{ display: 'flex' }}>
          <LikeTwoTone twoToneColor="#000000"/>
          <div>{comment.likes}</div>
          <DislikeTwoTone twoToneColor="#000000" />
          <div>{comment.dislikes}</div>
          <div className={styles.commentAnswer} onClick={showAnswerInput}>Ответить</div>
        </div>
        <div>
          {answerInput && (
            <div>
              <__Input width={300} height={50} onChange={setBody} defaultValue={`${comment.author.username}, `} placeholder={'Ваш ответ...'} />
              <input onClick={replyToComment} type={'submit'} value={'Ответить'} />
            </div>
          )}
        </div>
          <div>
            {replyList?.results.map((comment) => (
              <Comment slug={slug} post_id={post_id} comment={comment} reply_to={comment.reply_to} />
            ))}
          </div>
      </div>
    </div>
    )
  } else {
    return (
      <div>
        <div className={styles.commentHeader}>
          <Link href={`/profile/${comment.author.username}/`} style={{ display: 'flex' }}>
            <img className={styles.avatar} src={`${BASE_URL}${comment.author.avatar}`} width={32} height={32} alt=''/>
            <div className={styles.author}>{comment.author.username}</div>
          </Link>
          <div className={styles.date}>{moment(comment.created_at).fromNow()}</div>
        </div>
        <div style={{ margin: '5px 0' }}>
          <div>{comment.body}</div>
        </div>
        <div>
          <div className={styles.commentFooter} style={{ display: 'flex' }}>
            <LikeTwoTone twoToneColor="#000000"/>
            <div>{comment.likes}</div>
            <DislikeTwoTone twoToneColor="#000000" />
            <div>{comment.dislikes}</div>
            <div className={styles.commentAnswer} onClick={showAnswerInput}>Ответить</div>
          </div>
          <div>
            {answerInput && (
              <div>
                <__Input width={300} height={50} onChange={setBody} defaultValue={`${comment.author.username}, `} placeholder={'Ваш ответ...'} />
                <input onClick={createReply} type={'submit'} value={'Ответить'} />
              </div>
            )}
          </div>
          <div onClick={getReplies}>Показать {comment.count_of_replies} ответов</div>
          {showReplies && (
            <div>
              {replyList?.results.map((comment) => (
                <Comment slug={slug} post_id={post_id} comment={comment} reply_to={comment.reply_to}  />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

}