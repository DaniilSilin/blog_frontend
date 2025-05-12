import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";

import Image from "next/image";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";

import styles from "./like_by_author_button.module.css";

const BASE_URL = "http://127.0.0.1:8000";

export interface Props {
  slug: string;
  post_id: number;
  post: any;
  comment: any;
}

export default function LikeByAuthorButton({
  slug,
  post_id,
  post,
  comment,
}: Props) {
  const user = useAppSelector((state) => state.django.profile);

  const [setOrRemoveLikeByAuthor] =
    DjangoService.useSetOrRemoveLikeByAuthorMutation();

  const setLikeByAuthorButton = () => {
    setOrRemoveLikeByAuthor({ slug, post_id, comment_id: comment?.comment_id });
  };

  return (
    <>
      {!user.isGuest && user?.username === post?.author.username ? (
        <div className={styles.root}>
          {comment?.liked_by_author ? (
            <button
              className={styles.likedByAuthorButton}
              onClick={setLikeByAuthorButton}
              title={'Удалить отметку "Нравится"'}
            >
              <Image
                src={
                  post?.author.avatar_small
                    ? `${BASE_URL}${post?.author.avatar_small}`
                    : "/img/default/avatar_default.jpg"
                }
                className={styles.likedByAuthorAvatar}
                width={24}
                height={24}
                alt={""}
              />
              <FcLike
                size={5}
                className={styles.likedByAuthorHeart}
                style={{ marginRight: "-8px" }}
              />
            </button>
          ) : (
            <button title={"Понравилось автору"}>
              <FaRegHeart
                size={18}
                className={styles.notLikedByAuthorButton}
                onClick={setLikeByAuthorButton}
              />
            </button>
          )}
        </div>
      ) : (
        <>
          {comment?.liked_by_author.toString() === "true" && (
            <div
              className={styles.root}
              title={`❤️ от автора поста "${post?.author.username}"`}
            >
              <Image
                src={
                  post?.author.avatar_small
                    ? `${BASE_URL}${post?.author.avatar_small}`
                    : "/img/default/avatar_default.jpg"
                }
                className={styles.likedByAuthorAvatar}
                width={24}
                height={24}
                alt={""}
              />
              <FcLike size={10} className={styles.likedByAuthorHeart} />
            </div>
          )}
        </>
      )}
    </>
  );
}
