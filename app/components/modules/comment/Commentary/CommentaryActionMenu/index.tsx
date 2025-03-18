import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";

import { GoPin } from "react-icons/go";
import { CiFlag1 } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiPen } from "react-icons/ti";

import styles from "./commentary_action_menu.module.css";

export interface Props {
  slug: string;
  post_id: number;
  comment: any;
  postData: any;
  setEditMode: (value: boolean) => void;
  setDisplayAdditionalMenu: (value: boolean) => void;
  isParent: boolean;
}

export default function CommentaryActionMenu({
  slug,
  post_id,
  postData,
  comment,
  setEditMode,
  setDisplayAdditionalMenu,
  isParent,
}: Props) {
  const user = useAppSelector((state) => state.django.profile);
  const [deleteComment] = DjangoService.useDeleteCommentMutation();

  const deleteCurrentComment = () => {
    deleteComment({
      slug: slug,
      post_id: post_id,
      comment_id: comment.comment_id,
    });
  };

  const editCommentButton = () => {
    // setDisplayAdditionalMenu(false)
    setEditMode(true);
  };

  if (isParent) {
    if (user.is_admin || user.username === postData.blog.owner.username) {
      return (
        <div className={styles.root}>
          <div>
            <GoPin size={21} className={styles.icon} />
            <div>Закрепить</div>
          </div>
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
    } else if (user.username === postData.author.username) {
      return (
        <div className={styles.root}>
          <div>
            <GoPin size={21} className={styles.icon} />
            <div>Закрепить</div>
          </div>
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
            <FaRegTrashCan size={21} className={styles.icon} />
            <div>Пожаловаться</div>
          </div>
        </div>
      );
    }
  } else {
    if (user.is_admin || user.username === postData.blog.owner.username) {
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
    } else if (user.username === postData.author.username) {
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
            <FaRegTrashCan size={21} className={styles.icon} />
            <div>Пожаловаться</div>
          </div>
        </div>
      );
    }
  }
}
