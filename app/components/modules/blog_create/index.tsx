import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import { useRouter } from 'next/router'
import __Input from "@/app/components/modules/form/Input"

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
      <__Input width={400} height={50} label={'Название Блога'} onChange={setTitle}  />
      <__Input width={400} height={50} label={'Slug Блога'} onChange={setSlug} />
      <__Input width={400} height={50} label={'Описание'} onChange={setDescription} />
      <input type={'submit'} value={'Создать блог'} onClick={request} />
    </div>
  )
}