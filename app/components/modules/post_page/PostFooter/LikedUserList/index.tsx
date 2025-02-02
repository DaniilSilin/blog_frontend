import React from 'react'
import styles from "@/app/components/modules/post_page/PostFooter/post_footer.module.css";
import { Post, User } from '../../../../../types'
import DjangoService from "@/app/store/services/DjangoService";

export interface Props {
  post: Post
  likedUserList: any
  triggerQuery: any
  isFetching: any
  page: number
  setPage: (value: number) => void
}

const BASE_URL = 'http://localhost:8000'

export default function LikedUserList({ setPage, post, likedUserList, triggerQuery, isFetching, page }:Props) {
  const modalWindowUseRef = React.useRef(null)
  const [ currentHeight, setCurrentHeight ] = React.useState<number>(0)
  const [ maxHeight, setMaxHeight ] = React.useState<number>(0)

  React.useEffect(() => {
    const onScroll = () => {
      if (modalWindowUseRef.current) {
        // @ts-ignore
        setCurrentHeight(modalWindowUseRef.current.scrollTop)
        setMaxHeight(modalWindowUseRef.current.scrollTopMax)
      }
      // const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight
      const isAtTheBottom = maxHeight === currentHeight
      if (isAtTheBottom && !isFetching) {
        console.log(page)
        triggerQuery({ slug: post.blog.slug, post_id: post.post_id, page: page })
        setPage(page + 1)
      }
    }
    modalWindowUseRef.current.addEventListener("scroll", onScroll)
  }, [ page, setPage, isFetching, modalWindowUseRef.current, triggerQuery, setMaxHeight, setCurrentHeight, maxHeight, currentHeight ])

  // React.useEffect(() => {
  //   // @ts-ignore
  //   // setMaxHeight(divElement.current.scrollTopMax)
  //   const handleScroll = () => {
  //     if (modalWindowUseRef.current) {
  //       // @ts-ignore
  //       setCurrentHeight(modalWindowUseRef.current.scrollTop)
  //       setMaxHeight(modalWindowUseRef.current.scrollTopMax)
  //       // @ts-ignore
  //       console.log(modalWindowUseRef.current.scrollTopMax)
  //     }
  //   }
  //   // @ts-ignore
  //   modalWindowUseRef.current.addEventListener("scroll", handleScroll)
  // }, [ modalWindowUseRef.current, setCurrentHeight, setMaxHeight ])

  return (
    <div>
       <div className={styles.close}>x</div>
       <div>Понравилось {post.likes} пользователям</div>
      <div ref={modalWindowUseRef} style={{ overflow: 'auto', height: '80px' }}>
        {likedUserList?.results.map((user: User) => (
          <div key={user.id} style={{ display: 'flex', padding: '8px' }}>
            <img src={`${BASE_URL}${user.avatar}`} width={30} height={30} alt="" />
            <div>{user.username}</div>
          </div>
        ))}
      </div>
    </div>
  )
}