import React, { ChangeEvent } from 'react'
import { VscSettings } from 'react-icons/vsc'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2'
import __Input from "@/app/components/modules/form/Input"
import constants from './constants'
import Calendar from '../calendar'

import ConstantsCheckbox from "@/app/components/modules/filter/constantsCheckbox";

import { useRouter } from 'next/router'

import styles from './filter.module.css'

export interface Props {
  searchInput: string,
  setSearchInput: (value: string) => void,
  orderList: string[],
  setOrderList: (value: string[]) => void
}

export default function Filter({ searchInput, setSearchInput, orderList, setOrderList }: Props) {
  const [ showParamsFilter, setShowParamsFilter ] = React.useState<boolean>(false)
  const router = useRouter()
  const dropdownRef = React.useRef(null)

  const dropdown = React.useCallback(() => {
    setShowParamsFilter(!showParamsFilter)
  }, [ showParamsFilter, setShowParamsFilter ])

  const routerPush = React.useCallback(() => {
     router.push({
      pathname: '/blog/list/',
      query: { ...router.query, search: searchInput },
    }, undefined, { shallow: true })
  }, [ router, searchInput, orderList ])

  return (
    <div className={styles.root}>
      <div className={styles.menu}>
        <div style={{ padding: '6px 10px'}}>
          <__Input width={400} height={30} onChange={setSearchInput} />
        </div>
        <div className={styles.icons}>
          <HiMiniMagnifyingGlass onClick={routerPush} />
          <VscSettings />
        </div>
      </div>
      <div className={styles.additionalSettings}>
        <div style={{ marginLeft: '400px'}} onClick={dropdown}>
          Фильтры
          {showParamsFilter && (<div>{constants.map((item, index) => (
            <ConstantsCheckbox key={item} orderList={orderList} setOrderList={setOrderList} item={item} index={index} />
        ))}</div>)}
        </div>
      </div>
    </div>
  )
}