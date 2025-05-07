import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";

import { PostType } from "@/app/types";

import { GoPin } from "react-icons/go";
import { MdOutlineContentCopy } from "react-icons/md";
import { PiWarningCircleLight } from "react-icons/pi";

import styles from "./additional_menu_list.module.css";

export interface Props {
  setShowMenu: (value: boolean) => void;
  post: PostType;
}

export default function AdditionalMenuList({ post, setShowMenu }: Props) {
  const user = useAppSelector((state) => state.django.profile);

  const pinPost = () => {
    setShowMenu(false);
  };

  const unpinPost = () => {
    setShowMenu(false);
  };

  const copyLink = () => {
    setShowMenu(false);
  };

  if (user?.username === post?.blog.owner.username || user?.is_admin) {
    return (
      <div className={styles.root}>
        <button onClick={pinPost}>
          <GoPin size={20} />
          Закрепить пост
        </button>
        <button onClick={copyLink}>
          <MdOutlineContentCopy size={20} />
          Скопировать ссылку
        </button>
      </div>
    );
  } else if (
    (user?.username === post?.blog.owner.username || user?.is_admin) &&
    post?.is_pinned
  ) {
    return (
      <div className={styles.root}>
        <button onClick={pinPost}>
          <GoPin size={20} />
          Открепить пост
        </button>
        <button onClick={copyLink}>
          <MdOutlineContentCopy size={20} />
          Скопировать ссылку
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.root}>
        <button>
          <MdOutlineContentCopy size={20} />
          Скопировать ссылку
        </button>
        <button>
          <PiWarningCircleLight size={20} />
          Пожаловаться
        </button>
      </div>
    );
  }
}
