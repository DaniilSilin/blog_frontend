import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import Filter from '../filter'

import { RxDotsHorizontal } from "react-icons/rx";
import { GoComment } from "react-icons/go";
import { GoHeart } from "react-icons/go";

import styles from './blog.module.css'
import moment from 'moment'
import 'moment/locale/ru';

export default function BlogList() {
  const [ searchInput, setSearchInput ] = React.useState<string>('')
  const [ orderList, setOrderList ] = React.useState<string[]>([])

  moment.locale('ru')
  const { data } = DjangoService.useGetBlogPaginatedListQuery({ limit: 1, search: searchInput, order: orderList })

  const [ subscribeBlog ] = DjangoService.useSubscribeBlogMutation()
  const [ unsubscribeBlog ] = DjangoService.useUnsubscribeBlogMutation()

  const subscribe = () => {
    subscribeBlog({ slug: 'apple' })
  }

  const unsubscribe = () => {
    unsubscribeBlog({ slug: 'alex2' })
  }

  return (
    <div className={styles.root}>
      <Filter searchInput={searchInput} setSearchInput={setSearchInput} orderList={orderList} setOrderList={setOrderList} />
      {data?.map((item) => (
        <div className={styles.block}>
          <div className={styles.header}>
            <div>{moment(item.created_at).format("D MMMM hh:mm")}</div>
            <RxDotsHorizontal />
          </div>
          <div className={styles.title}>
            <div >{item.title}</div>
          </div>
          <div>
            <div style={{ padding: '15px' }}>{item.description}</div>
          </div>
          <div style={{ display: 'flex', fontSize: '20px'}}>
            <div>{item.count_of_commentaries} Комментариев</div>
            <div>{item.count_of_posts} Постов</div>
          </div>
          <div>
            Обновлено в последний раз: {moment(item.updated_at).format("D MMMM YYYY hh:mm")}
          </div>
          <div style={{ display: 'flex'}}>
            <div style={{ backgroundColor: 'blue', padding: '15px', width: '120px' }} onClick={subscribe}>
              Подписаться
            </div>
            {/*<div style={{ backgroundColor: 'violet', padding: '15px', width: '120px' }} onClick={unsubscribe}>*/}
            {/*  Отписаться*/}
            {/*</div>*/}
            Авторы блога:
            <div>{item.authors.map((item) => (
              <div key={item.id}>
                <div>{item.username}</div>
              </div>
            ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}