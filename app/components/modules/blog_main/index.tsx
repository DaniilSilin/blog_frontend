import React from 'react'
import BlogItem from "@/app/components/modules/blog_page";
import DjangoService from "@/app/store/services/DjangoService";
import styles from "@/app/components/modules/post/post_page/post_page.module.css";

export interface Props {
    slug: string
}

export default function BlogMain({ slug }: Props) {
  const { data: blogData } = DjangoService.useGetBlogQuery({ slug: slug })

  return (
    <BlogItem slug={slug}>
      {(!blogData?.map || !blogData?.map) ? (
        <h1>Создатель блога не разместил какую-либо информацию</h1>
      ) : (
      <>
        <div style={{fontSize: '30px', marginBottom: '10px'}}>Карта</div>
        <div dangerouslySetInnerHTML={{__html: blogData?.map}}></div>
      </>
      )}
    </BlogItem>
  )
}