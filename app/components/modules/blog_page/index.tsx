import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'


export default function BlogItem() {
  const { data } = DjangoService.useGetBlogQuery({slug: 'alex'})
  const [ deleteBlog ] = DjangoService.useDeleteBlogMutation()
  const [ updateBlog ] = DjangoService.useUpdateBlogMutation()

  const [ title, setTitle ] = React.useState<string>('Yesterday three 2-story houses burned down to ashes in her hometown. - Вчера в ее родном городе сгорело дотла три двухэтажных дома. ')
  const [ description, setDescription ] = React.useState<string>('Все эти правила и особенности числительных в английском только на первый взгляд кажутся труднозапоминаемыми и сложными. На самом деле, залог успеха - это регулярная практика, поэтому смотрите новости, читайте газеты, статьи со статистическими данными, книги по истории. Так запомнить числа будет намного проще и интереснее.  ')

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