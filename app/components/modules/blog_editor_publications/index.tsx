import React, {ChangeEvent} from 'react'
import DjangoService from "@/app/store/services/DjangoService";
import { Progress } from "antd/lib"

import styles from './BlogEditorPublications.module.css'

export default function BlogEditorPublications({ slug }) {
  const [ selectedPosts, setSelectedPosts ] = React.useState([])
  const { data } = DjangoService.useBlogEditorPostsQuery({ slug: slug })
  console.log(data)

  const handleChangeSelectAll = React.useCallback(() => {
    setSelectedPosts()
  }, [ setSelectedPosts ])

  const handleChangeSelectedPosts = React.useCallback((e: ChangeEvent<HTMLInputElement>, items) => {
    if (e.target.checked) {
      console.log(e.target)
      setSelectedPosts([...selectedPosts])
    } else {
      console.log(321)
    }
  }, [ selectedPosts, setSelectedPosts ])

  return (
    <div className={styles.root}>
      <div className={styles.title}>Публикации</div>
      <div className={styles.tabsMenu}>
        <div className={styles.TabsMenuTab}>Опубликованные {data?.count_of_published_posts}</div>
        <div className={styles.TabsMenuTab}>Черновики {data?.const_of_drafted_posts}</div>
      </div>
      <div>
        <div className={styles.selectionBar}>
          <div className={styles.selectionBarCell}><input type={'checkbox'} onChange={handleChangeSelectAll} /></div>
          <div className={styles.selectionBarCell}>Публикация</div>
          <div className={styles.selectionBarCell}>Дата</div>
          <div className={styles.selectionBarCell}>Просмотры</div>
          <div className={styles.selectionBarCell}>Комментарии</div>
          <div className={styles.selectionBarCell}>% Нравится</div>
        </div>
        {data?.results.map((item) => (
          <div className={styles.publicationsList} style={{ display: 'flex' }}>
            <input type={'checkbox'} onChange={handleChangeSelectedPosts} />
            <div>{item.title} =</div>
            <div>{item.created_at}=</div>
            <div>{item.views}=</div>
            <div>{item.comments}=</div>
            <div>
              <div>{item.likes}/{item.dislikes}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}