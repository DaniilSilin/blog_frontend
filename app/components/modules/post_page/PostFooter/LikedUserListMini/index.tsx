import React, { ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";

import { PostType, User } from "@/app/types";
import LikedUserList from "@/app/components/modules/post_page/PostFooter/LikedUserListMini/LikedUserList";

import styles from "./liked_user_list_mini.module.css";

const BASE_URL = "http://127.0.0.1:8000";

export interface Props {
  post: PostType;
}

export default function LikedUserListMini({ post }: Props) {
  const [displayModal, setDisplayModal] = React.useState(false);

  const handleChangeModal = React.useCallback(
    (e) => {
      let elem = e.target;

      if (displayModal) {
        if (elem.className.startsWith("modal_3")) {
          elem.style.display = "none";
          setDisplayModal(false);
        }
      } else {
        let modalNode = null;
        if (elem.lastElementChild.className.startsWith("modal_3")) {
          modalNode = elem.lastElementChild;
          modalNode.style.display = "block";
          setDisplayModal(true);
        }
      }
    },
    [displayModal],
  );

  const likedUserListCount = React.useMemo(() => {
    const likedUserList = post?.likes.toString();

    if (likedUserList.slice(-1) === "1" && likedUserList.slice(-2) !== "11") {
      return `Понравилось ${likedUserList} пользователю`;
    } else if (
      (likedUserList.slice(-1) === "2" ||
        likedUserList.slice(-1) === "3" ||
        likedUserList.slice(-1) === "4") &&
      likedUserList.slice(-2) !== "12" &&
      likedUserList.slice(-2) !== "13" &&
      likedUserList.slice(-2) !== "14"
    ) {
      return `Понравилось ${likedUserList} пользователям`;
    } else {
      return `Понравилось ${likedUserList} пользователям`;
    }
  }, [post?.likes]);

  return (
    <div className={styles.root}>
      {/*<div className={styles.title} onClick={handleChangeModal}>*/}
      {/*  {likedUserListCount}*/}
      {/*  <div className={"modal_3"}>*/}
      {/*    <LikedUserList post={post} />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className={styles.likedUserListContainer}>*/}
      {/*  {post?.liked_users.map((user: User, index: number) => (*/}
      {/*    <div key={index}>*/}
      {/*      <Link href={`/profile/${user.username}/`}>*/}
      {/*        <Image*/}
      {/*          title={user.username}*/}
      {/*          src={*/}
      {/*            user.avatar_small*/}
      {/*              ? `${BASE_URL}${user.avatar_small}`*/}
      {/*              : "/img/default/avatar_default.jpg"*/}
      {/*          }*/}
      {/*          className={styles.avatar}*/}
      {/*          width={35}*/}
      {/*          height={35}*/}
      {/*          alt={""}*/}
      {/*        />*/}
      {/*      </Link>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </div>
  );
}
