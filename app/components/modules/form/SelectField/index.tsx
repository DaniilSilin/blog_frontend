import React, { ChangeEvent } from 'react'
import { Select, Space } from 'antd/lib'
import type { SelectProps } from 'antd'

const BASE_URL = 'http://localhost:8000'

export interface Props {
  options: any
  label: string
}

export default function SelectField({ options, label }: Props) {
  const [ value, setValue ] = React.useState('')

  const onChange = (value2: string) => {
      console.log(value2)
   //    console.log(value)
   // setValue(value.data.username)
 }

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

  return (
    <div style={{marginBottom: '20px'}}>
      <div style={{fontSize: '16px', marginBottom: '5px'}}>{label}</div>
      <Select
                 onSearch={}
                 style={{ width: '400px' }}
                 placeholder="Выберите пользователя"
                 onChange={(value) => {console.log(value)}}
                 options={options}
                 optionRender={(option) => (
                     <Space>
            <span role="img" aria-label={option.data.username}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={`${BASE_URL}${option.data.avatar_small}`} style={{borderRadius: '50%', marginRight: '10px'}}
                     width={40} height={40} alt=''/>
                  <div>
                    <div style={{fontSize: '16px'}}>{option.data.username}</div>
                    <div style={{fontSize: '14px'}}>{option.data.email}</div>
                  </div>
              </div>
            </span>
                     </Space>
                 )}
      />
    </div>
  )
}