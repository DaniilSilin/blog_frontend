import React from "react";
import { useAppSelector } from "@/app/store";
import DjangoService from "@/app/store/services/DjangoService";

import { PostType } from "@/app/types";

import { IoBookmarkOutline, IoBookmarkSharp } from "react-icons/io5";
import { TiArrowForwardOutline } from "react-icons/ti";

import NoUserPopup from "@/app/components/modules/NoUserPopup";
import ShareMenu from "../../../post_page/PostFooter/ShareButton/ShareMenu";
import LikeDislikeButton from "./LikeDislikeButton";

import styles from "@/app/components/modules/post/post_page/post_page.module.css";
import PostSubscribeButton from "@/app/components/modules/post/post_page/PostFooter/PostSubscribeButton";

export interface Props {
  post: PostType;
  refetch: any;
}

export default function PostFooter({ post, refetch }: Props) {
  const bookmarkRef = React.useRef(null);
  const user = useAppSelector((state) => state.django.profile);
  const shareButtonRef = React.useRef(null);

  const [displayBookmarkPopup, setDisplayBookmarkPopup] = React.useState(false);
  const [displayShareMenu, setDisplayShareMenu] = React.useState(false);

  const [addOrRemoveBookmark] = DjangoService.useAddOrRemoveBookmarkMutation();

  const handleShowBookmarkPopup = React.useCallback(() => {
    setDisplayBookmarkPopup(!displayBookmarkPopup);
  }, [setDisplayBookmarkPopup, displayBookmarkPopup]);

  const handleDisplayShareMenu = React.useCallback(() => {
    setDisplayShareMenu((displayShareMenu) => !displayShareMenu);
  }, []);

  // const handleDisplayShareMenu = React.useCallback(() => {
  //   setDisplayShareMenu(!displayShareMenu);
  // }, [setDisplayShareMenu, displayShareMenu]);

  const addOrRemoveBookmarksFunction = async () => {
    const result = await addOrRemoveBookmark({
      slug: post.blog.slug,
      post_id: post.post_id,
    });
    if (!result.error && result.data.status !== "unsuccessful") {
      refetch();
    }
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
    <div className={styles.actionContainer}>
      <LikeDislikeButton post={post} refetch={refetch} />
      {/*<PostSubscribeButton />*/}
      <div className={styles.bookmarkContainer}>
        {user.isGuest ? (
          <div ref={bookmarkRef}>
            <button
              className={styles.bookmarkButton}
              onClick={handleShowBookmarkPopup}
            >
              <IoBookmarkOutline
                className={styles.bookmarkIconNotAdded}
                size={20}
              />
              Сохранить
            </button>
            {displayBookmarkPopup && (
              <div
                style={{
                  marginTop: "10px",
                  marginLeft: "-10px",
                  cursor: "default",
                }}
              >
                <NoUserPopup
                  title={"Хотите посмотреть публикацию позже?"}
                  description={
                    "Войдите, чтобы добавить публикацию в сохранённые"
                  }
                  redirectTo={`/blog/${post.blog.slug}/post/${post.post_id}`}
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            <button
              className={styles.bookmarkButton}
              onClick={addOrRemoveBookmarksFunction}
            >
              {post?.isBookmarked.toString() === "true" ? (
                <IoBookmarkSharp
                  className={styles.bookmarkIconAdded}
                  size={20}
                />
              ) : (
                <IoBookmarkOutline
                  className={styles.bookmarkIconNotAdded}
                  size={20}
                />
              )}
              <div>Сохранить</div>
            </button>
          </div>
        )}
      </div>
      <div>
        <button className={styles.shareButton} onClick={handleDisplayShareMenu}>
          <TiArrowForwardOutline className={styles.shareIcon} size={20} />
          Поделиться
        </button>
        {displayShareMenu && (
          <ShareMenu
            post={post}
            setDisplayShareMenu={setDisplayShareMenu}
            shareButtonRef={shareButtonRef}
          />
        )}
      </div>
    </div>
  );
}
