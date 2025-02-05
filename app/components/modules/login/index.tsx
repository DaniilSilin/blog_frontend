import React, {FormEvent} from 'react'
import DjangoService from "@/app/store/services/DjangoService";
import Input from "@/app/components/modules/form/Input";

import styles from './login.module.css'
import CookieHelper from "@/app/store/cookieHelper";
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const [ username, setUsername ] = React.useState<string>('')
  const [ password, setPassword ] = React.useState<string>('')

  const [ loginUser ] = DjangoService.useGetLoginMutation()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const response = await loginUser({ username, password })
    CookieHelper.setCookie('token', response.data.token, 365)
    router.push('/')
  }

  return (
    <div className={styles.root}>
        <form onSubmit={handleSubmit}>
            <div className={styles.signInTitle}>Войти</div>
            <Input width={300} height={50} onChange={setUsername} label={'Имя пользователя'}
                   placeholder={'Имя пользователя'}/>
            <Input width={300} height={50} onChange={setPassword} label={'Пароль'} isPassword={true}
                   placeholder={'Пароль'}/>
            <input className={styles.loginButton} type={"submit"} value={'Войти'} onClick={handleSubmit} />
        </form>
    </div>
  )
}