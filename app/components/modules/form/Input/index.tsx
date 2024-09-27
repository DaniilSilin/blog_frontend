import React, { ChangeEvent } from 'react'
import { Input } from 'antd/lib'
import Field from '../Field'

export interface Props {
  width: number
  height: number
  onChange: (value: string) => void
  label: string
  error?: string | undefined
}

export default function __Input({ width, height, onChange, label, error }: Props) {
  const handleChangeInput = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange(value)
  }, [ onChange ])

  return (
    <div>
      <Field label={label} error={error}>
        <Input onChange={handleChangeInput} style={{ display: 'block', width: `${width}px`, height: `${height}px`}} />
      </Field>
    </div>
  )
}