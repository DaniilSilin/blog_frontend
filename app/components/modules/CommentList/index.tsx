import React, { FC } from "react";
import DjangoService from "@/app/store/services/DjangoService";

import Comment from "../comment";

import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

export interface CommentListProps {
  slug: string;
  post_id: number;
  sort_by?: string;
  parent_id?: number;
}

const CommentList: FC<CommentListProps> = ({
  slug,
  post_id,
  sort_by,
  parent_id,
}) => {
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    setPage(1);
  }, [sort_by]);

  const { data: postCommentList, isFetching } =
    DjangoService.usePostCommentListQuery({
      slug,
      post_id,
      page,
      sort_by,
      parent_id,
    });

  // React.useEffect(() => {
  //   const onScroll = () => {
  //     const scrolledToBottom =
  //       window.innerHeight + window.scrollY >= document.body.offsetHeight;
  //     if (scrolledToBottom && !isFetching) {
  //       if (postCommentList.next != null) {
  //         setPage(page + 1);
  //       } else {
  //         return;
  //       }
  //     }
  //   };
  //   document.addEventListener("scroll", onScroll);
  //   return () => document.removeEventListener("scroll", onScroll);
  // }, [page, isFetching]);

  const loadMoreReplies = React.useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  return (
    <div>
      {postCommentList?.results.map((comment: Comment, index: number) => (
        <Comment
          key={index}
          slug={slug}
          post_id={post_id}
          comment={comment}
          isPinned={false}
        />
      ))}
      {!!postCommentList?.next && (
        <button onClick={loadMoreReplies}>
          <MdOutlineSubdirectoryArrowRight size={20} />
          Другие ответы
        </button>
      )}
    </div>
  );
};

export default CommentList;
