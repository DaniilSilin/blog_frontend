import React, { ChangeEvent } from "react";
import DjangoService from "@/app/store/services/DjangoService";
import Link from "next/link";
import { FaRegCommentAlt } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import { MdAddComment } from "react-icons/md";
import ShareMenu from "./ShareMenu";

import styles from "./post_footer.module.css";

export interface Props {
  post: any;
  slug: string;
}

export default function PostFooter({ post, slug }: Props) {
  const [setLike] = DjangoService.useSetLikeMutation();
  const [removeLike] = DjangoService.useRemoveLikeMutation();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [shareMenu, setShareMenu] = React.useState<boolean>(false);
  const shareMenuRef = React.useRef(null);

  const visibleFunction = () => {
    setIsVisible(true);
  };

  const isVisibleFunction = () => {
    setIsVisible(false);
  };

  const setPostLike = (post_id: number) => {
    setLike({ post_id, slug });
  };

  const removePostLike = (post_id: number) => {
    removeLike({ post_id, slug });
  };

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      // @ts-ignore
      if (shareMenuRef.current.contains(e.target)) {
        setShareMenu(true);
      } else {
        setShareMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  });

  return (
    <div style={{ display: "flex" }}>
      <ul className={styles.ul_list}>
        <li className={styles.li_list}>
          <div style={{ display: "flex" }}>
            {/*{post?.isLiked.toString() === 'true' ? (*/}
            {/*  <div style={{ fontSize: '16px' }}>*/}
            {/*    <AiFillLike size={20} style={{ color: 'black' }} onClick={() => removePostLike(post?.post_id)} />*/}
            {/*  </div>*/}
            {/*  ) : (*/}
            {/*  <div style={{ fontSize: '16px' }}>*/}
            {/*    <AiOutlineLike size={20} onClick={() => setPostLike(post?.post_id)} />*/}
            {/*  </div>)*/}
            {/*}*/}

            <div
              style={{ fontSize: "16px" }}
              onMouseOver={visibleFunction}
              onMouseLeave={isVisibleFunction}
            >
              {post.likedUsersCount ? (
                <>
                  <div>{post.likedUsersCount}</div>
                  {isVisible && (
                    <div>
                      <div className={styles.liked_users_container}>
                        {post.liked_users.map((user: any) => (
                          <div
                            key={user.id}
                            className={styles.liked_users_container_text}
                          >
                            <Link
                              className={styles.liked_users_container_text}
                              href={`/profile/${user.username}/`}
                            >
                              {user.username}
                            </Link>
                          </div>
                        ))}
                        {post?.likedUsersCount > 5 ? (
                          <div>Показать ещё {post?.likedUsersCount - 5}</div>
                        ) : null}
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </li>
        <li className={styles.li_list}>
          <IoMdEye size={20} />
          <div style={{ fontSize: "16px" }}>{post.views}</div>
        </li>
        <li className={styles.li_list}>
          <FaRegCommentAlt size={20} />
          {post.commentCount ? (
            <div style={{ fontSize: "16px" }}>{post.commentCount}</div>
          ) : null}
        </li>
        <li className={styles.li_list}>
          <Link
            style={{ display: "flex" }}
            href={`/blog/${slug}/post/${post.post_id}/#comments`}
          >
            <MdAddComment size={20} />
            <div style={{ fontSize: "16px" }}>Оставить комментарий</div>
          </Link>
        </li>
        <li ref={shareMenuRef} className={styles.li_list}>
          <BiRepost size={20} />
          {shareMenu && <ShareMenu post={post} />}
        </li>
      </ul>
    </div>
  );
}
