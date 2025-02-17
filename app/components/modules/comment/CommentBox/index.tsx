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
  setDisplayReplyInput?: (value: boolean) => void
  setEditMode?: (value: boolean) => void
  editMode?: boolean
  isReplyToParentComment: boolean
}

export default function CommentBox({ placeholder, submitButtonText, editMode, setEditMode, displayReplyInput, setDisplayReplyInput, comment, slug, post_id, isReplyToParentComment }: Props) {
  const [ commentBody, setCommentBody ] = React.useState<string>('')
  const [ focusOnInput, setFocusOnInput ] = React.useState<boolean>(false)
  const [ displayEmojiPicker, setDisplayEmojiPicker ] = React.useState(false)

  const [ updateComment ] = DjangoService.useUpdateCommentMutation()
  const user = useAppSelector(state => state.django.profile)
  const inputRef = React.useRef(null)
  const [ createComment ] = DjangoService.useCreateCommentMutation()

  const cancelComment = React.useCallback(() => {
    if (editMode) {
      setEditMode(false)
    }

    setFocusOnInput(false)
    if (displayReplyInput) {
      setDisplayReplyInput(false)
    } else return
  }, [ editMode, setEditMode, displayReplyInput, setDisplayReplyInput, setFocusOnInput ])

  React.useEffect(() => {
    if (editMode) {
      // @ts-ignore
      inputRef?.current.focus()
    }
  }, [ editMode ])

  const leaveComment = () => {
    if (editMode) {
      updateComment({ slug: slug, post_id: post_id, comment_id: comment?.comment_id  })
    } else {
      if (comment) {
        if (comment?.reply_to) {
          createComment({ body: commentBody, post_id: post_id, slug: slug, reply_to: comment?.reply_to })
        } else {
          createComment({ body: commentBody, post_id: post_id, slug: slug, reply_to: comment?.comment_id })
        }
      } else {
        createComment({ body: commentBody, post_id: post_id, slug: slug })
      }
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
      if (!isReplyToParentComment) {
        setCommentBody(`@${comment?.author.username} `)
      }
      // @ts-ignore
      inputRef?.current.focus()
    }
  }, [ displayReplyInput ])

  return (
    <div style={{ width: '100%' }}>
      <CommentInput ref={inputRef} placeholder={placeholder} height={50} onChange={setCommentBody} setFocusOnInput={setFocusOnInput} focusOnInput={focusOnInput}
                    value={commentBody} defaultValue={comment?.body} />
        {focusOnInput && (
          <div className={styles.commentFooter}>
            <HiOutlineEmojiHappy className={styles.emojiIcon} open={true} onClick={openEmojiMenuHandleClick} size={20} />
            <EmojiPicker style={{ position: 'absolute', marginTop: '15px' }} open={displayEmojiPicker} onEmojiClick={onEmojiHandleClick} />
            <div className={styles.buttons}>
              <button className={styles.cancelCommentButton} onClick={cancelComment}>
                <div>
                  <span>Отмена</span>
                </div>
              </button>
              <button onClick={leaveComment} disabled={!commentBody} className={classNames(styles.leaveCommentButton, {[styles.notEmpty]: commentBody })}>
                <div>
                  <span>{submitButtonText}</span>
                </div>
              </button>
            </div>
          </div>
        )}
    </div>
  )
}
