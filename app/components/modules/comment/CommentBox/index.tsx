import React from 'react'

import CommentInput from "@/app/components/modules/form/CommentInput"
import classNames from "classnames"
import DjangoService from '@/app/store/services/DjangoService'
import { useAppSelector } from '@/app/store'
import { HiOutlineEmojiHappy } from 'react-icons/hi'
import Comment from '../../../../types'
import EmojiPicker from 'emoji-picker-react'

import styles from './commentBox.module.css'

export interface Props {
  placeholder: string
  submitButtonText: string
  displayReplyInput?: boolean
  comment?: Comment
  slug: string
  post_id: number
  setDisplayReplyInput: (value: boolean) => void
}

export default function CommentBox({ placeholder, submitButtonText, displayReplyInput, setDisplayReplyInput, comment, slug, post_id }: Props) {
  const [ commentBody, setCommentBody ] = React.useState<string>('')
  const [ inputIsFocused, setInputIsFocused ] = React.useState(false)
  const [ displayEmojiPicker, setDisplayEmojiPicker ] = React.useState(false)

  const user = useAppSelector(state => state.django.profile)
  const inputRef = React.useRef(null)

  const cancelComment = () => {
    setInputIsFocused(false)
    if (setDisplayReplyInput) {
      setDisplayReplyInput(false)
    } else return
  }

  React.useEffect(() => {
    const currentElement = inputRef.current.selectionStart
    console.log(currentElement)
  }, [ inputRef.current ])

  const [ createComment ] = DjangoService.useCreateCommentMutation()

  const leaveComment = () => {
    if (comment) {
      if (comment?.reply_to) {
        createComment({ body: commentBody, post_id: post_id, slug: slug, reply_to: comment?.reply_to })
      } else {
        createComment({ body: commentBody, post_id: post_id, slug: slug, reply_to: comment?.comment_id })
      }
      // if (!comment?.reply_to) {
      //   createComment({ body: commentBody, post_id: post_id, slug: slug, reply_to: comment?.comment_id })
      // } else {
      //   createComment({ body: commentBody, post_id: post_id, slug: slug, reply_to: comment?.reply_to })
      // }
    } else {
      createComment({ body: commentBody, post_id: post_id, slug: slug })
    }
  }

  const onEmojiHandleClick = (emoji: any) => {
    setCommentBody(`${commentBody}${emoji.emoji}`)
  }

  const openEmojiMenuHandleClick = React.useCallback(() => {
    setDisplayEmojiPicker(!displayEmojiPicker)
  }, [ setDisplayEmojiPicker, displayEmojiPicker ])


  React.useEffect(() => {
    if (displayReplyInput) {
      setCommentBody(`@${comment?.author.username} `)
      inputRef?.current.focus()
    }
  }, [ displayReplyInput ])

  return (
    <div style={{ width: '100%' }}>
      <CommentInput ref={inputRef} placeholder={placeholder} height={50} onChange={setCommentBody} setInputIsFocused={setInputIsFocused} value={commentBody} />
        {inputIsFocused && (
          <div className={styles.commentFooter}>
            <HiOutlineEmojiHappy className={styles.emojiIcon} open={true} onClick={openEmojiMenuHandleClick} size={20} />
            <EmojiPicker style={{ position: 'absolute', marginTop: '15px' }} open={displayEmojiPicker} onEmojiClick={onEmojiHandleClick} />
            <div>
              <input type={"submit"} onClick={cancelComment} value={'Отмена'} />
              <input className={classNames(styles.leaveCommentButton, {[styles.notEmpty]: commentBody })} type={"submit"} onClick={leaveComment} disabled={!commentBody}
                     value={submitButtonText} />
            </div>
          </div>
        )}
    </div>
  )
}
