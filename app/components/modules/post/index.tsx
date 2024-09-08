import React from 'react'
import DjangoService from "@/app/store/services/DjangoService";


export default function PostPaginatedList() {
  const { data } = DjangoService.useGetPostPaginatedListQuery({limit: 1})


  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>
          <div>{item.title}</div>
          <div>{item.author}</div>
          <div>{item.is_published}</div>
          <div>{item.created_at}</div>
        </div>
      ))}
    </div>
  )
}