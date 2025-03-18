import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import Link from "next/link";
import { useRouter } from "next/router";

import type { MenuProps } from "antd/lib";
import { Layout, Menu } from "antd/lib";
const { Sider } = Layout;

import { CiBookmark } from "react-icons/ci";
import { RiArticleLine } from "react-icons/ri";
import { IoHomeOutline, IoFolderOpenOutline } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";

const siderMenu = [
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
    href: `/liked`,
  },
];

const BASE_URL = "http://127.0.0.1:8000";

const items2: MenuProps["items"] = siderMenu.map((icon, index) => {
  return {
    key: siderMenu[index].key,
    icon: siderMenu[index].icon,
    label: (
      <Link href={{ pathname: `${siderMenu[index].href}` }}>
        {siderMenu[index].label}
      </Link>
    ),
  };
});

export default function App() {
  const router = useRouter();
  const { data: subscriptionListMini } =
    DjangoService.useSubscriptionListMiniQuery({});
  const [siderSubs, setSiderSubs] = React.useState<any>([]);

  React.useEffect(() => {
    setSiderSubs([
      {
        id: 1,
        icon: <IoHomeOutline size={24} />,
        title: "Главная",
        children: subscriptionListMini,
      },
    ]);
  }, [subscriptionListMini]);

  const siderItems = [
    {
      key: 1,
      icon: <IoHomeOutline size={24} />,
      title: "Главная",
      // children: subscriptionListMini
    },
  ];

  const defaultSelectedKey = React.useMemo(() => {
    const defaultValue = siderMenu.find((item) =>
      item.href === router.asPath ? `${item.key}` : null,
    );
    return defaultValue?.key;
  }, [router.asPath]);

  return (
    <Sider>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={[defaultSelectedKey]}
        mode="inline"
        items={items2}
      />
      <div style={{ border: "1px solid black" }}></div>
      {/*<Menu theme="dark" defaultSelectedKeys={['']} mode="inline" items={siderItems} />*/}
    </Sider>
  );
}
