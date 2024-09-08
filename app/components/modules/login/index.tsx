import React from 'react'
import { Input } from 'antd'
import DjangoService from "@/app/store/services/DjangoService";

export default function Login() {
  const [ username, setUsername ] = React.useState<string>('admin')
  const [ password, setPassword ] = React.useState<string>('admin')

  const [ loginUser, { isError } ] = DjangoService.useGetLoginMutation()

  const inputFunction = async () => {
    const response = await loginUser({ username, password })
    localStorage.setItem("authToken", response.data.token)
  }

  console.log()

  return (
    <div>
      <input />
      {/*<Input />*/}
      <input type={"submit"} value={'Войти'} onClick={inputFunction} />
    </div>
  )
}