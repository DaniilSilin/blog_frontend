import React, { ChangeEvent } from 'react'


export interface Props {
  orderList: string[]
  setOrderList: (value: string[]) => void
  item: any
}


export default function ConstantsCheckbox({ orderList, setOrderList, item }: Props) {
  const changeOrderList = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setOrderList([...orderList, item.name])
    } else {
      setOrderList(orderList.filter(item1 => item1 !== item.name))
    }
  }, [ orderList, setOrderList, item ])

  return (
    <div style={{ padding: '5px', backgroundColor: 'mediumvioletred' }}>
      <label>
        <input type={'checkbox'} onChange={changeOrderList} />
        {item.name}
      </label>
    </div>
  )
}