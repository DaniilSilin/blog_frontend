import React from 'react'
import { VscSettings } from 'react-icons/vsc'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2'
import __Input from "@/app/components/modules/form/Input"
import { ConfigProvider, DatePicker, Space } from 'antd/lib'
const { RangePicker } = DatePicker
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io"
import moment from 'moment'

import ConstantsCheckbox from "@/app/components/modules/filter/constantsCheckbox"
import locale from 'antd/locale/ru_RU'
import { useRouter } from 'next/router'

import styles from './filter.module.css'

export interface Props {
  page: number
  cleanParams: any
}

const params = [
  {
    id: 1,
    value: 'title_asc',
    label: 'По названию (по возрастанию)',
  },
  {
    id: 2,
    value: 'title_desc',
    label: 'По названию (по убыванию)',
  },
  {
    id: 3,
    value: 'date',
    label: 'По дате (новые)',
  },
  {
    id: 4,
    value: '-date',
    label: 'По дате (старые)',
  }
]

const dateFormat = 'YYYY-MM-DD'

export default function Filter({ page, cleanParams }: Props) {
  const router = useRouter()
  const [ showParamsFilter, setShowParamsFilter ] = React.useState<boolean>(false)
  const [ inputSearch, setInputSearch ] = React.useState<string>(cleanParams.search ? cleanParams.search : '')

  console.log(router)

  const setSearchQueryParam = React.useCallback((search: string) => {
      router.push({
        pathname: `/post/list/`,
        query: { ...router.query, search},
      }, {
        pathname: `/post/list/`,
        query: { ...router.query, search },
      },
        { shallow: true }
      )
  }, [ router ])

  const setSortByQueryParam = React.useCallback((sort_by: string) => {
     router.push({
      pathname: `/post/list/`,
      query: { ...router.query, sort_by: sort_by },
    }
    ,undefined, { shallow: true })
  }, [ router ])

  const setSortByDateParam = React.useCallback((before: string, after: string) => {
     router.push({
      pathname: `/post/list/`,
      query: { ...router.query, before: before, after: after },
    }
    ,undefined, { shallow: true })
  }, [ router ])

  const handleChangeDate = React.useCallback((date_1, date_2) => {
    setSortByDateParam(date_2[1], date_2[0])
  }, [ setSortByDateParam ])

  const dropdown = React.useCallback(() => {
    setShowParamsFilter(!showParamsFilter)
  }, [ showParamsFilter, setShowParamsFilter ])

  const alex = () => {
    setSearchQueryParam(inputSearch)
  }

  const defaultDateValues = (cleanParams.after && cleanParams.before) ? [moment(cleanParams.after), moment(cleanParams.before)] : undefined

  return (
    <ConfigProvider locale={locale}>
    <div className={styles.root}>
      <div className={styles.menu}>
        <div>
          <__Input width={400} height={30} onChange={setInputSearch} defaultValue={cleanParams.search} />
        </div>
        <div className={styles.icons}>
          <HiMiniMagnifyingGlass onClick={alex} />
          <VscSettings />
        </div>
      </div>
      <div className={styles.additionalSettings}>
        <div style={{ width: '300px'}}>
        <Space direction="vertical" size={12}>
          <RangePicker
              defaultValue={defaultDateValues}
              format={dateFormat}
              picker="day"
              onChange={handleChangeDate}
          />
        </Space>
        </div>
        <div>
          <div className={styles.sortingTitle} onClick={dropdown}>
            Сортировать по {cleanParams.sort_by ? params.find(param => param.value === cleanParams.sort_by).label : params[2].label}
            {showParamsFilter ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {showParamsFilter && (
            <div className={styles.sortingMenu}>
              {params.map((item, index) => (
                <ConstantsCheckbox key={item} item={item} cleanParams={cleanParams} setSortByQueryParam={setSortByQueryParam} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </ConfigProvider>
  )
}