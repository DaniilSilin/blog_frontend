import React from 'react'
import DjangoService from "@/app/store/services/DjangoService";
import __Input from "@/app/components/modules/form/Input";

import styles from './login.module.css'

export default function Login() {
  const [ username, setUsername ] = React.useState<string>('')
  const [ password, setPassword ] = React.useState<string>('')

  const [ loginUser ] = DjangoService.useGetLoginMutation()

  const inputFunction = async () => {
    const response = await loginUser({ username, password })
    console.log(response)
    localStorage.setItem("authToken", response.data.token)
  }

  return (
    <div className={styles.root}>
      <div className={styles.signInTitle}>Войти</div>
      <__Input width={300} height={50} onChange={setUsername} label={'Имя пользователя'} placeholder={'Имя пользователя'} />
      <__Input width={300} height={50} onChange={setPassword} label={'Пароль'} isPassword={true} placeholder={'Пароль'} />
      <input className={styles.loginButton} type={"submit"} value={'Войти'} onClick={inputFunction} />
    </div>
  )
}