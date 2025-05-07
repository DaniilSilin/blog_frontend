import React from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiPen } from "react-icons/ti";
import DjangoService from "@/app/store/services/DjangoService";

import styles from "./additional_menu.module.css";

export interface Props {
  slug: string;
  comment: any;
  setIsEditModeOn: (value: boolean) => void;
}

export default function AdditionalMenu({
  slug,
  comment,
  setIsEditModeOn,
}: Props) {
  const menuRef = React.useRef(null);

  const [deleteComment] = DjangoService.useDeleteCommentMutation();

  const [displayAdditionalMenu, setDisplayAdditionalMenu] =
    React.useState(false);

  const editCommentButton = () => {
    setIsEditModeOn(true);
  };

  const deleteCommentButton = () => {
    deleteComment({
      slug,
      post_id: comment.post.post_id,
      comment_id: comment?.comment_id,
    });
    setDisplayAdditionalMenu(false);
  };

  React.useEffect(() => {
    if (displayAdditionalMenu) {
      const handleMouseDown = (e: MouseEvent) => {
        // @ts-ignore
        if (!menuRef.current.contains(e.target)) {
          setDisplayAdditionalMenu(false);
        }
      };
      document.addEventListener("mousedown", handleMouseDown);
      return () => document.removeEventListener("mousedown", handleMouseDown);
    }
  });

  const additionalMenuMouseHandleChange = React.useCallback(() => {
    setDisplayAdditionalMenu((displayAdditionalMenu) => !displayAdditionalMenu);
  }, []);

  return (
    <div className={styles.root}>
      <button onClick={additionalMenuMouseHandleChange}>
        <BsThreeDotsVertical />
        {displayAdditionalMenu && (
          <div className={styles.actionMenu} ref={menuRef}>
            <button className={styles.menuButton} onClick={deleteCommentButton}>
              <FaRegTrashCan size={21} className={styles.icon} />
              Удалить
            </button>
            <button className={styles.menuButton} onClick={editCommentButton}>
              <TiPen size={21} className={styles.icon} />
              Изменить
            </button>
          </div>
        )}
      </button>
    </div>
  );
}
