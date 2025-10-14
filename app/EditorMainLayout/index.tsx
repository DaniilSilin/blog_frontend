import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Layout, Menu, theme } from "antd/lib";
const { Content, Sider } = Layout;

import { IoSettingsOutline, IoPeopleOutline } from "react-icons/io5";
import { MdOutlineLocalPostOffice, MdPostAdd } from "react-icons/md";

import styles from "./EditorMainLayout.module.css";

export interface Props {
  children: React.ReactNode;
  slug: string;
}

export default function EditorMainLayout({ children, slug }: Props) {
  const router = useRouter();

  const settingsMenu = [
    {
      key: "1",
      icon: <IoSettingsOutline size={20} />,
      label: "Главное",
      href: `/blog/${slug}/editor/main`,
    },
    {
      key: "2",
      icon: <MdPostAdd size={20} />,
      label: "Публикации",
      href: `/blog/${slug}/editor/publications`,
    },
    {
      key: "3",
      icon: <IoPeopleOutline size={20} />,
      label: "Сообщество",
      href: `/blog/${slug}/editor/community`,
    },
    {
      key: "4",
      icon: <IoSettingsOutline size={20} />,
      label: "Настройки",
      href: `/blog/${slug}/editor/settings`,
    },
    {
      key: "5",
      icon: <MdOutlineLocalPostOffice size={20} />,
      label: "Приглашения",
      href: `/blog/${slug}/editor/invite`,
    },
  ];

  const items2 = settingsMenu.map((icon, index) => {
    return {
      key: settingsMenu[index].key,
      icon: settingsMenu[index].icon,
      label: (
        <Link href={{ pathname: `${settingsMenu[index].href}` }}>
          {settingsMenu[index].label}
        </Link>
      ),
    };
  });

  const defaultSelectedMenu = React.useMemo(() => {
    const defaultValue = settingsMenu.find((item) =>
      item.href === router.asPath ? `${item.key}` : null,
    );
    return defaultValue ? defaultValue?.key : "";
  }, [router.asPath, settingsMenu]);

  return (
    <Layout>
      <Content>
        <Layout className={styles.root}>
          <Sider className={styles.sider} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[defaultSelectedMenu]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={items2}
            />
          </Sider>
          <Content className={styles.content}>{children}</Content>
        </Layout>
      </Content>
    </Layout>
  );
}
