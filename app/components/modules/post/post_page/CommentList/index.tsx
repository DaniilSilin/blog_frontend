import React from 'react'
import styles from "@/app/components/modules/post/post_page/post_page.module.css";
import Link from "next/link";
import moment from "moment/moment";
import __Input from "@/app/components/modules/form/Input";
import {LikeTwoTone} from "@ant-design/icons/lib";

export interface Props {
  comment: any
  setCommentText: (value: string) => void
}

const BASE_URL = 'http://localhost:8000'

export default function CommentList({ comment, setCommentText }: Props) {
  const [ answerInput, setAnswerInput ] = React.useState<boolean>(false)

  const showAnswerInput = React.useCallback(() => {
    setAnswerInput(!answerInput)
  }, [ setAnswerInput, answerInput ])

  return (
      <div key={comment.id} id='comments' className={styles.commentBlock}>
        <div className={styles.commentHeader}>
          <Link href={`/profile/${comment.author.username}/`} style={{display: 'flex'}}>
            <img className={styles.avatar} src={`${BASE_URL}${comment.author.avatar}`} width={32} height={32}
                 alt=''/>
            <div className={styles.author}>{comment.author.username}</div>
          </Link>
          <div className={styles.date}>{moment(comment.created_at).fromNow()}</div>
        </div>
        <div>
          <div>{comment.body}</div>
        </div>
        <div className={styles.commentFooter}>
          <div className={styles.commentAnswer} onClick={showAnswerInput}>Ответить</div>
          <div className={styles.likeCounter}></div>
          <div className={styles.dislikeCounter}></div>
        </div>
        {answerInput && (
            <div>
              <div>
                <LikeTwoTone twoToneColor="#000000"/>

                <div>{comment.likes}</div>
              </div>
              <__Input width={200} height={50} onChange={setCommentText} defaultValue={`${comment.author.username}, `}
                       placeholder={'Ваш ответ...'}/>
              <input type={'submit'} value={'Ответить'}/>
            </div>)}
      </div>
  )
}