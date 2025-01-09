import React from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import __Input from '@/app/components/modules/form/Input'
import YandexCaptcha from '../../../components/modules/form/YandexCaptcha'
import { firstNameValidator, lastNameValidator, emailValidator, usernameValidator, passwordValidator, confirmPasswordValidator } from '../../modules/form/validators'
import { useRouter } from 'next/router'

import styles from './register.module.css'

const firstNameDescription = 'Введите ваше имя.'
const lastNameDescription = 'Введите вашу фамилию.'
const emailDescription = 'Адрес вашей электронной почты.'
const usernameDescription = 'Минимальная длина: 3 символа. Имя пользователя может содержать Латинские символы, цифры и символ "_".'
const passwordDescription = 'Минимальная длина: 8 символов. Ваш пароль должен содержать строчные и заглавные буквы, а также цифры.'
const passwordConfirm = 'Повторите пароль, чтобы исключить вероятность опечатки.'

export default function Register() {
  const router = useRouter()
  const [ firstName, setFirstName ] = React.useState<string>('')
  const [ lastName, setLastName ] = React.useState<string>('')
  const [ email, setEmail ] = React.useState<string>('')
  const [ username, setUsername ] = React.useState<string>('')
  const [ password, setPassword ] = React.useState<string>('')
  const [ confirmPassword, setConfirmPassword ] = React.useState<string>('')

  const [ emailError, setEmailError ] = React.useState<string>('')
  const [ usernameError, setUsernameError ] = React.useState<string>('')
  const [ passwordError, setPasswordError ] = React.useState<string>('')
  const [ firstNameError, setFirstNameError ] = React.useState<string>('')
  const [ lastNameError, setLastNameError ] = React.useState<string>('')
  const [ confirmPasswordError, setConfirmPasswordError ] = React.useState<string>('')
  const [ captchaError, setCaptchaError ] = React.useState<string>('')

  const firstNameRef = React.useRef(null)

  const [ token, setToken ] = React.useState<string | undefined>('')
  const [ registerUser ] = DjangoService.useRegisterMutation()
  const { data: isUsernameAvailable, isLoading } = DjangoService.useIsUsernameAvailableQuery({ username: username })

  const formValidation = React.useCallback(() => {
    let isValid = false

    if (firstNameValidator(firstName)) {
      setFirstNameError(firstNameValidator(firstName))
      isValid = false
    } else {
      setFirstNameError('')
      isValid = true
    }

    if (lastNameValidator(lastName)) {
      setLastNameError(lastNameValidator(email))
      isValid = false
    } else {
      setLastNameError('')
      isValid = true
    }

    if (emailValidator(email)) {
      setEmailError(emailValidator(email))
      isValid = false
    } else {
      setEmailError('')
      isValid = true
    }

    if (usernameValidator(username, isUsernameAvailable)) {
      setUsernameError(usernameValidator(username, isUsernameAvailable))
      isValid = false
    } else {
      setUsernameError('')
      isValid = true
    }

    if (passwordValidator(password)) {
      isValid = false
      setPasswordError(passwordValidator(password))
    } else {
      setPasswordError('')
      isValid = true
    }

    if (!token) {
      isValid = false
      setCaptchaError('Не пройдена капча')
    } else {
      setCaptchaError('Не пройдена капча')
      isValid = true
    }

    if (confirmPasswordValidator(password, confirmPassword)) {
      setConfirmPasswordError(confirmPasswordValidator(password, confirmPassword))
      isValid = false
    } else {
      setConfirmPasswordError('')
      isValid = true
    }

    return isValid
  }, [ firstName, lastName, email, username, password, confirmPassword, token, setFirstNameError, setCaptchaError,
    setLastNameError, setEmailError, setPasswordError, setUsernameError, isUsernameAvailable, setConfirmPasswordError ])


  const focusErrorInputOnHandleSubmit = React.useCallback(() => {
    if (setFirstNameError && firstName || !firstName) {
    }
  }, [ setFirstNameError, firstName ])

  const handleSubmit = async () => {
    const isValid = formValidation()
    focusErrorInputOnHandleSubmit()
    if (isValid) {
      const register = await registerUser({ email, username, password })
    }
  }

  React.useEffect(() => {
    formValidation()
  }, [ firstName, lastName, email, username, password, passwordConfirm, isUsernameAvailable ])

  return (
    <div className={styles.root}>
      <div className={styles.registerTitle}>Регистрация</div>
      <div className={styles.formContainer}>
        <__Input width={400} height={40} onChange={setFirstName} label={'Имя'} error={firstNameError} value={firstName} description={firstNameDescription} ref={firstNameRef} />
        <__Input width={400} height={40} onChange={setLastName} label={'Фамилия'} error={lastNameError} value={lastName} description={lastNameDescription} />
        <div style={{ display: 'flex' }}>
          <__Input width={400} height={40} onChange={setEmail} label={'E-mail'} error={emailError} value={email} description={emailDescription} />
        </div>
        <div style={{ display: 'flex' }}>
          <__Input width={400} height={40} onChange={setUsername} label={'Имя пользователя'} error={usernameError} maxLength={15}
                   value={username} description={usernameDescription} />
        </div>
        <__Input width={400} height={40} onChange={setPassword} label={'Пароль'} isPassword={true} error={passwordError} value={password} description={passwordDescription} />
        <__Input width={400} height={40} onChange={setConfirmPassword} label={'Повторите пароль'} isPassword={true} error={confirmPasswordError}
                 description={passwordConfirm} value={confirmPassword} />
        <YandexCaptcha language={'ru'} setToken={setToken} error={captchaError} />
        <input type='submit' value={'Войти'} onClick={handleSubmit} className={styles.registerButton} />
      </div>
    </div>
  )
}