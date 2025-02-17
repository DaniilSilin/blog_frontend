import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io"
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md"

import Comment from '../../../types'
import Commentary from "@/app/components/modules/comment/Commentary"

import styles from './comment.module.css'

export interface Props {
  slug: string,
  post_id: number,
  comment: Comment[]
  postData: any
}

export default function Comment({ post_id, slug, comment, postData }: Props) {
  const [ showReplies, setShowReplies ] = React.useState(false)
  const [ page, setPage ] = React.useState(1)
  const [ triggerQuery, { data: replyList }] = DjangoService.useLazyPostCommentListQuery()
  const [ wasDisplayedOnce, setWasDisplayedOnce ] = React.useState(false)

  const getReplies = React.useCallback(() => {
    if (!wasDisplayedOnce) {
      triggerQuery({ slug: slug, post_id: post_id, parent_id: comment.comment_id, page: page })
      setWasDisplayedOnce(true)
    }
    setShowReplies(!showReplies)
  }, [ wasDisplayedOnce, setWasDisplayedOnce, setShowReplies, triggerQuery, page ])

  const uploadMoreReplies = React.useCallback(() => {
    setPage(page + 1)
    triggerQuery({ slug: slug, post_id: post_id, parent_id: comment.comment_id, page: page })
  }, [ setPage, page, triggerQuery ])

  const countOfRepliesTitle = React.useMemo(() => {
    if (comment?.count_of_replies === 1) {
      return `${comment?.count_of_replies} ответ`
    } else if (comment?.count_of_replies === 2 || comment?.count_of_replies === 3 || comment?.count_of_replies === 4) {
      return `${comment?.count_of_replies} ответа`
    } else if (comment?.count_of_replies === 5 || comment?.count_of_replies === 6 || comment?.count_of_replies === 7) {
      return `${comment?.count_of_replies} ответов`
    } else {
      return `${comment?.count_of_replies} ответов`
    }
  }, [ comment ])

  return (
    <>
      <div style={{ marginBottom: '15px' }}>
        <Commentary width={40} height={40} comment={comment} post_id={post_id} slug={slug} postData={postData} />
        {!!comment?.count_of_replies && (
          <div style={{ marginLeft: '56px' }}>
              <div>
                <button className={styles.showRepliesButton} onClick={getReplies}>
                  {showReplies ? <IoIosArrowUp size={20} style={{ marginRight: '6px' }} /> : <IoIosArrowDown size={20} style={{ marginRight: '6px' }} />}
                  <div>
                    {countOfRepliesTitle}
                  </div>
                </button>
              </div>
            {showReplies && (
            <>
              <div>
                {replyList?.results.map((comment: Comment) => (
                  <Commentary width={32} height={32} slug={slug} post_id={post_id} comment={comment} postData={postData} />
                ))}
              </div>
              {!!replyList?.next && (
                <button style={{ display: 'inline-flex' }} onClick={uploadMoreReplies}>
                  {showReplies ? <MdOutlineSubdirectoryArrowRight size={20} style={{ marginRight: '6px' }} /> : <MdOutlineSubdirectoryArrowRight size={20} style={{ marginRight: '6px' }} />}
                  <div>Другие ответы</div>
                </button>
              )}
            </>
            )}
          </div>
        )}
      </div>
    </>
  )
}