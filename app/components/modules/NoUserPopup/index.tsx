import React from "react";
import Link from "next/link";

import styles from "./no_user_popup.module.css";

export interface Props {
  title?: string;
  description: string;
  redirectTo: string;
}

export default function NoUserPopup({ title, description, redirectTo }: Props) {
  return (
    <div className={styles.root}>
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
