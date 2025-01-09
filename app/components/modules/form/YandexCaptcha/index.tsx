import React from 'react'
import { SmartCaptcha } from '@yandex/smart-captcha'
import Field from "@/app/components/modules/form/Field"

export interface Props {
  setToken: (value: string) => void
  error: string
}

export default function YandexCaptcha({ setToken, error }: Props) {
  return (
    <div>
        <SmartCaptcha sitekey={'ysc1_2ZI0asoXIE1TtagkykBzdtbUyfUFUtJR9WuSJ1gK4e4cd413'} language={'ru'} onSuccess={setToken} />
        {error && (
          <div>Обязательное поле</div>
        )}
    </div>
  )
}