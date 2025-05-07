import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import Image from "next/image";
import Link from "next/link";
import { Post, User } from "@/app/types";

import styles from "@/app/components/modules/post_page/PostFooter/post_footer.module.css";

export interface Props {
  post: Post;
  likedUserList: any;
  triggerQuery: any;
  isFetching: any;
  page: number;
  setPage: (value: number) => void;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function LikedUserList({
  setPage,
  post,
  likedUserList,
  triggerQuery,
  isFetching,
  page,
}: Props) {
  const modalWindowUseRef = React.useRef(null);
  const [currentHeight, setCurrentHeight] = React.useState<number>(0);
  const [maxHeight, setMaxHeight] = React.useState<number>(0);

  React.useEffect(() => {
    const onScroll = () => {
      if (modalWindowUseRef.current) {
        // @ts-ignore
        setCurrentHeight(modalWindowUseRef.current.scrollTop);
        setMaxHeight(modalWindowUseRef.current.scrollTopMax);
      }
      // const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight
      const isAtTheBottom = maxHeight === currentHeight;
      if (isAtTheBottom && !isFetching) {
        console.log(page);
        triggerQuery({
          slug: post.blog.slug,
          post_id: post.post_id,
          page: page,
        });
        setPage(page + 1);
      }
    };
    modalWindowUseRef.current.addEventListener("scroll", onScroll);
  }, [
    page,
    setPage,
    isFetching,
    modalWindowUseRef.current,
    triggerQuery,
    setMaxHeight,
    setCurrentHeight,
    maxHeight,
    currentHeight,
  ]);

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

  <div>
    {post.likes > 0 && (
        <>
          {isVisible && (
              <div className={styles.liked_users_container}>
                {post?.liked_users.map((user: User) => (
                    <div key={user.id}>
                      <Link href={`/profile/${user.username}/`}>
                        <Image
                            src={
                              user.avatar_small
                                  ? `${BASE_URL}${user.avatar_small}`
                                  : "/img/default/avatar_default.jpg"
                            }
                            width={20}
                            height={20}
                            alt=""
                        />
                      </Link>
                      <Link href={`/profile/${user.username}/`}>
                        {user.username}
                      </Link>
                    </div>
                ))}
                <div onClick={handleDynamicContentClick}>
                  Посмотреть всех пользователей
                </div>
              </div>
          )}
        </>
    )}
  </div>
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      <LikedUserList
          setPage={setPage}
          likedUserList={likedUserList}
          page={page}
          triggerQuery={triggerQuery}
          isFetching={isFetching}
          post={post}
      />
    </div>
  </div>

  return (
      <div>
        <div className={styles.close}>x</div>
        <div>Понравилось {post.likes} пользователям</div>
        <div ref={modalWindowUseRef} style={{overflow: "auto", height: "80px"}}>
          {likedUserList?.results.map((user: User) => (
              <div key={user.id} style={{display: "flex", padding: "8px"}}>
                <Image
                    src={
                      user.avatar_small
                          ? `${BASE_URL}${user.avatar_small}`
                          : "/img/default/avatar_default.jpg"
                    }
                    width={30}
                    height={30}
                    alt=""
                />
                <div>{user.username}</div>
              </div>
          ))}
        </div>
      </div>
  );
}
