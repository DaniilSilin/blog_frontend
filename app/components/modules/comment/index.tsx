import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io"

import Comment from '../../../types'
import Commentary from "@/app/components/modules/comment/Commentary"

import styles from './comment.module.css'

export interface Props {
  slug: string,
  post_id: number,
  comment: Comment[]
  postData: any
}

export default function Comment({ post_id, slug, comment, postData }) {
  const [ showReplies, setShowReplies ] = React.useState(false)
  const [ page, setPage ] = React.useState(1)
  const [ triggerQuery, { data: replyList }] = DjangoService.useLazyPostCommentListQuery()

  const getReplies = () => {
    triggerQuery({ slug: slug, post_id: post_id, parent_id: comment.comment_id })
    setShowReplies(!showReplies)
  }

  return (
    <>
      <div style={{ marginBottom: '15px' }}>
        <Commentary width={40} height={40} comment={comment} post_id={post_id} slug={slug} postData={postData} />
        {!!comment?.count_of_replies && (
          <div style={{ marginLeft: '56px' }}>
            <div className={styles.showRepliesButton}>
              <div style={{ marginLeft: '16px', display: 'flex' }}>
                <IoIosArrowUp />
                <button onClick={getReplies}>123123</button>
              </div>
            </div>
            {showReplies && (
            <>
              <div>
                {replyList?.results.map((comment: Comment) => (
                  <Commentary width={32} height={32} slug={slug} post_id={post_id} comment={comment} postData={postData} />
                ))}
              </div>
            </>
            )}
          </div>
        )}
      </div>
    </>
  )
}