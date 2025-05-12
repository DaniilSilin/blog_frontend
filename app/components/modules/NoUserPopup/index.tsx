import React from "react";
import Link from "next/link";

import styles from "./no_user_popup.module.css";

export interface Props {
  title?: string;
  description: string;
  redirectTo: string;
  marginTop: number;
}

export default function NoUserPopup({
  title,
  description,
  redirectTo,
  marginTop,
}: Props) {
  return (
    <div className={styles.root} style={{ marginTop: marginTop }}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div>
        <Link className={styles.loginButton} href={`/login?next=${redirectTo}`}>
          Войти
        </Link>
      </div>
    </div>
  );
}
