import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import DjangoService from "@/app/store/services/DjangoService";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ru";

import styles from "./my_blog_list.module.css";

export interface Props {
  blog: any;
  owner?: boolean;
}

const BASE_URL = "http://127.0.0.1:8000/";

const OwnerBlogList = React.forwardRef(function OwnerBlogList(
  { blog, owner }: Props,
  ref,
) {
  const [showBlogActionsMenu, setShowBlogActionsMenu] = React.useState(false);
  const [deleteBlog] = DjangoService.useDeleteBlogMutation();
  const [leaveBlog] = DjangoService.useLeaveBlogMutation();
  const showBlogActionsMenuHandleFunction = React.useCallback(() => {
    setShowBlogActionsMenu(!showBlogActionsMenu);
  }, [showBlogActionsMenu, setShowBlogActionsMenu]);

  const deleteChosenBlog = () => {
    deleteBlog({ slug: blog.slug });
  };

  const leaveBlogFunction = () => {
    leaveBlog({ slug: blog.slug });
  };

  React.useEffect(() => {
    if (showBlogActionsMenu) {
      const handleMouse = (e: MouseEvent) => {
        // @ts-ignore
        if (!ref.current.contains(e.target)) {
          setShowBlogActionsMenu(false);
        }
      };
      document.addEventListener("mousedown", handleMouse);
      return () => document.removeEventListener("mousedown", handleMouse);
    }
  }, [showBlogActionsMenu]);

  return (
    <div className={styles.root}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link href={`/blog/${blog.slug}/`}>
          <Image
            src={
              blog.avatar_small
                ? `${BASE_URL}${blog.avatar_small}`
                : "/img/default/avatar_default.jpg"
            }
            alt={""}
            width={"60"}
            height={"60"}
            className={styles.avatar}
          />
        </Link>
        <Link href={`/blog/${blog.slug}/`}>
          <div style={{ fontSize: "24px", margin: "0 10px" }}>
            {blog?.title}
          </div>
        </Link>
        <IoSettingsOutline
          size={24}
          onClick={showBlogActionsMenuHandleFunction}
          style={{ marginTop: "5px", cursor: "pointer" }}
        />
        {owner ? (
          <>
            {showBlogActionsMenu && (
              <div
                // @ts-ignore
                ref={ref}
                className={styles.blogMenu}
                onClick={() => setShowBlogActionsMenu(false)}
              >
                <div>
                  <Link
                    className={styles.blogMenuItem}
                    href={`/blog/${blog.slug}/editor/settings/`}
                  >
                    Настройки
                  </Link>
                </div>
                <div>
                  <Link
                    className={styles.blogMenuItem}
                    href={`/blog/${blog.slug}/post/create/`}
                  >
                    Создать публикацию
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {showBlogActionsMenu && (
              <div
                // @ts-ignore
                ref={ref}
                className={styles.blogMenu}
                onClick={() => setShowBlogActionsMenu(false)}
              >
                <div className={styles.blogMenuItem} onClick={deleteChosenBlog}>
                  Покинуть блог
                </div>
                <div>
                  <Link
                    className={styles.blogMenuItem}
                    href={`/blog/${blog.slug}/post/create/`}
                  >
                    Создать публикацию
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {owner ? (
        <div>
          <div>
            Автор блога:&nbsp;
            <Link
              href={`/profile/${blog.owner.username}/`}
            >{`${blog.owner.username}`}</Link>
          </div>
          <div>
            Дата создания: {moment(blog?.created_at).format("D MMMM YYYY")}
          </div>
        </div>
      ) : (
        <div>
          <div>
            Дата создания: {moment(blog?.created_at).format("D MMMM YYYY")}
          </div>
        </div>
      )}
    </div>
  );
});

export default OwnerBlogList;
