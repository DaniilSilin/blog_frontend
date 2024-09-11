import React, { ChangeEvent } from 'react'


export interface Props {
  orderList: string[]
  setOrderList: (value: string[]) => void
  item: any
  index: number
}


export default function ConstantsCheckbox({ orderList, setOrderList, item, index}: Props) {
  const changeOrderList = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setOrderList([...orderList, item.name])
    } else {
      setOrderList(orderList.filter(item1 => item1 !== item.name))
    }
    console.log(orderList)
  }, [ orderList, setOrderList ])

  return (
    <div>
      <label>
        <input type={'checkbox'} onChange={changeOrderList} />
        {item.name}
      </label>
    </div>
  )
}