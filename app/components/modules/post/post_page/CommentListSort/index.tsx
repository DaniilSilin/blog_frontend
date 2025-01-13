import React from 'react'
import { DownOutlined, UpOutlined, CheckOutlined } from '@ant-design/icons/lib'

import styles from './comment_list.module.css'

export interface Props {
  setSortBy: (value: string) => void
  commentListSortRef: any
}

const sortingList = [
  {
    id: 1,
    label: 'Сначала новые',
    queryParam: 'newest'
  },
  {
    id: 2,
    label: 'Сначала старые',
    queryParam: 'oldest'
  },
]

export default function CommentListSort({ setSortBy, commentListSortRef }: Props) {
  const [ showMenu, setShowMenu ] = React.useState(false)
  const [ currentParam, setCurrentParam ] = React.useState<string>(sortingList[0].label)

  const setParam = React.useCallback((param: string, queryParam: string) => {
    setSortBy(queryParam)
    setCurrentParam(param)
    setShowMenu(false)
  }, [ setCurrentParam, setSortBy, setShowMenu ])

  // React.useEffect(() => {
  //   const handler = (e: MouseEvent) => {
  //     if (!commentListSortRef.current.contains(e.target)) {
  //       setShowMenu(false)
  //     }
  //   }
  //   document.addEventListener("mousedown", handler)
  //   return () => document.removeEventListener("mousedown", handler);
  // }, [ commentListSortRef ])

  const showParamMenuHandler = React.useCallback(() => {
    setShowMenu(!showMenu)
  }, [ setShowMenu, showMenu ])

  return (
    <div ref={commentListSortRef}>
      <div data-title="dropdown" className={styles.dropdownTitle} style={{ display: 'flex' }} onClick={showParamMenuHandler}>
        Упорядочить
        {showMenu ? <UpOutlined /> : <DownOutlined />}
      </div>
      {showMenu && (
        <div className={styles.dropdown}>
          {sortingList.map(param => (
            <div key={param.id} style={{ border: '1px solid gray', display: 'flex' }}>
              <div onClick={() => setParam(param.label, param.queryParam)}>{param.label}</div>
              <div>{param.label === currentParam ? <CheckOutlined /> : null}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}