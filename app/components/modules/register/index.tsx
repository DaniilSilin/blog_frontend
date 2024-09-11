import React from 'react'
import styles from './register.module.css'
import DjangoService from '@/app/store/services/DjangoService'

import __Input from '@/app/components/modules/form/Input'

export default function Register() {
  const [ email, setEmail ] = React.useState<string>('')
  const [ username, setUsername ] = React.useState<string>('')
  const [ password, setPassword ] = React.useState<string>('')

  const [ registerUser ] = DjangoService.useGetRegisterMutation()

  const registerUserF = () => {
    registerUser({email, username, password})
  }
  console.log(email)

  return (
    <div style={{margin: 'auto'}}>
      <__Input width={300} height={50} onChange={setEmail} label={'E-mail'}  />
      <__Input width={300} height={50} onChange={setUsername} label={'Имя пользователя'}  />
      <__Input width={300} height={50} onChange={setPassword} label={'Пароль'}  />
      <input type={'submit'} value={'Отправить'} onClick={registerUserF} />
    </div>
  )
}