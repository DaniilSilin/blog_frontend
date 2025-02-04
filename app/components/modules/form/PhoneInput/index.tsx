import React, { ChangeEvent } from 'react'
// import { Input as BaseInput } from 'antd/lib'
// import FormItem from "antd/es/form/FormItem/";
// import PhoneInput from "antd-phone-input";
import Field from './Field'
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export interface Props {
  width: number
  height: number
  onChange: any
  label?: string
  error?: string | undefined
  defaultValue?: string
  maxLength?: number
  value?: any
  description?: string
  setPhoneNumber: any
}

const countries = ['ru']

export default function PhoneInput1({ width, height, onChange, label, error, defaultValue, maxLength, value, description, setPhoneNumber }: Props ) {
  return (
    <div>
      <Field label={label} error={error} value={value} description={description}>
        <PhoneInput
          style={{ width: '400px' }}
          defaultCountry={'ru'}
          hideDropdown={true}
          disableCountryGuess={true}
          onChange={(phone, alex) => setPhoneNumber(phone)}
         />
      </Field>


          {/*<BaseInput onChange={handleChangeInput} defaultValue={defaultValue} maxLength={maxLength} onFocus={handleFocus} onBlur={handleBlur} value={value}*/}
          {/*  style={{ display: 'block', width: `${width}px`, height: `${height}px` }} />*/}
    </div>
  )
}
