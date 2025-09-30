import { ImTelegram, ImVk } from "react-icons/im";
import { IoLink } from "react-icons/io5";
import React from "react";

const BASE_URL = "http://127.0.0.1:8000";

const shareMenuList = (post: any) => [
  {
    id: 1,
    title: "Скопировать",
    icon: <IoLink size={22} />,
    href: "",
  },
  {
    id: 2,
    title: "Telegram",
    icon: <ImTelegram size={22} />,
    href: `https://t.me/share/url?url=${encodeURIComponent(BASE_URL)}?share_to=telegram&text=${123}`,
  },
  {
    id: 3,
    title: "ВКонтакте",
    icon: <ImVk size={22} />,
    href: `https://t.me/share/url?url=${encodeURIComponent(BASE_URL)}?share_to=telegram&text=${4}`,
  },
  {
    id: 4,
    title: "ВКонтакте",
    icon: <ImVk size={22} />,
    href: `https://t.me/share/url?url=${encodeURIComponent(BASE_URL)}?share_to=telegram&text=${4}`,
  },
];

export default shareMenuList;
