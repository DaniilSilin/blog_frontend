import React from 'react'
import { Select as BaseSelect, Space } from 'antd/lib'

export interface Props {
  data: any
  defaultValue: any
  onChange: any
  gender: any
  label: string
}

export default function Select({ data, defaultValue, onChange, gender, label }: Props) {
  const handleChange = (value: string) => {
    onChange(value)
  }

  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{ marginBottom: '4px', fontSize: '15px', fontWeight: '500' }} >{label}</div>
      <Space wrap>
        <BaseSelect
          defaultValue={defaultValue}
          value={gender}
          style={{ width: 120 }}
          onChange={handleChange}
          options={data}
        />
      </Space>
    </div>
  )
}