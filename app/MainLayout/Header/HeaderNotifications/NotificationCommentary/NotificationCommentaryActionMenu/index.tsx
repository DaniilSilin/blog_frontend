import React from "react";
import { useAppSelector } from "@/app/store";
import DjangoService from "@/app/store/services/DjangoService";

import { PostType, CommentType } from "@/app/types";

import { GoPin } from "react-icons/go";
import { TiPen } from "react-icons/ti";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiFlag1 } from "react-icons/ci";

import CommentaryActionMenu from "@/app/components/modules/comment/Commentary/CommentaryActionMenu";

import styles from "./notification_commentary_action_menu.module.css";

export interface Props {
  slug: string;
  post_id: number;
  post: PostType;
  comment: CommentType;
  setDisplayActionMenu: (value: boolean) => void;
}

export default function NotificationCommentaryActionMenu({
  slug,
  post_id,
  post,
  comment,
  setDisplayActionMenu,
}: Props) {
  const user = useAppSelector((state) => state.django.profile);

  const [deleteComment] = DjangoService.useDeleteCommentMutation();
  const [pinComment] = DjangoService.usePinCommentMutation();

  const pinCommentButton = () => {
    pinComment({ slug, post_id, comment_id: comment.comment_id });
    setDisplayActionMenu(false);
  };

  const deleteCurrentComment = () => {
    deleteComment({
      slug,
      post_id,
      comment_id: comment.comment_id,
    });
    setDisplayActionMenu(false);
  };

  const editCommentButton = () => {
    // setEditMode(true);
    setDisplayActionMenu(false);
  };

  if (false) {
    if (user.is_admin || user.username === post.blog.owner.username) {
      return (
        <div className={styles.root}>
          <div onClick={pinCommentButton}>
            <GoPin size={21} className={styles.icon} />
            Закрепить
          </div>
          <div onClick={editCommentButton}>
            <TiPen size={21} className={styles.icon} />
            Изменить
          </div>
          <div onClick={deleteCurrentComment}>
            <FaRegTrashCan size={21} className={styles.icon} />
            Удалить
          </div>
        </div>
      );
    } else if (user.username === post.author.username) {
      return (
        <div className={styles.root}>
          <div onClick={pinCommentButton}>
            <GoPin size={21} className={styles.icon} />
            Закрепить
          </div>
          <div onClick={editCommentButton}>
            <TiPen size={21} className={styles.icon} />
            Изменить
          </div>
          <div onClick={deleteCurrentComment}>
            <FaRegTrashCan size={21} className={styles.icon} />
            Удалить
          </div>
        </div>
      );
    } else if (!user.isGuest && comment.author.username === user.username) {
      return (
        <div className={styles.root}>
          <div onClick={editCommentButton}>
            <TiPen size={21} className={styles.icon} />
            <div>Изменить</div>
          </div>
          <div onClick={deleteCurrentComment}>
            <FaRegTrashCan size={21} className={styles.icon} />
            <div>Удалить</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.root}>
          <div onClick={deleteCurrentComment}>
            <CiFlag1 size={21} className={styles.icon} />
            <div>Пожаловаться</div>
          </div>
        </div>
      );
    }
  } else {
    if (user.is_admin || user.username === post.blog.owner.username) {
      return (
        <div className={styles.root}>
          <div onClick={editCommentButton}>
            <TiPen size={21} className={styles.icon} />
            <div>Изменить</div>
          </div>
          <div onClick={deleteCurrentComment}>
            <FaRegTrashCan size={21} className={styles.icon} />
            <div>Удалить</div>
          </div>
        </div>
      );
    } else if (user.username === post.author.username) {
      return (
        <div className={styles.root}>
          <div onClick={editCommentButton}>
            <TiPen size={21} className={styles.icon} />
            <div>Изменить</div>
          </div>
          <div onClick={deleteCurrentComment}>
            <FaRegTrashCan size={21} className={styles.icon} />
            <div>Удалить</div>
          </div>
        </div>
      );
    } else if (!user.isGuest && comment.author.username === user.username) {
      return (
        <div className={styles.root}>
          <div onClick={editCommentButton}>
            <TiPen size={21} className={styles.icon} />
            <div>Изменить</div>
          </div>
          <div onClick={deleteCurrentComment}>
            <FaRegTrashCan size={21} className={styles.icon} />
            <div>Удалить</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.root}>
          <div onClick={deleteCurrentComment}>
            <CiFlag1 size={21} className={styles.icon} />
            <div>Пожаловаться</div>
          </div>
        </div>
      );
    }
  }
}
