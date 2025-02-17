import React from 'react'
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store"
import OwnerBlogList from "@/app/components/modules/blogs_my/OwnerBlogList"
import AuthorBlogList from "@/app/components/modules/blogs_my/AuthorBlogList"


export default function BlogsMy() {
  const user = useAppSelector(state => state.django.profile)
  const { data: blogsWhereUserIsOwner } = DjangoService.useBlogsWhereUserIsOwnerQuery({ username: user?.username })
  const { data: blogsWhereUserIsAuthor } = DjangoService.useBlogsWhereUserIsAuthorQuery({ username: user?.username })

  return (
    <div>
      <div style={{ fontSize: '30px', marginBottom: '10px' }}>Блоги, созданные Вами:</div>
      {blogsWhereUserIsOwner?.count === 0 ? (
        <div style={{ fontSize: '16px' }}>
          Вы не являетесь создателем какого-либо блога
        </div>
      ) : (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {blogsWhereUserIsOwner?.results.map((item) => (
            <OwnerBlogList blog={item} />
          ))}
        </div>
      )}
      <div style={{fontSize: '30px', marginBottom: '10px'}}>Блоги, где Вы являетесь автором:</div>
      {blogsWhereUserIsAuthor?.count === 0 ? (
        <div style={{ fontSize: '16px' }}>
            Вы не являетесь автором какого-либо блога
        </div>
      ) : (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {blogsWhereUserIsAuthor?.results.map((item) => (
            <AuthorBlogList blog={item} />
          ))}
        </div>
      )}
    </div>
  )
}