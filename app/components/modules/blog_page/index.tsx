import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'


export default function BlogItem() {
  const { data } = DjangoService.useGetBlogQuery({slug: 'alex'})
  const [ deleteBlog ] = DjangoService.useDeleteBlogMutation()
  const [ updateBlog ] = DjangoService.useUpdateBlogMutation()

  const [ title, setTitle ] = React.useState<string>('')
  const [ description, setDescription ] = React.useState<string>('')

  const deleteItem = () => {
    deleteBlog({slug: '22222'})
  }

  const updateItem = () => {
    updateBlog({ slug: 'alex', title, description })
  }

  if (!data) {
    return null
  }

  return (
    <div>
      <div>
          <div key={data.id}>
            <div>{data.title}</div>
            <div>{data.slug}</div>
            <div>{data.description}</div>
            <div>{data.created_at}</div>
            <div>{data.updated_at}</div>
            <div>{data.count_of_posts}</div>
            <div>{data.count_of_commentaries}</div>
            <div>{data.owner}</div>
            <div>{data.authors.map((item) => (
              <div key={item.id}>
                <div>{item.id}</div>
                <div>{item.username}</div>
              </div>
            ))}
            </div>
          </div>
      </div>
      <input type={'submit'} onClick={deleteItem} />
      <input type={'submit'} onClick={updateItem} />
    </div>
  )
}