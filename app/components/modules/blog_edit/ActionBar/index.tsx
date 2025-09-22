import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import classNames from "classnames";
import { useRouter } from "next/router";

import styles from "./action_bar.module.css";

export interface Props {
  slug: string;
  hasPostChanged: boolean;
  isReadyToSubmit: boolean;
  updateBlogData: () => void;
  setToDefaultHandleChange: any;
}

export default function ActionBar({
  slug,
  hasPostChanged,
  isReadyToSubmit,
  updateBlogData,
  setToDefaultHandleChange,
}: Props) {
  const router = useRouter();
  const [displaySubmitDeleteBlogModal, setDisplaySubmitDeleteBlogModal] =
    React.useState(false);
  const [deleteBlog] = DjangoService.useDeleteBlogMutation();

  const deleteBlogFunction = async () => {
    const result = await deleteBlog({ slug });
    // @ts-ignore
    if (!result.error) {
      router.push("/");
    }
  };

  const handleDisplayModal = React.useCallback(
    (e: any) => {
      let elem = e.target;
      if (displaySubmitDeleteBlogModal) {
        if (
          elem.className.startsWith("modal_3") ||
          elem.className.endsWith("close_5")
        ) {
          if (elem.className.endsWith("close_5")) {
            elem = elem.parentNode.parentNode.parentNode;
          }
          elem.style.display = "none";
          setDisplaySubmitDeleteBlogModal(false);
        }
      } else {
        let modalNode = null;
        if (elem.firstElementChild.className.startsWith("modal_3")) {
          modalNode = elem.firstElementChild;
          modalNode.style.display = "block";
          setDisplaySubmitDeleteBlogModal(true);
        }
      }
    },
    [displaySubmitDeleteBlogModal],
  );

  return (
    <div className={styles.root}>
      <div className={styles.selectionTypeContainer}>
        <div className={styles.mainType}>Основные</div>
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.deleteButton} onClick={handleDisplayModal}>
          Удалить блог
          <div className={"modal_3"}>
            <div
              className={"modalContent_3"}
              style={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div className={styles.deleteMessage}>
                Вы действительно хотите удалить блог?
              </div>
              <div className={styles.deleteMessageButtons}>
                <div
                  onClick={deleteBlogFunction}
                  className={styles.submitDeleteButton}
                >
                  Да
                </div>
                <div
                  className={classNames(styles.cancelDeleteButton, "close_5")}
                >
                  Отмена
                </div>
              </div>
            </div>
          </div>
        </button>
        <button
          className={classNames(styles.cancelButton, {
            [styles.active]: hasPostChanged,
          })}
          disabled={!hasPostChanged}
          onClick={setToDefaultHandleChange}
        >
          Отмена
        </button>
        <button
          className={classNames(styles.submitButton, {
            [styles.active]: isReadyToSubmit,
          })}
          disabled={!isReadyToSubmit}
          onClick={updateBlogData}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}
