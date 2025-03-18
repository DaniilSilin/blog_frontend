import React, { FormEvent } from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useRouter } from "next/router";
import Link from "next/link";

import Input from "@/app/components/modules/form/Input";
import CookieHelper from "@/app/store/cookieHelper";

import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [getUserData] = DjangoService.useLazyGetUserDataQuery();

  const [loginUser] = DjangoService.useGetLoginMutation();

  const handleSubmit = async (e: FormEvent) => {
    const redirectTo = router.query.next || "/";
    e.preventDefault();
    const response = await loginUser({ username, password });
    console.log(response);
    CookieHelper.setCookie("token", response.data.token, 365);
    getUserData();
    router.push(redirectTo);
  };

  const [isCapsLockOn, setIsCapsLockOn] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setIsCapsLockOn(event.getModifierState("CapsLock"));
      console.log(isCapsLockOn);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit}>
        <div className={styles.signInTitle}>Войти</div>
        <Input
          width={300}
          height={50}
          onChange={setUsername}
          label={"Имя пользователя"}
          placeholder={"Имя пользователя"}
        />
        <Input
          width={300}
          height={50}
          onChange={setPassword}
          label={"Пароль"}
          isPassword={true}
          placeholder={"Пароль"}
        />
        {isCapsLockOn && <div>CapsLock активен</div>}
        <input
          className={styles.loginButton}
          type={"submit"}
          value={"Войти"}
          onClick={handleSubmit}
        />
      </form>
      <Link href={"/register"}>
        <div style={{ textDecoration: "underline" }}>
          У Вас нет аккаунта? Тогда зарегистрируйтесь
        </div>
      </Link>
    </div>
  );
}
