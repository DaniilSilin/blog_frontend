import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./blog_comment_avatar.module.css";

export interface Props {
  comment: any;
  isParentComment?: boolean;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function BlogCommentAvatar({ comment, isParentComment }: Props) {
  return (
    <>
      {isParentComment ? (
        <div className={styles.authorAvatarParentContainer}>
          <Link href={`/profile/${comment.author.username}/`}>
            {comment.author.avatar_small ? (
              <Image
                src={`${BASE_URL}${comment.author.avatar_small}`}
                className={styles.parentAuthorAvatar}
                alt={""}
                width={50}
                height={50}
              />
            ) : (
              <Image
                src={"/img/default/avatar_default.jpg"}
                className={styles.parentAuthorAvatar}
                alt={""}
                width={50}
                height={50}
              />
            )}
          </Link>
        </div>
      ) : (
        <div className={styles.authorAvatarChildContainer}>
          <Link href={`/profile/${comment.author.username}/`}>
            {comment.author.avatar_small ? (
              <Image
                src={`${BASE_URL}${comment.author.avatar_small}`}
                className={styles.childAuthorAvatar}
                alt={""}
                width={50}
                height={50}
              />
            ) : (
              <Image
                src={"/img/default/avatar_default.jpg"}
                className={styles.childAuthorAvatar}
                alt={""}
                width={50}
                height={50}
              />
            )}
          </Link>
        </div>
      )}
    </>
  );
}
