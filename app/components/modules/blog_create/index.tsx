import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import { useRouter } from 'next/router'
import __Input from "@/app/components/modules/form/Input"

export default function BlogCreate() {
  const router = useRouter()

  // React.useEffect(() => {
  //   const token = localStorage.getItem("authToken")
  //
  //   if (!token) {
  //     router.replace("/login")
  //   }
  // }, [ router ])

  const [ title, setTitle ] = React.useState<string>('')
  const [ slug, setSlug ] = React.useState<string>('')
  const [ description, setDescription ] = React.useState<string>('')

  const [ createBlog, status ] = DjangoService.useCreateBlogMutation()
  const { data: blog_slug } = DjangoService.useGetBlogSlugQuery({ slug })
  const request = () => {
    createBlog({ title, slug, description })
  }

  if (status.isSuccess === 'fulfilled') {
      router.push(`blog/${slug}/`)
  }
  console.log(status.isSuccess)

  return (
    <div>
      <__Input width={400} height={50} label={'Название Блога'} onChange={setTitle}  />
      <div>{blog_slug}</div>
      <__Input width={400} height={50} label={'Slug Блога'} onChange={setSlug} />
      <__Input width={400} height={50} label={'Описание'} onChange={setDescription} />
      <input type={'submit'} value={'Создать блог'} onClick={request} />
    </div>
  )
}