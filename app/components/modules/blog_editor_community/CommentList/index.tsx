import React, { ChangeEvent } from "react";
import { useAppSelector } from "@/app/store";
import DjangoService from "@/app/store/services/DjangoService";
import Link from "next/link";
import Image from "next/image";
import moment from "moment/moment";
import "moment/locale/ru";
import classNames from "classnames";

import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import ReplyList from "./ReplyList";
import CommentReply from "./CommentReply";
import CommentInput from "./CommentInput";

import styles from "./comment_list.module.css";

export interface Props {
  slug: string;
  comment: any;
  setSelectedBlogComments: (value: any) => void;
  selectedBlogComments: any;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function CommentList({
  comment,
  slug,
  setSelectedBlogComments,
  selectedBlogComments,
}: Props) {
  const bodyRef = React.useRef(null);
  const user = useAppSelector((state) => state.django.profile);
  const [displayCommentInputReply, setDisplayCommentInputReply] =
    React.useState(false);
  const [displayAdditionalMenu, setDisplayAdditionalMenu] =
    React.useState(false);
  const [setOrRemoveCommentLike] =
    DjangoService.useSetOrRemoveCommentLikeMutation();
  const [setOrRemoveCommentDislike] =
    DjangoService.useSetOrRemoveCommentDislikeMutation();
  const [setOrRemoveLikeByAuthor] =
    DjangoService.useSetOrRemoveLikeByAuthorMutation();
  const [deleteComment] = DjangoService.useDeleteCommentMutation();
  const [isNormalMode, setIsNormalMode] = React.useState(false);
  const [isBodyCollapsed, setIsBodyCollapsed] = React.useState(false);
  const [commentButtonLabel, setCommentButtonLabel] =
    React.useState<string>("Читать дальше");
  const [displayReplies, setDisplayReplies] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const commentReplyInputHandleChange = React.useCallback(() => {
    if (!displayCommentInputReply) {
      setDisplayCommentInputReply(true);
    }
  }, [displayCommentInputReply, setDisplayCommentInputReply]);

  const likeCommentButton = () => {
    setOrRemoveCommentLike({
      slug: slug,
      post_id: comment.post.post_id,
      comment_id: comment?.comment_id,
    });
  };

  const dislikeCommentButton = () => {
    setOrRemoveCommentDislike({
      slug: slug,
      post_id: comment.post.post_id,
      comment_id: comment?.comment_id,
    });
  };

  const deleteCommentButton = () => {
    deleteComment({
      slug: slug,
      post_id: comment.post.post_id,
      comment_id: comment?.comment_id,
    });
  };

  const setOrRemoveLikeByAuthorButton = () => {
    setOrRemoveLikeByAuthor({
      slug: slug,
      post_id: comment.post.post_id,
      comment_id: comment?.comment_id,
    });
  };

  const additionalMenuMouseOverHandleChange = () => {
    setDisplayAdditionalMenu(true);
  };

  const additionalMenuMouseLeaveHandleChange = () => {
    setDisplayAdditionalMenu(false);
  };

  React.useEffect(() => {
    // @ts-ignore
    if (bodyRef.current.offsetHeight > 190) {
      setIsNormalMode(false);
    } else {
      setIsNormalMode(true);
    }
  }, [bodyRef.current]);

  const resizeBodyHandleChange = React.useCallback(() => {
    setIsBodyCollapsed(!isBodyCollapsed);
    if (isBodyCollapsed) {
      setCommentButtonLabel("Читать дальше");
    } else {
      setCommentButtonLabel("Свернуть");
    }
  }, [setIsBodyCollapsed, isBodyCollapsed]);

  const [triggerQuery, { data: replyList }] =
    DjangoService.useLazyBlogCommentsQuery();
  const [wasDisplayedOnce, setWasDisplayedOnce] = React.useState(false);

  const getReplies = React.useCallback(() => {
    if (!wasDisplayedOnce) {
      triggerQuery({
        slug: slug,
        post_id: comment.post.post_id,
        parent_id: comment.comment_id,
        page: 1,
      });
      setWasDisplayedOnce(true);
    }
    setDisplayReplies(!displayReplies);
  }, [
    wasDisplayedOnce,
    setWasDisplayedOnce,
    setDisplayReplies,
    displayReplies,
    triggerQuery,
    comment,
    slug,
  ]);

  const uploadMoreReplies = React.useCallback(() => {
    triggerQuery({
      slug: slug,
      post_id: comment.post.post_id,
      parent_id: comment.comment_id,
      page: page + 1,
    });
    setPage(page + 1);
  }, [setPage, page, triggerQuery, comment, slug]);

  const blogCommentInputCheckboxHandleChange = React.useCallback(
    (checked: boolean, comment: any) => {
      if (checked) {
        setSelectedBlogComments([...selectedBlogComments, comment]);
      } else {
        setSelectedBlogComments(
          selectedBlogComments.filter(
            (item: any) => item.comment_id !== comment.comment_id,
          ),
        );
      }
    },
    [setSelectedBlogComments, selectedBlogComments, comment],
  );

  const countOfReliesLabel = React.useMemo(() => {
    const countOfReplies = comment.count_of_replies.toString();

    if (countOfReplies.slice(-1) === "1" && countOfReplies.slice(-2) !== "11") {
      return `${countOfReplies} ответ`;
    } else if (
      (countOfReplies.slice(-1) === "2" ||
        countOfReplies.slice(-1) === "3" ||
        countOfReplies.slice(-1) === "4") &&
      countOfReplies.slice(-2) !== "12" &&
      countOfReplies.slice(-2) !== "13" &&
      countOfReplies.slice(-2) !== "14"
    ) {
      return `${countOfReplies} ответа`;
    } else {
      return `${countOfReplies} ответов`;
    }
  }, [comment]);

  return (
    <div className={styles.root}>
      <div className={styles.commentAndInputReplyContainer}>
        <div style={{ display: "flex" }}>
          <div className={styles.userCommentContainer}>
            <CommentInput
              comment={comment}
              checked={selectedBlogComments.find(
                (item: any) => item.comment_id === comment.comment_id,
              )}
              onChange={blogCommentInputCheckboxHandleChange}
              isParent={true}
            />
            <div className={styles.authorAvatarContainer}>
              <Link href={`/profile/${comment.author.username}/`}>
                {comment.author.avatar_small ? (
                  <Image
                    src={`${BASE_URL}${comment.author.avatar_small}`}
                    className={styles.authorAvatar}
                    alt={""}
                    width={50}
                    height={50}
                  />
                ) : (
                  <Image
                    src={"/img/default/avatar_default.jpg"}
                    className={styles.authorAvatar}
                    alt={""}
                    width={50}
                    height={50}
                  />
                )}
              </Link>
            </div>
            <div className={styles.commentMain}>
              <div className={styles.commentHeader}>
                <div>
                  <Link href={`/profile/${comment.author.username}/`}>
                    <div>{comment.author.username}</div>
                  </Link>
                </div>
                <div className={styles.delimiter}>•</div>
                <div>{moment(comment.created_at).fromNow()}</div>
              </div>
              <div ref={bodyRef} className={styles.commentBody}>
                {isNormalMode ? (
                  <div>{comment.body}</div>
                ) : (
                  <>
                    <div
                      className={classNames(styles.commentBodyCollapsed, {
                        [styles.commentBodyFull]:
                          commentButtonLabel === "Свернуть",
                      })}
                    >
                      {comment.body}
                    </div>
                    <button
                      className={styles.bodyButton}
                      onClick={resizeBodyHandleChange}
                    >
                      {commentButtonLabel}
                    </button>
                  </>
                )}
              </div>
              <div className={styles.commentActionButtons}>
                <button
                  className={styles.replyButton}
                  onClick={commentReplyInputHandleChange}
                >
                  Ответить
                </button>
                {!!comment.count_of_replies ? (
                  <button
                    onClick={getReplies}
                    className={styles.showMoreRepliesButton}
                  >
                    {countOfReliesLabel}
                    {displayReplies ? (
                      <IoIosArrowUp className={styles.arrow} />
                    ) : (
                      <IoIosArrowDown className={styles.arrow} />
                    )}
                  </button>
                ) : (
                  <button className={styles.noRepliesButton}>
                    Нет ответов
                    <IoIosArrowDown className={styles.arrow} />
                  </button>
                )}
                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "blue",
                      borderRadius: "50%",
                    }}
                  >
                    {comment.isLiked.toString() === "true" ? (
                      <AiOutlineLike
                        size={15}
                        style={{ color: "black" }}
                        onClick={likeCommentButton}
                      />
                    ) : (
                      <AiOutlineLike
                        size={15}
                        style={{ color: "red" }}
                        onClick={likeCommentButton}
                      />
                    )}
                  </div>
                  {comment.likes ? (
                    <div style={{ marginRight: "8px" }}>{comment.likes}</div>
                  ) : null}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "blue",
                      borderRadius: "50%",
                    }}
                  >
                    {comment.isDisliked.toString() === "true" ? (
                      <AiOutlineDislike
                        size={15}
                        style={{ color: "black" }}
                        onClick={dislikeCommentButton}
                      />
                    ) : (
                      <AiOutlineDislike
                        size={15}
                        style={{ color: "red" }}
                        onClick={dislikeCommentButton}
                      />
                    )}
                  </div>
                  {comment.dislikes ? (
                    <div style={{ marginRight: "8px" }}>{comment.dislikes}</div>
                  ) : null}
                </div>
                <div>
                  {comment.liked_by_author.toString() === "true" ? (
                    <div
                      className={classNames(styles.likedByAuthor, {
                        [styles.active]:
                          user.username === comment.post.author.username,
                      })}
                      onClick={setOrRemoveLikeByAuthorButton}
                    >
                      <Image
                        src={
                          comment.post.author.avatar_small
                            ? `${BASE_URL}${comment.post.author.avatar_small}`
                            : "/img/default/avatar_default.jpg"
                        }
                        className={styles.authorAvatar}
                        alt={""}
                        width={25}
                        height={25}
                      />
                      <FaRegHeart
                        color={"red"}
                        style={{ left: "-7px", position: "relative" }}
                      />
                    </div>
                  ) : (
                    <div onClick={setOrRemoveLikeByAuthorButton}>
                      <FaRegHeart />
                    </div>
                  )}
                </div>
                <div
                  onMouseOver={additionalMenuMouseOverHandleChange}
                  onMouseLeave={additionalMenuMouseLeaveHandleChange}
                >
                  <BsThreeDotsVertical />
                  {displayAdditionalMenu && (
                    <div style={{ position: "absolute" }}>
                      <button onClick={deleteCommentButton}>Удалить</button>
                      <button>Закрепить</button>
                      <button>Изменить</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.relatedPostContainer}>
            <div>
              <Link
                href={`/blog/${comment.post.blog.slug}/post/${comment.post.post_id}/`}
              >
                <Image
                  src={
                    comment.post.blog.avatar_small
                      ? `${BASE_URL}${comment.post.blog.avatar_small}`
                      : "/img/default/avatar_default.jpg"
                  }
                  className={styles.relatedPostAvatar}
                  alt={""}
                  width={50}
                  height={50}
                />
              </Link>
            </div>
            <div>
              <Link
                href={`/blog/${comment.post.blog.slug}/post/${comment.post.post_id}/`}
              >
                <div>{comment.post.title}</div>
              </Link>
            </div>
          </div>
        </div>
        <div>
          {displayCommentInputReply && (
            <CommentReply
              slug={slug}
              comment={comment}
              setDisplayCommentInputReply={setDisplayCommentInputReply}
            />
          )}
        </div>
      </div>
      {displayReplies && (
        <>
          <div>
            {replyList?.results.map((commentReply: Comment, index: number) => (
              <ReplyList
                key={index}
                commentReply={commentReply}
                slug={slug}
                setSelectedBlogComments={setSelectedBlogComments}
                selectedBlogComments={selectedBlogComments}
              />
            ))}
          </div>
          {!!replyList?.next && (
            <button
              className={styles.showMoreReplies}
              onClick={uploadMoreReplies}
            >
              <MdOutlineSubdirectoryArrowRight
                size={20}
                className={styles.subdirectoryArrowRight}
              />
              Другие ответы
            </button>
          )}
        </>
      )}
    </div>
  );
}
