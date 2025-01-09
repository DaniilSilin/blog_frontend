import React, { ChangeEvent } from 'react'
import { Select, Space } from 'antd/lib'

const BASE_URL = 'http://localhost:8000'

export interface Props {
  options: any
  value: string
  setValue: any
}

export default function SelectField({ options, setValue, value }: Props) {
  const handleChange = (selectedValues: string[]) => {
   console.log(selectedValues)
   setValue(selectedValues)
 }

  return (
    <div>
      <Select
        style={{ width: '400px' }}
        placeholder="Выберите пользователя"
        onChange={handleChange}
        options={options}
        value={value}
        optionLabelProp="label"
        optionRender={(option) => (
          <Space value='123'>
            <span role="img" aria-label={option.data.username}>
              <div style={{ display: 'flex' }}>
                <img src={`${BASE_URL}${option.data.avatar}`} width={32} height={32} alt='' />
                <div>{option.data.username}</div>
              </div>
            </span>
          </Space>
        )}
      />
    </div>
  )
}