import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import { useRouter } from 'next/router'
import __Input from "@/app/components/modules/form/Input"
import _TextArea from '@/app/components/modules/form/Textarea'

export default function BlogCreate() {
  const router = useRouter()

  const [ title, setTitle ] = React.useState<string>('')
  const [ slug, setSlug ] = React.useState<string>('')
  const [ description, setDescription ] = React.useState<string>('')
  const [ avatar, setImage ] = React.useState<any>(null)

  const [ createBlog, status ] = DjangoService.useCreateBlogMutation()
  const { data: blog_slug } = DjangoService.useGetBlogSlugQuery({ slug })

  const request = async() => {
    // const formData = new FormData()
    // formData.append('avatar', avatar)
    // formData.append('title', title)
    // formData.append('description', description)
    // formData.append('slug', slug)
    // createBlog({ formData })
    // createBlog({ formData })
    createBlog({ title, description, slug })
  }

  const sendImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    setImage(e.target.files[0])
  }

  return (
    <div>
      <__Input width={600} height={50} label={'Название Блога'} onChange={setTitle}  />
      <div>{blog_slug}</div>
      <__Input width={600} height={50} label={'Slug Блога'} onChange={setSlug} />
      <_TextArea width={600} height={100} label={'Описание'} onChange={setDescription} />

      <input type='file' accept='image/*' multiple onChange={sendImage} />
      {avatar && (
        <section>
          File details:
          <ul>
            <li>Name: {avatar.name}</li>
            <li>Type: {avatar.type}</li>
            <li>Size: {avatar.size} bytes</li>
            <img src={URL.createObjectURL(avatar)} height={250} width={250}  />
          </ul>
        </section>
      )}
      <input type={'submit'} value={'Создать блог'} onClick={request} />
    </div>
  )
}