import React, { ChangeEvent } from 'react'
import { Input } from 'antd/lib'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons/lib'
import Field from '../Field'

export interface Props {
  width: number
  height: number
  onChange: (value: string) => void
  label?: string
  error?: string | undefined
  placeholder?: string
  defaultValue?: string
  isPassword?: boolean
  maxLength?: number
  value: string
  description: string
  setInputOnFocus?: any
}

export default function __Input({ width, height, onChange, label, error, placeholder, defaultValue, maxLength, isPassword, value, description, setInputOnFocus }: Props) {
  const handleChangeInput = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange(value)
  }, [ onChange ])
  const [ onFocus, setOnFocus ] = React.useState(false)


  const handleFocus = React.useCallback(() => {
    setOnFocus(true)
    if (setInputOnFocus) {
      setInputOnFocus(true)
    } else return
  }, [ setOnFocus, setInputOnFocus ])

  const handleBlur = React.useCallback(() => {
    setOnFocus(false)
  }, [ setOnFocus ])

  return (
    <div>
      <Field label={label} onFocus={onFocus} error={error} value={value} description={description}>
        {!isPassword ? (
          <>
            <Input onChange={handleChangeInput} placeholder={placeholder} defaultValue={defaultValue} maxLength={maxLength} onFocus={handleFocus} onBlur={handleBlur}
              style={{ display: 'block', width: `${width}px`, height: `${height}px` }} />
          </>
        ) : (
          <Input.Password onChange={handleChangeInput} placeholder={placeholder} defaultValue={defaultValue} maxLength={maxLength} onFocus={handleFocus}
            style={{ display: 'block', width: `${width}px`, height: `${height}px`, padding: '8px 10px' }}
            iconRender={(visible) => (visible ? <EyeTwoTone style={{ position: 'relative', top: '-17px', right: '-350px' }} /> :
              <EyeInvisibleOutlined style={{ position: 'relative', top: '-17px', right: '-350px' }} />)}
          />
        )}
      </Field>
    </div>
  )
}