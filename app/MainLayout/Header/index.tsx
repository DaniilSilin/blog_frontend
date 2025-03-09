import React from 'react'

import { Layout, Menu } from 'antd/lib'
const { Header } = Layout
import HeaderProfile from "@/app/MainLayout/Header/HeaderProfile"

export default function HeaderReact() {
  const headerMenu = [
    {
      id: 1,
      label: <HeaderProfile />,
    },
  ]

  return (
    <Header style={{ display: 'flex', flexDirection: 'row-reverse', lineHeight: '30px' }}>
      {/*<div className="demo-logo" />*/}
      <Menu theme="dark" mode="horizontal">
        <HeaderProfile />
      </Menu>
      {/*<HeaderProfile />*/}
      {/*<HeaderData />*/}
      {/*<div className="demo-logo" />*/}
      {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={headerMenu} style={{ flex: 1, flexDirection: 'row-reverse' }}/>*/}
    </Header>
  )
}