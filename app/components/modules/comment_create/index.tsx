import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import __Input from "@/app/components/modules/form/Input"
import { useRouter } from 'next/router'

export interface Props {
  placeholder?: string
  slug: string
  post_id: number
}

export default function CommentCreate({ post_id, slug, placeholder }: Props) {
  const [ comment, setComment ] = React.useState<string>('')
  const [ createComment ] = DjangoService.useCreateCommentMutation()

  const createCommentFunc = () => {
    createComment({ body: comment, post_id: post_id, slug: slug })
  }

  return (
    <div>
      <__Input width={200} placeholder={placeholder} height={50} onChange={setComment} />
      <input type={"submit"} onClick={createCommentFunc} disabled={!comment} value={'Отправить'} />
    </div>
  )
}