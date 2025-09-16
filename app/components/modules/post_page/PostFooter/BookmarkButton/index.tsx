import React from "react";
import { IoBookmarkOutline, IoBookmarkSharp } from "react-icons/io5";
import NoUserPopup from "@/app/components/modules/NoUserPopup";
import { useAppSelector } from "@/app/store";
import DjangoService from "@/app/store/services/DjangoService";

import styles from "./bookmark_button.module.css";

export interface Props {
  post: any;
}

export default function BookmarkButton({ post }: Props) {
  const user = useAppSelector((state) => state.django.profile);
  const bookmarkRef = React.useRef(null);

  const [displayBookmarkPopup, setDisplayBookmarkPopup] = React.useState(false);

  const [addOrRemoveBookmark] = DjangoService.useAddOrRemoveBookmarkMutation();

  const handleShowBookmarkPopup = React.useCallback(() => {
    setDisplayBookmarkPopup((displayBookmarkPopup) => !displayBookmarkPopup);
  }, []);

  const addOrRemoveBookmarksFunction = (slug: string, post_id: number) => {
    addOrRemoveBookmark({ slug, post_id });
  };

  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      // @ts-ignore
      if (user.isGuest) {
        // @ts-ignore
        if (!bookmarkRef.current.contains(e.target)) {
          setDisplayBookmarkPopup(false);
        }
      }
    };
    document.addEventListener("mousedown", handleMouse);
    return () => document.removeEventListener("mousedown", handleMouse);
  });

  return (
    <div className={styles.root}>
      {user.isGuest ? (
        <>
          <button
            ref={bookmarkRef}
            className={styles.bookmarkButton}
            onClick={handleShowBookmarkPopup}
          >
            <IoBookmarkOutline className={styles.bookmarkIcon} size={20} />
            Сохранить
          </button>
          {displayBookmarkPopup && (
            <NoUserPopup
              title={"Хотите посмотреть публикацию позже?"}
              description={"Войдите, чтобы добавить публикацию в сохранённые"}
              redirectTo={`/blog/${post.blog.slug}/post/${post.post_id}`}
            />
          )}
        </>
      ) : (
        <button
          className={styles.bookmarkButton}
          onClick={() =>
            addOrRemoveBookmarksFunction(post.blog.slug, post.post_id)
          }
        >
          {post?.isBookmarked.toString() === "true" ? (
            <IoBookmarkSharp className={styles.bookmarkIcon} size={20} />
          ) : (
            <IoBookmarkOutline className={styles.bookmarkIcon} size={20} />
          )}
          Сохранить
        </button>
      )}
    </div>
  );
}
