import React, { ChangeEvent } from 'react'

import styles from './constants.module.css'

export interface Props {
  item: any
  setSortByQueryParam: any
  cleanParams: any
}

export default function ConstantsCheckbox({ setSortByQueryParam, cleanParams, item }: Props) {
  const changeSortParam = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSortByQueryParam(item.value)
    }
  }, [ setSortByQueryParam, item ])

  return (
    <div>
      <label>
        <input type={'radio'} onChange={changeSortParam} value={item.value} checked={item.value===cleanParams.sort_by} defaultChecked={item.value===cleanParams.sort_by} />
        {item.label}
      </label>
    </div>
  )
}