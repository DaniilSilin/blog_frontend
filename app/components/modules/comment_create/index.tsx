import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import __Input from "@/app/components/modules/form/Input"
import { useRouter } from 'next/router'

export default function CommentCreate() {
  const router = useRouter()
  const [ comment, setComment ] = React.useState<string>('')
  const [ createComment ] = DjangoService.useCreateCommentMutation()

  const getSlug = React.useMemo(() => {
    return router.asPath.split('/')[2]
  }, [ router ])

  const getPostID = React.useMemo(() => {
    return router.asPath.split('/')[4]
  }, [ router ])

  const createCommentFunc = () => {
    createComment({ body: comment, post_id: getPostID, slug: getSlug })
  }

  return (
    <div>
      <__Input width={200} height={50} onChange={setComment} />
      <input type={"submit"} onClick={createCommentFunc} />
    </div>
  )
}