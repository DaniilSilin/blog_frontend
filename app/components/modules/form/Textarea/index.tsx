import React, { ChangeEvent } from 'react'
import { Flex, Input } from 'antd/lib';

const { TextArea } = Input;
import Field from '../Field'

export interface Props {
  width: number
  height: number
  onChange: (value: string) => void
  label?: string
  error?: string | undefined
  placeholder?: string
  defaultValue?: string
}

export default function _TextArea({ width, height, onChange, label, error, placeholder, defaultValue }: Props) {
  const handleChangeInput = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange(value)
  }, [ onChange ])

  const handleChangeValue = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange(value)
  }, [ onChange ])

  return (
    <div>
      <Field label={label} error={error}>
        <TextArea showCount maxLength={250} onChange={handleChangeInput} defaultValue={defaultValue} placeholder="can resize" style={{ display: 'block', width: `${width}px`, height: `${height}px`}} />
        {/*<Input onChange={handleChangeInput} placeholder={placeholder} defaultValue={defaultValue} style={{ display: 'block', width: `${width}px`, height: `${height}px`}} />*/}
      </Field>
    </div>
  )
}