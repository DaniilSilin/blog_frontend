import React, { ChangeEvent } from 'react'
import classNames from 'classnames'
import { useRouter } from "next/router"

import styles from './constants.module.css'

export interface Props {
  item: any
  cleanParams: any
}

export default function ConstantsCheckbox({ cleanParams, item }: Props) {
  const router = useRouter()

  console.log(cleanParams.sort_by)

  const setSortByDateParam = React.useCallback((e: MouseEvent) => {

    router.push({
      pathname: `${router.pathname}`,
      query: { ...router.query, sort_by: item.sort_by },
    }
    ,undefined, { shallow: true })
  }, [ router ])

  const currentSortParam = React.useMemo(() => {
    const currentSortParam = cleanParams.sort_by
    if (!currentSortParam) {
      return '-date'
    } else {
      return cleanParams.sort_by
    }
  }, [ cleanParams ])
  console.log(currentSortParam)
  console.log(cleanParams.sort_by === currentSortParam)

  return (
    <div>
      <div className={classNames(styles.optionSelected, {[styles.active]: currentSortParam === '-date' })} />
      {item.label}
    </div>
  )
}