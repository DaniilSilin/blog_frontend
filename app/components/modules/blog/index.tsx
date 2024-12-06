import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import Filter from '../filter'

import { RxDotsHorizontal } from "react-icons/rx"

import styles from './blog.module.css'
import moment from 'moment'
import 'moment/locale/ru'

export default function BlogList() {
  const [ searchInput, setSearchInput ] = React.useState<string>('')
  const [ orderList, setOrderList ] = React.useState<string[]>([])
  const [ date, setDate ] = React.useState<[string | null, string | null]>([null, null])

  const { data: userData } = DjangoService.useGetUserDataQuery()
  const { data: blogs } = DjangoService.useGetBlogPaginatedListQuery({ limit: 1, search: searchInput, order: orderList, date: date })

  const [ subscribeBlog ] = DjangoService.useSubscribeBlogMutation()
  const [ unsubscribeBlog ] = DjangoService.useUnsubscribeBlogMutation()

  const subscribe = ( slug ) => {
    subscribeBlog({ slug })
  }
  const unsubscribe = ( slug ) => {
    unsubscribeBlog({ slug })
  }
  console.log(date)

  return (
      <div className={styles.root}>
        <Filter date={date} setDate={setDate} searchInput={searchInput} setSearchInput={setSearchInput} orderList={orderList} setOrderList={setOrderList} />
         {blogs?.map((blog, index) => (
             <div key={index} className={styles.block}>
               <div className={styles.header}>
                 <div>{moment(blog.created_at).format("D MMMM hh:mm")}</div>
                 <RxDotsHorizontal/>
               </div>
               <div className={styles.title}>
                 <div>{blog.title}</div>
               </div>
               <div className={styles.description}>
                 <div>{blog.description}</div>
               </div>
               <div style={{ marginBottom: '10px', fontSize: '20px' }}>
                 <div>Комментариев: {blog.count_of_commentaries}</div>
                 <div>Постов: {blog.count_of_posts}</div>
               </div>
               <div style={{ marginBottom: '10px' }}>
                 Обновлено в последний раз: {moment(blog.updated_at).format("D MMMM YYYY hh:mm")}
               </div>
               <div style={{ marginBottom: '10px', display: 'flex'}}>
                 Авторы блога:
                 <div>{blog.authors.map((item) => (
                     <div key={item.id}>
                       <div>{item.username}</div>
                     </div>
                 ))}
                 </div>
               </div>
               <div>
                 {userData?.subscriptions.find(blogId => blogId === blog.id) ?
                     (<div className={styles.unsubscribeButton} onClick={() => unsubscribe(blog.slug)}>Отписаться</div>) : (
                     <div className={styles.subscribeButton} onClick={() => subscribe(blog.slug)}>Подписаться</div>)}
               </div>
             </div>
         ))}
      </div>
  )
}