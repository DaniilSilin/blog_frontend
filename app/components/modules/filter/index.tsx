import React, { ChangeEvent } from 'react'
import { VscSettings } from 'react-icons/vsc'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2'
import __Input from "@/app/components/modules/form/Input"
import constants from './constants'
import {ConfigProvider, DatePicker, Space} from 'antd/lib'
const { RangePicker } = DatePicker

import ConstantsCheckbox from "@/app/components/modules/filter/constantsCheckbox"
import locale from 'antd/locale/ru_RU'
import { useRouter } from 'next/router'

import styles from './filter.module.css'

export interface Props {
  searchInput: string,
  setSearchInput: (value: string) => void,
  orderList: string[],
  setOrderList: (value: string[]) => void
  date: [string | null, string | null]
  setDate: (value: [string | null, string | null]) => void
}

export default function Filter({ date, setDate, searchInput, setSearchInput, orderList, setOrderList }: Props) {
  const [ showParamsFilter, setShowParamsFilter ] = React.useState<boolean>(false)
  const router = useRouter()
  const dropdownRef = React.useRef(null)

  const dropdown = React.useCallback(() => {
    setShowParamsFilter(!showParamsFilter)
  }, [ showParamsFilter, setShowParamsFilter ])

    // console.log(date[1])

  // const routerPush = React.useCallback(() => {
  //    router.push({
  //     pathname: '/blog/list/',
  //     query: { ...router.query, order: orderList },
  //   }, undefined, { shallow: true })
  // }, [ router ])
  console.log(date)

  return (
      <ConfigProvider locale={locale}>
    <div className={styles.root}>
      <div className={styles.menu}>
        <div style={{ padding: '6px 10px'}}>
          <__Input width={400} height={30} onChange={setSearchInput} />
        </div>
        <div className={styles.icons}>
          <HiMiniMagnifyingGlass />
          <VscSettings />
        </div>
      </div>
      <div className={styles.additionalSettings}>
        <div style={{ width: '400px'}}>
        <Space direction="vertical" size={12}>
            <RangePicker
              format='YYYY-MM-DD'
              picker="day"
              id={{
                start: 'startInput',
                end: 'endInput',
              }}
              onFocus={(_, info) => {
                console.log('Focus:', info.range);
              }}
              onBlur={(_, info) => {
                console.log('Blur:', info);
              }}
              onChange={setDate}
            />
        </Space>
        </div>
        <div onClick={dropdown}>
          Фильтры
          {(<div>{constants.map((item, index) => (
            <ConstantsCheckbox key={item} orderList={orderList} setOrderList={setOrderList} item={item} index={index} />
        ))}</div>)}
        </div>
      </div>
    </div>
    </ConfigProvider>
  )
}