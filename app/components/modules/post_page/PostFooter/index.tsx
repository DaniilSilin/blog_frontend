import React from "react";
import { useAppSelector } from "@/app/store";
import DjangoService from "@/app/store/services/DjangoService";
import Link from "next/link";

import { PostType } from "@/app/types";
import { IoBookmarkSharp, IoBookmarkOutline } from "react-icons/io5";

import LikedUserList from "@/app/components/modules/post_page/PostFooter/LikedUserList";

import NoUserPopup from "@/app/components/modules/NoUserPopup";
import { TiArrowForwardOutline } from "react-icons/ti";
import LikedUserListMini from "@/app/components/modules/post_page/PostFooter/LikedUserListMini";

import styles from "./post_footer.module.css";
import ShareMenu from "@/app/components/modules/ShareMenu";
import LikeDislikeButton from "./LikeDislikeButton";

export interface Props {
  post: PostType;
}

export default function PostFooter({ post }: Props) {
  const user = useAppSelector((state) => state.django.profile);
  const bookmarkRef = React.useRef(null);

  const [displayBookmarkPopup, setDisplayBookmarkPopup] = React.useState(false);

  const [addOrRemoveBookmark] = DjangoService.useAddOrRemoveBookmarkMutation();

  const [displayShareMenu, setDisplayShareMenu] = React.useState(false);

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

  const handleShowBookmarkPopup = React.useCallback(() => {
    setDisplayBookmarkPopup((displayBookmarkPopup) => !displayBookmarkPopup);
  }, []);

  const addOrRemoveBookmarksFunction = (slug: string, post_id: number) => {
    addOrRemoveBookmark({ slug, post_id });
  };

  return (
    <div className={styles.root}>
      <div className={styles.postTags}>
        {post?.tags &&
          post?.tags.split(" ").map((tag, index) => (
            <Link key={index} href={`/hashtag/${tag.slice(1)}`}>
              {tag}{" "}
            </Link>
          ))}
      </div>
      <div className={styles.actionContainer}>
        <LikeDislikeButton post={post} />
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
                onClick={() =>
                  addOrRemoveBookmarksFunction(post.blog.slug, post.post_id)
                }
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
        <div className={styles.shareButton}>
          <TiArrowForwardOutline className={styles.shareIcon} size={20} />
          <div>Поделиться</div>
          {displayShareMenu && (
            <ShareMenu setDisplayShareMenu={setDisplayShareMenu} post={post} />
          )}
        </div>
      </div>
    </div>
  );
}
