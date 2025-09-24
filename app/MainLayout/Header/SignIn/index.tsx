import React from "react";
import Link from "next/link";

import { FaRegUserCircle } from "react-icons/fa";

import styles from "./sign_in.module.css";

export default function SignIn() {
  return (
    <div className={styles.root}>
      <Link className={styles.linkContainer} href={"/login"}>
        <div className={styles.linkSubContainer}>
          <FaRegUserCircle size={20} />
          Войти
        </div>
      </Link>
    </div>
  );
}
