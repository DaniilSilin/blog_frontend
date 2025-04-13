import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ru";

import { IoSettingsOutline } from "react-icons/io5";

export interface Props {
  blog: any;
}

const BASE_URL = "http://127.0.0.1:8000/";

export default function AuthorBlogList({ blog }: Props) {
  const [showBlogActionsMenu, setShowBlogActionsMenu] = React.useState(false);
  const [leaveBlog] = DjangoService.useLeaveBlogMutation();

  const showBlogActionsMenuHandleFunction = React.useCallback(() => {
    setShowBlogActionsMenu(!showBlogActionsMenu);
  }, [showBlogActionsMenu, setShowBlogActionsMenu]);

  const leaveBlogFunction = () => {
    leaveBlog({ slug: blog.slug });
  };

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        borderRadius: "10px",
        marginRight: "10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          src={`${BASE_URL}${blog.avatar_small}`}
          alt={""}
          width={"60"}
          height={"60"}
          style={{ borderRadius: "50%" }}
        />
        <div style={{ fontSize: "24px", marginLeft: "10px" }}>
          {blog?.title}
        </div>
        <IoSettingsOutline
          size={24}
          onClick={showBlogActionsMenuHandleFunction}
        />
        {showBlogActionsMenu && (
          <div onClick={leaveBlogFunction}>Покинуть блог</div>
        )}
      </div>
      <div>
        <div>Создатель блога: {blog.owner.username}</div>
        <div>
          Дата создания: {moment(blog?.created_at).format("D MMMM YYYY")}
        </div>
      </div>
    </div>
  );
}
