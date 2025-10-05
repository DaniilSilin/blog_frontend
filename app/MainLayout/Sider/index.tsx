import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Layout, Menu } from "antd/lib";
const { Sider } = Layout;

import miniSiderMenu from "./constants";

import styles from "./sider.module.css";

export interface Props {
  isWideScreen: boolean;
  isSiderExpanded: boolean;
}

export default function App({ isWideScreen, isSiderExpanded }: Props) {
  const router = useRouter();
  const wideScreenAndFullMode = isWideScreen && isSiderExpanded ? 200 : 90;

  const defaultSelectedKey = React.useMemo(() => {
    const defaultValue = miniSiderMenu.find(
      (item) => item.href === router.asPath,
    );
    return defaultValue ? defaultValue.key : "";
  }, [router.asPath]);

  return (
    <>
      <Sider className={styles.root} width={wideScreenAndFullMode}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[defaultSelectedKey]}
          mode="inline"
        >
          {isWideScreen ? (
            <>
              {isSiderExpanded ? (
                <>
                  {miniSiderMenu?.map((item: any) => (
                    <Menu.Item
                      key={item.key}
                      className={styles.expandedSidebarItem}
                    >
                      <Link href={`${item.href}`}>
                        <div className={styles.expandedSidebarSubItem}>
                          <div className={styles.expandedSidebarItemIcon}>
                            {item.icon}
                          </div>
                          <div className={styles.expandedSidebarItemTitle}>
                            {item.label}
                          </div>
                        </div>
                      </Link>
                    </Menu.Item>
                  ))}
                </>
              ) : (
                <>
                  {miniSiderMenu?.map((item: any) => (
                    <Menu.Item
                      key={item.key}
                      className={styles.collapsedSidebarItem}
                    >
                      <Link href={`${item.href}`}>
                        <div className={styles.collapsedSidebarItemIcon}>
                          {item.icon}
                        </div>
                        <span className={styles.collapsedSidebarItemTitle}>
                          {item.label}
                        </span>
                      </Link>
                    </Menu.Item>
                  ))}
                </>
              )}
            </>
          ) : (
            <>
              {miniSiderMenu?.map((item: any) => (
                <Menu.Item
                  key={item.key}
                  className={styles.collapsedSidebarItem}
                >
                  <Link href={`${item.href}`}>
                    <div className={styles.collapsedSidebarItemIcon}>
                      {item.icon}
                    </div>
                    <span className={styles.collapsedSidebarItemTitle}>
                      {item.label}
                    </span>
                  </Link>
                </Menu.Item>
              ))}
            </>
          )}
        </Menu>
      </Sider>
    </>
  );
}
