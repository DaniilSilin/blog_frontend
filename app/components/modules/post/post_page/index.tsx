import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import Link from "next/link";

import CommentListSort from "./CommentListSort";
import CommentCreate from "../../../modules/comment_create";
import CommentList from "../../CommentList";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

import styles from "./post_page.module.css";
import PostImages from "@/app/components/modules/post/post_page/PostImages";

export default function PostPage({ slug, post_id }) {
  const [sortBy, setSortBy] = React.useState<string>("newest");
  const [tags, setTags] = React.useState([]);

  const { data: post, refetch: refetchPost } = DjangoService.useGetPostQuery({
    slug,
    post_id,
  });

  React.useEffect(() => {
    if (post?.tags) {
      setTags(post?.tags.split(" "));
    }
  }, [post]);

  const commentsCount = React.useMemo(() => {
    const commentCount = post?.commentCount.toString() || "0";

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
  }, [post?.commentCount]);

  return (
    <div>
      <PostHeader post={post} slug={slug} post_id={post_id} />
      <div style={{ margin: "15px 0", overflowWrap: "break-word" }}>
        {post?.body}
      </div>
      <div
        className={styles.map}
        dangerouslySetInnerHTML={{ __html: post?.map }}
      ></div>
      <PostImages post={post} />
      <div className={styles.tagsContainer}>
        {tags?.map((tag, index) => (
          <Link key={index} href={`/hashtag/${tag.slice(1)}/`}>
            {tag}{" "}
          </Link>
        ))}
      </div>
      <PostFooter post={post} refetch={refetchPost} />
      {post?.comments_allowed ? (
        <div>
          <div className={styles.commentsDataAndCreateComment}>
            <div className={styles.commentsData}>
              <h3 className={styles.commentsCountTitle}>
                <span>{commentsCount}</span>
              </h3>
              <CommentListSort setSortBy={setSortBy} sortBy={sortBy} />
            </div>
            <CommentCreate slug={slug} post_id={post_id} />
          </div>
          <div className={styles.commentsBlock}>
            <CommentList
              slug={slug}
              post_id={post_id}
              sort_by={sortBy}
              post={post}
              isParent
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
