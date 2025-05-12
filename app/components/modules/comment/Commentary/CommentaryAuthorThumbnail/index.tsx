import React from "react";
import Link from "next/link";
import Image from "next/image";

import { CommentType } from "@/app/types";

import styles from "./commentary_author_thumbnail.module.css";

const BASE_URL = "http://127.0.0.1:8000";

export interface Props {
  width: number;
  height: number;
  comment: CommentType;
}

export default function CommentaryAuthorThumbnail({
  comment,
  width,
  height,
}: Props) {
  return (
    <div className={styles.root}>
      <Link href={`/profile/${comment.author.username}/`}>
        <Image
          className={styles.commentAuthorAvatar}
          src={
            comment.author.avatar_small
              ? `${BASE_URL}${comment.author.avatar_small}`
              : "/img/default/avatar_default.jpg"
          }
          width={width}
          height={height}
          alt={""}
        />
      </Link>
    </div>
  );
}
