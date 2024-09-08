import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import { useRouter } from 'next/router'

export default function BlogCreate() {
  const router = useRouter()
  // const token = localStorage.getItem("token")
  //
  // React.useEffect(() => {
  //   if (!token) {
  //     router.replace("/authorization")
  //   }
  // }, [router, token])

  const [ title, setTitle ] = React.useState<string>('alex2')
  const [ slug, setSlug ] = React.useState<string>('alex2')
  const [ description, setDescription ] = React.useState<string>('alex2')

  const [ createBlog ] = DjangoService.useCreateBlogMutation()

  const request = () => {
    createBlog({ title, slug, description })
  }

  return (
    <div>
      <input />
      <input />
      <input />
      <input />
      <input type={'submit'} onClick={request} />
    </div>
  )
}