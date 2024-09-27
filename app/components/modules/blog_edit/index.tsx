import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import __Input from "@/app/components/modules/form/Input"

export default function BlogEdit({ slug }) {
  const [ deleteBlog ] = DjangoService.useDeleteBlogMutation()
  const [ updateBlog ] = DjangoService.useUpdateBlogMutation()

  const [ title, setTitle ] = React.useState<string>('')
  const [ description, setDescription ] = React.useState<string>('')

  const deleteItem = () => {
    deleteBlog({ slug })
  }

  const updateItem = () => {
    updateBlog({ slug, title, description })
  }

  return (
    <div>
      <div>
        <__Input width={200} height={50} onChange={setTitle} label={'Название блога'} />
        <__Input width={200} height={50} onChange={setDescription} label={'Описание блога'} />
        <input type={'submit'} onClick={updateItem} value={'Обновить Блог'} />
        <input type={'submit'} onClick={deleteItem} value={'Удалить Блог'} />
      </div>
    </div>
  )
}