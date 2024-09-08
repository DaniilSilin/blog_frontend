import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'

export default function BlogList() {
  const { data, error, isLoading } = DjangoService.useGetBlogPaginatedListQuery({limit: 2})
  console.log(data)

  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>
          <div>{item.title}</div>
          <div>{item.slug}</div>
          <div>{item.description}</div>
          <div>{item.created_at}</div>
          <div>{item.updated_at}</div>
          <div>{item.count_of_posts}</div>
          <div>{item.count_of_commentaries}</div>
          <div>{item.owner}</div>
          <div>{item.authors.map((item) => (
            <div key={item.id}>
              <div>{item.id}</div>
              <div>{item.username}</div>
            </div>
          ))}
          </div>
        </div>
      ))}
    </div>
  )
}