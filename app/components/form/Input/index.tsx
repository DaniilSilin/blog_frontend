import React, { ChangeEvent } from 'react'
import { Input } from 'antd/lib'

export interface Props {
  width: number
  height: number
  onChange: (value: string) => void
  label: string
}

export default function __Input({ width, height, onChange, label }: Props) {
  const handleChangeInput = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange(value)
  }, [ onChange ])

  return (
    <div>
      <div>{label}</div>
      <Input onChange={handleChangeInput} style={{ display: 'block', width: `${width}px`, height: `${height}px`}} />
    </div>
  )
}