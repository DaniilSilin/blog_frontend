import React, { FC } from "react";
import DjangoService from "@/app/store/services/DjangoService";

import { PostType, CommentType } from "@/app/types";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

import NotificationComment from "@/app/MainLayout/Header/HeaderNotifications/NotificationComment";

import styles from "./notification_comment_list.module.css";

export interface Props {
  width: number;
  height: number;
  slug: string;
  post_id: number;
  post: PostType;
  isParent?: boolean;
  parent_id?: number;
}

const NotificationCommentList: FC<Props> = ({
  width,
  height,
  slug,
  post_id,
  post,
  parent_id,
  isParent,
}: Props) => {
  const [page, setPage] = React.useState(1);

  const { data: notificationCommentList, isFetching } =
    DjangoService.useNotificationCommentListQuery({
      slug,
      post_id,
      page,
      parent_id,
    });

  const loadMoreReplies = React.useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  React.useEffect(() => {
    if (isParent) {
      const onScroll = () => {
        const scrolledToBottom =
          window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if (scrolledToBottom && !isFetching) {
          if (notificationCommentList.next != null) {
            setPage(page + 1);
          } else {
            return;
          }
        }
      };
      document.addEventListener("scroll", onScroll);
      return () => document.removeEventListener("scroll", onScroll);
    }
  }, [page, notificationCommentList]);

  return (
    <div>
      {notificationCommentList?.results.map(
        (comment: CommentType, index: number) => (
          <NotificationComment
            key={index}
            width={width}
            height={height}
            slug={slug}
            post_id={post?.post_id}
            comment={comment}
            post={post}
            isReplyToParentComment={true}
          />
        ),
      )}
      {!!notificationCommentList?.next && !isParent && (
        <button onClick={loadMoreReplies} className={styles.showMoreReplies}>
          <MdOutlineSubdirectoryArrowRight
            size={20}
            className={styles.subdirectoryArrow}
          />
          Другие ответы
        </button>
      )}
    </div>
  );
};

export default NotificationCommentList;
