import React from "react";

import { IoFolderOpenOutline, IoHomeOutline } from "react-icons/io5";
import { RiArticleLine } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";

const miniSiderMenu = [
  {
    key: "1",
    icon: <IoHomeOutline size={24} />,
    href: "/",
    label: "Главная",
  },
  {
    key: "2",
    icon: <RiArticleLine size={24} />,
    href: "/post/list",
    label: "Публикации",
  },
  {
    key: "3",
    icon: <FaBook size={24} />,
    href: "/blog/list",
    label: "Каналы",
  },
  {
    key: "4",
    icon: <CiBookmark size={24} />,
    href: "/bookmarks",
    label: "Сохранённое",
  },
  {
    key: "5",
    icon: <IoFolderOpenOutline size={24} />,
    href: "/subscriptions",
    label: "Подписки",
  },
  {
    key: "6",
    icon: <AiOutlineLike size={24} />,
    label: "Понравившиеся",
    href: "/liked",
  },
];

export default miniSiderMenu;
