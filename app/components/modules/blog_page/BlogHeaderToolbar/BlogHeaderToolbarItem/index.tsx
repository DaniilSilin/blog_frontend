import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

import styles from "./blog_header_toolbar_item.module.css";

export interface Props {
  item: any;
}

export default function BlogHeaderToolbarItem({ item }: Props) {
  const router = useRouter();

  return (
    <Link
      className={classNames(styles.toolbarButton, {
        [styles.active]: router.pathname === item.pathname,
      })}
      href={item.href}
    >
      <div>{item.title}</div>
    </Link>
  );
}
