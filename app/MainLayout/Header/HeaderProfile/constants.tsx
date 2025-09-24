import React from "react";

import { ImBooks } from "react-icons/im";
import { MdOutlineCreate } from "react-icons/md";
import { IoIosLogOut, IoMdPersonAdd } from "react-icons/io";
import { BsPaletteFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

const USER_MENU = (user: any) => [
  {
    id: 1,
    link: `/profile/${user.username}/`,
    title: "Профиль",
    icon: <ImBooks size={24} />,
  },
  {
    id: 2,
    link: `/blog/create`,
    title: "Создать блог",
    icon: <MdOutlineCreate size={24} />,
  },
  {
    id: 3,
    link: `/invite/list/`,
    title: "Приглашения",
    icon: <IoMdPersonAdd size={24} />,
  },
  {
    id: 4,
    link: "",
    title: "Палитра",
    icon: <BsPaletteFill size={24} />,
  },
  {
    id: 5,
    link: `/blogs/my`,
    title: "Мои Блоги",
    icon: <ImBooks size={24} />,
  },
  {
    id: 6,
    link: `/profile/${user?.username}/edit`,
    title: "Настройки",
    icon: <IoSettingsOutline size={24} />,
  },
  {
    id: 7,
    link: "",
    title: "Выйти",
    icon: <IoIosLogOut size={24} />,
  },
];

export default USER_MENU;
