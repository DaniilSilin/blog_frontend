import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import "moment/locale/ru";

import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { IoBookmarkSharp, IoBookmarkOutline } from "react-icons/io5";
import { TiArrowForwardOutline } from "react-icons/ti";

import NoUserPopup from "@/app/components/modules/NoUserPopup";
import Comment from "../../comment";
import CommentListSort from "./CommentListSort";
import CommentCreate from "../../../modules/comment_create";

import styles from "./post_page.module.css";
import CommentList from "../../CommentList";
import BlogCommentList from "@/app/components/modules/blog_editor_community/CommentList";
import ShareMenu from "@/app/components/modules/post_page/PostFooter/ShareMenu";

const BASE_URL = "http://127.0.0.1:8000";

export default function PostPage({ slug, post_id }) {
  const subscribeRef = React.useRef(null);
  const likeRef = React.useRef(null);
  const dislikeRef = React.useRef(null);
  const bookmarkRef = React.useRef(null);

  const user = useAppSelector((state) => state.django.profile);
  const [sortBy, setSortBy] = React.useState<string>("newest");
  const [tags, setTags] = React.useState([]);

  const [displaySubscribePopup, setDisplaySubscribePopup] =
    React.useState(false);
  const [displayLikePopup, setDisplayLikePopup] = React.useState(false);
  const [displayDislikePopup, setDisplayDislikePopup] = React.useState(false);
  const [displayBookmarkPopup, setDisplayBookmarkPopup] = React.useState(false);

  const [displayShareMenu, setDisplayShareMenu] = React.useState(false);

  const { data: postData, refetch: refetchPost } =
    DjangoService.useGetPostQuery({ slug, post_id });

  const [setOrRemoveLike] = DjangoService.useSetOrRemoveLikeMutation();
  const [setOrRemoveDislike] = DjangoService.useSetOrRemoveDislikeMutation();
  const [blogSubscription] = DjangoService.useBlogSubscriptionMutation();
  const [addOrRemoveBookmark] = DjangoService.useAddOrRemoveBookmarkMutation();

  const addOrRemoveBookmarksFunction = async () => {
    const result = await addOrRemoveBookmark({ slug, post_id });
    if (!result.error && result.data.status !== "unsuccessful") {
      refetchPost();
    }
  };

  const setLikeFunction = async () => {
    const result = await setOrRemoveLike({ post_id, slug });
    if (!result.error && result.data.status !== "unsuccessful") {
      refetchPost();
    }
  };

  const removeLikeFunction = async () => {
    const result = await setOrRemoveDislike({ post_id, slug });
    if (!result.error && result.data.status !== "unsuccessful") {
      refetchPost();
    }
  };

  const toggleBlogSubscription = async () => {
    const result = await blogSubscription({ slug });
    if (!result.error && result.data.status !== "unsuccessful") {
      refetchPost();
    }
  };

  React.useEffect(() => {
    if (postData?.tags) {
      setTags(postData?.tags.split(" "));
    }
  }, [postData]);

  const handleShowSubscribePopup = React.useCallback(() => {
    setDisplaySubscribePopup(!displaySubscribePopup);
  }, [setDisplaySubscribePopup, displaySubscribePopup]);

  const handleShowLikePopup = React.useCallback(() => {
    setDisplayLikePopup(!displayLikePopup);
  }, [setDisplayLikePopup, displayLikePopup]);

  const handleShowDislikePopup = React.useCallback(() => {
    setDisplayDislikePopup(!displayDislikePopup);
  }, [setDisplayDislikePopup, displayDislikePopup]);

  const handleShowBookmarkPopup = React.useCallback(() => {
    setDisplayBookmarkPopup(!displayBookmarkPopup);
  }, [setDisplayBookmarkPopup, displayBookmarkPopup]);

  const handleDisplayShareMenu = React.useCallback(() => {
    setDisplayShareMenu((displayShareMenu) => !displayShareMenu);
  }, []);

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

  const subscribersCount = React.useMemo(() => {
    const subscribers = postData?.subscribers.toString() || "0";

    if (subscribers.slice(-1) === "1" && subscribers.slice(-2) !== "11") {
      return `${subscribers} подписчик`;
    } else if (
      (subscribers.slice(-1) === "2" ||
        subscribers.slice(-1) === "3" ||
        subscribers.slice(-1) === "4") &&
      subscribers.slice(-2) !== "12" &&
      subscribers.slice(-2) !== "13" &&
      subscribers.slice(-2) !== "14"
    ) {
      return `${subscribers} подписчика`;
    } else {
      return `${subscribers} подписчиков`;
    }
  }, [postData?.subscribers]);

  const commentsCount = React.useMemo(() => {
    const commentCount = postData?.commentCount.toString() || "0";

    if (commentCount.slice(-1) === "1" && commentCount.slice(-2) !== "11") {
      return `${commentCount} комментарий`;
    } else if (
      (commentCount.slice(-1) === "2" ||
        commentCount.slice(-1) === "3" ||
        commentCount.slice(-1) === "4") &&
      commentCount.slice(-2) !== "12" &&
      commentCount.slice(-2) !== "13" &&
      commentCount.slice(-2) !== "14"
    ) {
      return `${commentCount} комментария`;
    } else {
      return `${commentCount} комментариев`;
    }
  }, [postData?.commentCount]);

  return (
    <div>
      <div className={styles.contentPublishedInformationBlock}>
        <div className={styles.postHeaderInformation}>
          <Link href={`/blog/${slug}/`}>
            <Image
              src={
                postData?.blog.avatar_small
                  ? `${BASE_URL}${postData?.blog.avatar_small}`
                  : "/img/default/avatar_default.jpg"
              }
              className={styles.blogAvatar}
              alt={""}
              width={60}
              height={60}
            />
          </Link>
          <div className={styles.contentPublisher}>
            <Link href={`/blog/${slug}/`}>
              <div
                className={styles.channelName}
                title={`${postData?.blog.title}`}
              >
                {postData?.blog.title}
              </div>
            </Link>
            <div>{subscribersCount}</div>
          </div>
        </div>
        <div className={styles.subscribeBlock}>
          {!user?.isGuest ? (
            <>
              {postData?.isSubscribed.toString() === "true" ? (
                <button
                  onClick={toggleBlogSubscription}
                  className={styles.subscribeButton}
                >
                  Отписаться
                </button>
              ) : (
                <button
                  onClick={toggleBlogSubscription}
                  className={styles.unsubscribeButton}
                >
                  Подписаться
                </button>
              )}
            </>
          ) : (
            <>
              <div ref={subscribeRef}>
                <button
                  onClick={handleShowSubscribePopup}
                  className={styles.unsubscribeButton}
                >
                  Подписаться
                </button>
                {displaySubscribePopup && (
                  <NoUserPopup
                    title={"Хотите подписаться на этот канал?"}
                    description={"Войдите, чтобы подписаться на этот канал"}
                    redirectTo={`/blog/${slug}/post/${post_id}`}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <div className={styles.postTitle} title={`${postData?.title}`}>
          {postData?.title}
        </div>
        <div className={styles.postInformation}>
          {postData?.author_is_hidden.toString() === "false" ? (
            <>
              <Link href={`/profile/${postData?.author.username}/`}>
                <div>{postData?.author.username}</div>
              </Link>
              <div className={styles.delimiter}>·</div>
            </>
          ) : null}
          <div>{moment(postData?.created_at).format("D MMMM hh:mm")}</div>
          <div className={styles.delimiter}>·</div>
          <div>{postData?.views} просмотров</div>
        </div>
      </div>
      <div style={{ margin: "15px 0", overflowWrap: "break-word" }}>
        {postData?.body}
      </div>
      <div
        className={styles.map}
        dangerouslySetInnerHTML={{ __html: postData?.map }}
      ></div>
      <div className={styles.tagsContainer}>
        {tags?.map((tag, index) => (
          <Link key={index} href={`/posts/search/${tag.slice(1)}/`}>
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
                <AiOutlineLike className={styles.likeIconNotLiked} size={20} />
                <div className={styles.likeCounter}>{postData?.likes}</div>
              </button>
              {displayLikePopup && (
                <div
                  style={{
                    marginTop: "35px",
                    marginLeft: "-50px",
                    cursor: "default",
                  }}
                >
                  <NoUserPopup
                    title={"Нравится эта публикация?"}
                    description={
                      "Войдите, чтобы поставить лайк на эту публикацию."
                    }
                    redirectTo={`/blog/${slug}/post/${post_id}`}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.likeContainer}>
              <button onClick={setLikeFunction} className={styles.likeButton}>
                {postData?.isLiked.toString() === "true" ? (
                  <AiFillLike className={styles.likeIconLiked} size={20} />
                ) : (
                  <AiOutlineLike
                    className={styles.likeIconNotLiked}
                    size={20}
                  />
                )}
                <div className={styles.likeCounter}>{postData?.likes}</div>
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
                <div className={styles.dislikeCounter}>
                  {postData?.dislikes}
                </div>
              </button>
              {displayDislikePopup && (
                <div
                  style={{
                    marginTop: "35px",
                    marginLeft: "-30px",
                    cursor: "default",
                  }}
                >
                  <NoUserPopup
                    title={"Не нравится эта публикация?"}
                    description={
                      "Войдите, чтобы поставить дизлайк на эту публикацию."
                    }
                    redirectTo={`/blog/${slug}/post/${post_id}`}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.dislikeContainer}>
              <button
                onClick={removeLikeFunction}
                className={styles.dislikeButton}
              >
                {postData?.isDisliked.toString() === "true" ? (
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
                <div className={styles.dislikeCounter}>
                  {postData?.dislikes}
                </div>
              </button>
            </div>
          )}
        </div>
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
                    redirectTo={`/blog/${slug}/post/${post_id}`}
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
                {postData?.isBookmarked.toString() === "true" ? (
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
          <button
            className={styles.shareButton}
            onClick={handleDisplayShareMenu}
          >
            <TiArrowForwardOutline className={styles.shareIcon} size={20} />
            Поделиться
          </button>
          {displayShareMenu && (
            <ShareMenu
              post={postData}
              setDisplayShareMenu={setDisplayShareMenu}
            />
          )}
        </div>
      </div>
      {postData?.comments_allowed ? (
        <div>
          <div className={styles.commentsDataAndCreateComment}>
            <div className={styles.commentsData}>
              <h2 className={styles.commentsCountTitle}>
                <span>{commentsCount}</span>
              </h2>
              <CommentListSort setSortBy={setSortBy} sortBy={sortBy} />
            </div>
            <CommentCreate slug={slug} post_id={post_id} />
          </div>
          <div className={styles.commentsBlock}>
            <CommentList
              slug={slug}
              post_id={post_id}
              sort_by={sortBy}
              postData={postData}
              isReplyToParentComment
            />
          </div>
        </div>
      ) : (
        <div className={styles.commentsNotAllowedContainer}>
          Комментарии отключены
        </div>
      )}
    </div>
  );
}
