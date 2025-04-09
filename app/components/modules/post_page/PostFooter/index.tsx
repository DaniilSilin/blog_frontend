import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import Link from "next/link";
import Image from "next/image";

import { Post, User } from "@/app/types";
import { IoMdEye } from "react-icons/io";
import { FaRegCommentAlt, FaShare } from "react-icons/fa";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { IoBookmarkSharp, IoBookmarkOutline } from "react-icons/io5";

import ShareMenu from "./ShareMenu";
import LikedUserList from "@/app/components/modules/post_page/PostFooter/LikedUserList";

import styles from "./post_footer.module.css";
import NoUserPopup from "@/app/components/modules/NoUserPopup";
import { useAppSelector } from "@/app/store";
import { TiArrowForwardOutline } from "react-icons/ti";

export interface Props {
  post: Post;
}

export default function PostFooter({ post }: Props) {
  const user = useAppSelector((state) => state.django.profile);

  const subscribeRef = React.useRef(null);
  const likeRef = React.useRef(null);
  const dislikeRef = React.useRef(null);
  const bookmarkRef = React.useRef(null);

  const [displaySubscribePopup, setDisplaySubscribePopup] =
    React.useState(false);
  const [displayLikePopup, setDisplayLikePopup] = React.useState(false);
  const [displayDislikePopup, setDisplayDislikePopup] = React.useState(false);
  const [displayBookmarkPopup, setDisplayBookmarkPopup] = React.useState(false);

  const [setOrRemoveLike] = DjangoService.useSetOrRemoveLikeMutation();
  const [setOrRemoveDislike] = DjangoService.useSetOrRemoveDislikeMutation();
  const [addOrRemoveBookmark] = DjangoService.useAddOrRemoveBookmarkMutation();

  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [isVisibleMenu, setIsVisibleMenu] = React.useState<boolean>(false);
  const [dynamicContentModalDisplayed, setDynamicContentModalDisplayed] =
    React.useState(false);
  const [page, setPage] = React.useState(1);
  const [triggerQuery, { data: likedUserList, isFetching }] =
    DjangoService.useLazyLikedUserListQuery();

  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      // @ts-ignore
      if (user.isGuest) {
        // @ts-ignore
        if (!subscribeRef.current.contains(e.target)) {
          setDisplaySubscribePopup(false);
        }
        // @ts-ignore
        if (!likeRef.current.contains(e.target)) {
          setDisplayLikePopup(false);
        }
        // @ts-ignore
        if (!dislikeRef.current.contains(e.target)) {
          setDisplayDislikePopup(false);
        }
        // @ts-ignore
        if (!bookmarkRef.current.contains(e.target)) {
          setDisplayBookmarkPopup(false);
        }
      }
    };
    document.addEventListener("mousedown", handleMouse);
    return () => document.removeEventListener("mousedown", handleMouse);
  });

  const addOrRemoveBookmarkFunction = async () => {};

  const handleShowBookmarkPopup = React.useCallback(() => {
    setDisplayBookmarkPopup(!displayBookmarkPopup);
  }, [setDisplayBookmarkPopup, displayBookmarkPopup]);

  const visibleFunction = () => {
    if (!dynamicContentModalDisplayed) {
      setIsVisible(true);
    }
  };

  const isVisibleFunction = () => {
    setIsVisible(false);
  };

  const handleShowMenu = () => {
    setIsVisibleMenu(true);
  };

  const handleHideMenu = () => {
    setIsVisibleMenu(false);
  };

  const setOrRemovePostLike = (slug: string, post_id: number) => {
    setOrRemoveLike({ post_id, slug });
  };

  const setOrRemovePostDislike = (slug: string, post_id: number) => {
    setOrRemoveDislike({ slug, post_id });
  };

  const addOrRemoveBookmarksFunction = (slug: string, post_id: number) => {
    addOrRemoveBookmark({ slug, post_id });
  };

  const handleShowDislikePopup = React.useCallback(() => {}, []);

  const handleShowLikePopup = React.useCallback(() => {}, []);

  const handleDynamicContentClick = React.useCallback(
    (e) => {
      triggerQuery({ slug: post.blog.slug, post_id: post.post_id, page: page });
      let elem = e.target;

      if (dynamicContentModalDisplayed) {
        if (
          elem.parentNode.parentNode.nextSibling.className.startsWith(
            "post_footer_modal",
          ) ||
          elem.className.startsWith("post_footer_close")
        ) {
          elem.parentNode.parentNode.nextSibling.style.display = "block";
          setDynamicContentModalDisplayed(false);
        }
      } else {
        let modalNode = null;
        if (
          elem.parentNode.parentNode.nextSibling.className.startsWith(
            "post_footer_modal__b8GYi",
          )
        ) {
          modalNode = elem.parentNode.parentNode.nextSibling;
          modalNode.style.display = "block";
          setIsVisible(false);
          setDynamicContentModalDisplayed(true);
        }
      }
    },
    [triggerQuery, dynamicContentModalDisplayed, page],
  );

  return (
    <div className={styles.root}>
      <div className={styles.postTags}>
        {post?.tags &&
          post?.tags.split(" ").map((tag, index) => (
            <Link key={index} href={`/posts/search?hashtag=${tag.slice(1)}`}>
              {tag}{" "}
            </Link>
          ))}
      </div>
      <div className={styles.actionContainer}>
        <div className={styles.likedAndDislikeContainer}>
          {user.isGuest ? (
            <div className={styles.likeContainer} ref={likeRef}>
              <button
                className={styles.likeButton}
                onClick={handleShowLikePopup}
              >
                <AiFillLike className={styles.likeIcon} size={20} />
                <div className={styles.likeCounter}>{post?.likes}</div>
              </button>
              {displayLikePopup && (
                <div
                  style={{
                    marginTop: "37px",
                    marginLeft: "-50px",
                    cursor: "default",
                  }}
                >
                  <NoUserPopup
                    title={"Нравится эта публикация?"}
                    description={"Войдите, чтобы поставить лайк на этот канал"}
                    redirectTo={`/blog/${post.blog.slug}/post/${post.post_id}`}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.likeContainer}>
              <button
                onClick={() =>
                  setOrRemovePostLike(post.blog.slug, post.post_id)
                }
                className={styles.likeButton}
              >
                {post?.isLiked.toString() === "true" ? (
                  <AiFillLike className={styles.likeIconLiked} size={20} />
                ) : (
                  <AiOutlineLike
                    className={styles.likeIconNotLiked}
                    size={20}
                  />
                )}
                <div className={styles.likeCounter}>{post?.likes}</div>
              </button>
            </div>
          )}
          {user.isGuest ? (
            <div className={styles.dislikeContainer} ref={dislikeRef}>
              <button
                className={styles.dislikeButton}
                onClick={handleShowDislikePopup}
              >
                <AiOutlineDislike
                  className={styles.dislikeIconNotLiked}
                  size={20}
                />
              </button>
              <div className={styles.dislikeCounter}>{post?.dislikes}</div>
              {displayDislikePopup && (
                <div style={{ marginTop: "35px", marginLeft: "-30px" }}>
                  <NoUserPopup
                    title={"Не нравится эта публикация?"}
                    description={
                      "Войдите, чтобы поставить дизлайк на этот канал"
                    }
                    redirectTo={`/blog/${post.blog.slug}/post/${post.post_id}`}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.dislikeContainer}>
              <button
                onClick={() =>
                  setOrRemovePostDislike(post.blog.slug, post.post_id)
                }
                className={styles.dislikeButton}
              >
                {post?.isDisliked.toString() === "true" ? (
                  <AiFillDislike
                    className={styles.dislikeIconLiked}
                    size={20}
                  />
                ) : (
                  <AiOutlineDislike
                    className={styles.dislikeIconNotLiked}
                    size={20}
                  />
                )}
                <div className={styles.dislikeCounter}>{post?.dislikes}</div>
              </button>
            </div>
          )}
        </div>
        <div className={styles.bookmarkContainer}>
          {user.isGuest ? (
            <div ref={bookmarkRef}>
              <button className={styles.boo} onClick={handleShowBookmarkPopup}>
                <IoBookmarkSharp style={{ color: "white" }} size={20} />
              </button>
              {displayBookmarkPopup && (
                <div style={{ marginTop: "35px", marginLeft: "-30px" }}>
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
        </div>
      </div>
      {/*<div className={styles.postFooterActionMenu}>*/}
      {/*  <div*/}
      {/*    className={styles.likeButton}*/}
      {/*    onMouseOver={visibleFunction}*/}
      {/*    onMouseLeave={isVisibleFunction}*/}
      {/*  >*/}
      {/*    {post?.isLiked.toString() === "true" ? (*/}
      {/*      <AiFillLike*/}
      {/*        className={styles.likeIcon}*/}
      {/*        size={20}*/}
      {/*        style={{ color: "black" }}*/}
      {/*        onClick={() => setOrRemovePostLike(post?.post_id)}*/}
      {/*      />*/}
      {/*    ) : (*/}
      {/*      <AiOutlineLike*/}
      {/*        className={styles.likeIcon}*/}
      {/*        size={20}*/}
      {/*        onClick={() => setOrRemovePostLike(post?.post_id)}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*    <div>{post?.likes}</div>*/}
      {/*    <div>*/}
      {/*      {post.likes > 0 && (*/}
      {/*        <>*/}
      {/*          {isVisible && (*/}
      {/*            <div className={styles.liked_users_container}>*/}
      {/*              {post?.liked_users.map((user: User) => (*/}
      {/*                <div key={user.id}>*/}
      {/*                  <Link href={`/profile/${user.username}/`}>*/}
      {/*                    <Image*/}
      {/*                      src={*/}
      {/*                        user.avatar_small*/}
      {/*                          ? `${BASE_URL}${user.avatar_small}`*/}
      {/*                          : "/img/default/avatar_default.jpg"*/}
      {/*                      }*/}
      {/*                      width={20}*/}
      {/*                      height={20}*/}
      {/*                      alt=""*/}
      {/*                    />*/}
      {/*                  </Link>*/}
      {/*                  <Link href={`/profile/${user.username}/`}>*/}
      {/*                    {user.username}*/}
      {/*                  </Link>*/}
      {/*                </div>*/}
      {/*              ))}*/}
      {/*              <div onClick={handleDynamicContentClick}>*/}
      {/*                Посмотреть всех пользователей*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*          )}*/}
      {/*        </>*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*    <div className={styles.modal}>*/}
      {/*      <div className={styles.modalContent}>*/}
      {/*        <LikedUserList*/}
      {/*          setPage={setPage}*/}
      {/*          likedUserList={likedUserList}*/}
      {/*          page={page}*/}
      {/*          triggerQuery={triggerQuery}*/}
      {/*          isFetching={isFetching}*/}
      {/*          post={post}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={styles.viewButton}>*/}
      {/*    <IoMdEye size={20} className={styles.viewIcon} />*/}
      {/*    <div>{post?.views}</div>*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <FaRegCommentAlt size={20} className={styles.commentIcon} />*/}
      {/*    <Link*/}
      {/*      style={{ display: "flex" }}*/}
      {/*      href={`/blog/${post.blog.slug}/post/${post.post_id}/`}*/}
      {/*    />*/}
      {/*    <div>{post?.comments}</div>*/}
      {/*  </div>*/}
      {/*  <div className={styles.bookmarkContainer}>*/}
      {/*    {user.isGuest ? (*/}
      {/*      <div ref={bookmarkRef}>*/}
      {/*        <button className={styles.boo} onClick={handleShowBookmarkPopup}>*/}
      {/*          <IoBookmarkSharp style={{ color: "white" }} size={20} />*/}
      {/*        </button>*/}
      {/*        {displayBookmarkPopup && (*/}
      {/*          <div style={{ marginTop: "35px", marginLeft: "-30px" }}>*/}
      {/*            <NoUserPopup*/}
      {/*              title={"Хотите посмотреть публикацию позже?"}*/}
      {/*              description={*/}
      {/*                "Войдите, чтобы добавить публикацию в сохранённые"*/}
      {/*              }*/}
      {/*              redirectTo={`/`}*/}
      {/*            />*/}
      {/*          </div>*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*    ) : (*/}
      {/*      <div>*/}
      {/*        <button*/}
      {/*          className={styles.bookmarkButton}*/}
      {/*          onClick={addOrRemoveBookmarkFunction}*/}
      {/*        >*/}
      {/*          {post?.isBookmarked.toString() === "true" ? (*/}
      {/*            <IoBookmarkSharp*/}
      {/*              className={styles.bookmarkIconAdded}*/}
      {/*              size={20}*/}
      {/*            />*/}
      {/*          ) : (*/}
      {/*            <IoBookmarkOutline*/}
      {/*              className={styles.bookmarkIconNotAdded}*/}
      {/*              size={20}*/}
      {/*            />*/}
      {/*          )}*/}
      {/*          <div>Сохранить</div>*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  <div onMouseOver={handleShowMenu} onMouseLeave={handleHideMenu}>*/}
      {/*    <FaShare size={20} />*/}
      {/*    {isVisibleMenu && <ShareMenu post={post} />}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}
