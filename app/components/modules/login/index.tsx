import React, { FormEvent } from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useRouter } from "next/router";
import Link from "next/link";

import { BsCapslock } from "react-icons/bs";

import Input from "@/app/components/modules/form/Input";
import CookieHelper from "@/app/store/cookieHelper";

import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const [getUserData] = DjangoService.useLazyGetUserDataQuery();
  const [loginUser] = DjangoService.useGetLoginMutation();

  const handleSubmit = async (e: FormEvent) => {
    const redirectTo = router.query.next || "/";
    e.preventDefault();
    const response = await loginUser({ username, password });
    // @ts-ignore
    if (response.error) {
      setErrorMessage("Неправильный логин или пароль");
    } else {
      setErrorMessage("");
      // @ts-ignore
      CookieHelper.setCookie("token", response.data.token, 365);
      // @ts-ignore
      getUserData();
      // @ts-ignore
      router.push(redirectTo);
    }
  };

  const [isCapsLockOn, setIsCapsLockOn] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setIsCapsLockOn(e.getModifierState("CapsLock"));
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
        <div className={styles.loginContainer}>
          <Input
            width={300}
            height={50}
            onChange={setPassword}
            label={"Пароль"}
            placeholder={"Пароль"}
            isPassword
          />
          <div>
            {isCapsLockOn && (
              <BsCapslock size={20} className={styles.capslockIcon} />
            )}
          </div>
        </div>
        {!!errorMessage && (
          <div className={styles.errorDescription}>{errorMessage}</div>
        )}
        <input
          className={styles.loginButton}
          type={"submit"}
          value={"Войти"}
          onClick={handleSubmit}
        />
      </form>
      <Link className={styles.registerDescription} href={"/register"}>
        <div>У Вас нет аккаунта? Тогда зарегистрируйтесь!</div>
      </Link>
    </div>
  );
}
