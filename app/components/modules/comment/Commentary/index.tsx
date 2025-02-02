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
import CommentaryActionMenu from "@/app/components/modules/comment/Commentary/CommentaryActionMenu";

export interface Props {
  comment: any
  slug: string
  post_id: number
  width: number
  height: number
  postData: any
}

const BASE_URL = 'http://localhost:8000'

export default function Commentary({ slug, post_id, comment, width, height, postData }: Props) {
  const [ displayReplyInput, setDisplayReplyInput] = React.useState(false)
  const user = useAppSelector(state => state.django.profile)
  const commentAdditionalMenuRef = React.useRef(null)
  const [ displayAdditionalMenu, setDisplayAdditionalMenu ] = React.useState<boolean>(false)
  const [ editMode, setEditMode ] = React.useState(false)

  const showReplyInputHandleChange = React.useCallback(() => {
    setDisplayReplyInput(true)
  }, [ setDisplayReplyInput ])

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
    <div style={{ display: 'flex', marginBottom: '10px' }}>
      <div style={{marginRight: '16px'}}>
        <Link href={`/profile/${comment.author.username}/`}>
          <img className={styles.avatar} src={`${BASE_URL}${comment.author.avatar_small}`} width={width} height={height} alt=''/>
        </Link>
      </div>
      {editMode ? (
        <CommentBox editMode={editMode} setEditMode={setEditMode} comment={comment} placeholder={''}
                    submitButtonText={'Сохранить'} slug={slug} post_id={post_id} setDisplayReplyInput={setDisplayReplyInput}
        />
      ) : (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '1000px' }}>
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
            <div className={styles.commentFooter} style={{display: 'flex'}}>
              <LikeTwoTone twoToneColor="#000000"/>
              <div>{comment.likes}</div>
              <DislikeTwoTone twoToneColor="#000000"/>
              <div>{comment.dislikes}</div>
              {comment?.isLikedByPostAuthor && (
                  <div style={{margin: '0 5px'}}>
                    <img src={`${BASE_URL}${postData?.author.avatar_small}`} style={{borderRadius: '50%'}}
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
              <div className={styles.commentAnswer} onClick={showReplyInputHandleChange}>Ответить</div>
            </div>
            <div>
              {displayReplyInput && (
                  <div style={{display: 'flex'}}>
                    <img src={`${BASE_URL}${user?.avatar_small}`} width={32} height={32}
                         style={{ borderRadius: '50%', marginRight: '5px' }} alt=''/>
                    <CommentBox comment={comment} post_id={post_id} slug={slug} editMode={editMode}
                                displayReplyInput={displayReplyInput} setDisplayReplyInput={setDisplayReplyInput}
                                placeholder={'Введите ответ'} submitButtonText={'Ответить'}/>
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