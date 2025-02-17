import React from 'react'
import { Select, Space } from 'antd/lib'

export interface Props {
  title: string
  data: any
  setAddressee: (value: string) => void
  setUsername: (value: string) => void
}

const BASE_URL = 'http://127.0.0.1:8000'

export default function SelectField({ title, data, setAddressee, setUsername }: Props) {

  const searchUserByUsername = React.useCallback((value: string) => {
    setUsername(value)
  }, [ setUsername ])

  const selectUser = React.useCallback((value: any) => {
    setAddressee(value.value)
  }, [ setAddressee ])
  return (
    <div>
      <h2 style={{ fontSize: '16px', marginBottom: '5px' }}>{title}</h2>
        <Select
          labelInValue
          showSearch
            onSearch={searchUserByUsername}
            style={{width: '400px'}}
            placeholder="Выберите пользователя"
            onSelect={selectUser}
            options={data}
            optionRender={(option) => (
              <Space>
                <span role="img" aria-label={option.data.username}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                      {option.data.avatar_small ? (
                          <img src={`${BASE_URL}${option.data.avatar_small}`}
                               style={{borderRadius: '50%', marginRight: '10px'}}
                               width={40} height={40} alt=''/>
                      ) : (
                          <img src={'/img/default/avatar_default.jpg'}
                               style={{borderRadius: '50%', marginRight: '10px'}}
                               width={40} height={40} alt=''/>
                      )}
                      <div>
                        <div style={{fontSize: '16px'}}>{option.data.value}</div>
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