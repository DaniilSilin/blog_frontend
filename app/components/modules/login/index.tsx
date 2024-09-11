import React from 'react'
import { Input } from 'antd'
import DjangoService from "@/app/store/services/DjangoService";
import __Input from "@/app/components/modules/form/Input";

export default function Login() {
  const [ username, setUsername ] = React.useState<string>('')
  const [ password, setPassword ] = React.useState<string>('')

  const [ loginUser ] = DjangoService.useGetLoginMutation()

  const inputFunction = async () => {
    const response = await loginUser({ username, password })
    localStorage.setItem("authToken", response.data.token)
  }

  return (
    <div>
      <__Input width={300} height={50} onChange={setUsername} label={'Имя пользователя'}  />
      <__Input width={300} height={50} onChange={setPassword} label={'Пароль'}  />
      <input type={"submit"} value={'Войти'} onClick={inputFunction} />
    </div>
  )
}