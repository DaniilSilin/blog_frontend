import React, { FormEvent } from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useRouter } from "next/router";
import classNames from "classnames";

import Input from "@/app/components/modules/form/Input";
import YandexCaptcha from "../../../components/modules/form/YandexCaptcha";
import {
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  usernameValidator,
  passwordValidator,
  confirmPasswordValidator,
} from "../../modules/form/validators";

import styles from "./register.module.css";

const usernameDescription =
  "Минимальная длина: 3 символа. Ваше имя пользователя может содержать латинские буквы, цифры и знак нижнего подчёркивания.";
const passwordDescription =
  "Минимальная длина: 8 символов. Ваш пароль должен содержать строчные и заглавные буквы, а также цифры.";
const passwordConfirm =
  "Повторите пароль, чтобы исключить вероятность опечатки.";

export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const [emailError, setEmailError] = React.useState<string>("");
  const [usernameError, setUsernameError] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");
  const [firstNameError, setFirstNameError] = React.useState<string>("");
  const [lastNameError, setLastNameError] = React.useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] =
    React.useState<string>("");
  const [captchaError, setCaptchaError] = React.useState<string>("");

  const firstNameRef = React.useRef(null);

  const [token, setToken] = React.useState<string | undefined>("");
  const [registerUser] = DjangoService.useRegisterMutation();
  const [readyToSubmit, setReadyToSubmit] = React.useState(false);
  const { data: isUsernameAvailable } =
    DjangoService.useIsUsernameAvailableQuery({ username });

  const formValidation = React.useCallback(() => {
    let isValid = true;

    const validators = [
      {
        validator: firstNameValidator,
        value: firstName,
        setError: setFirstNameError,
      },
      {
        validator: lastNameValidator,
        value: lastName,
        setError: setLastNameError,
      },
      { validator: emailValidator, value: email, setError: setEmailError },
      {
        validator: (username) =>
          usernameValidator(username, isUsernameAvailable),
        value: username,
        setError: setUsernameError,
      },
      {
        validator: passwordValidator,
        value: password,
        setError: setPasswordError,
      },
      {
        validator: (confirmPassword) =>
          confirmPasswordValidator(password, confirmPassword),
        value: confirmPassword,
        setError: setConfirmPasswordError,
      },
    ];

    for (const { validator, value, setError } of validators) {
      const error = validator(value);
      if (error) {
        setError(error);
        isValid = false;
      } else {
        setError("");
      }
    }

    if (!token) {
      setCaptchaError("Не пройдена капча");
      isValid = false;
    } else {
      setCaptchaError("");
    }

    return isValid;
  }, [
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword,
    token,
    setFirstNameError,
    setCaptchaError,
    setLastNameError,
    setEmailError,
    setPasswordError,
    setUsernameError,
    isUsernameAvailable,
    setConfirmPasswordError,
  ]);

  const focusErrorInputOnHandleSubmit = React.useCallback(() => {
    if ((setFirstNameError && firstName) || !firstName) {
    }
  }, [setFirstNameError, firstName]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = formValidation();
    focusErrorInputOnHandleSubmit();
    if (isValid) {
      const register = await registerUser({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
      });
      if (!register.error) {
        router.push("/login");
      }
    }
  };

  React.useEffect(() => {
    const submit = formValidation();
    setReadyToSubmit(submit);
  }, [
    firstName,
    lastName,
    email,
    username,
    password,
    passwordConfirm,
    isUsernameAvailable,
    setReadyToSubmit,
  ]);

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit}>
        <div className={styles.registerTitle}>Регистрация</div>
        <div className={styles.formContainer}>
          <Input
            width={400}
            height={40}
            onChange={setFirstName}
            label={"Имя"}
            error={firstNameError}
            value={firstName}
            description={"Введите ваше имя."}
            ref={firstNameRef}
          />
          <Input
            width={400}
            height={40}
            onChange={setLastName}
            label={"Фамилия"}
            error={lastNameError}
            value={lastName}
            description={"Введите вашу фамилию."}
          />
          <Input
            width={400}
            height={40}
            onChange={setEmail}
            label={"E-mail"}
            error={emailError}
            value={email}
            description={"Адрес вашей электронной почты."}
          />
          <Input
            width={400}
            height={40}
            onChange={setUsername}
            label={"Имя пользователя"}
            error={usernameError}
            maxLength={15}
            value={username}
            description={usernameDescription}
          />
          <Input
            width={400}
            height={40}
            onChange={setPassword}
            label={"Пароль"}
            isPassword={true}
            error={passwordError}
            value={password}
            description={passwordDescription}
          />
          <Input
            width={400}
            height={40}
            onChange={setConfirmPassword}
            label={"Повторите пароль"}
            isPassword={true}
            error={confirmPasswordError}
            description={passwordConfirm}
            value={confirmPassword}
          />
          <YandexCaptcha
            language={"ru"}
            setToken={setToken}
            error={captchaError}
          />
          <input
            type="submit"
            disabled={!readyToSubmit}
            value={"Войти"}
            onClick={handleSubmit}
            className={classNames(styles.registerButton, {
              [styles.active]: readyToSubmit,
            })}
          />
        </div>
      </form>
    </div>
  );
}
