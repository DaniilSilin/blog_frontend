import React from 'react'

import { Layout, Menu, theme } from 'antd/lib'
const { Header } = Layout
import { useAppSelector } from "../../store"
import HeaderProfile from "@/app/MainLayout/Header/HeaderProfile"
import HeaderData from "@/app/MainLayout/Header/HeaderData"

export default function HeaderReact() {
  const headerMenu = [
    {
      id: 1,
      label: <HeaderProfile />,
    },
    {
      id: 2,
      label: <HeaderData />
    }
  ]

  return (
    <Header style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <div className="demo-logo" />
      {/*<Menu theme="dark" mode="horizontal" items={headerMenu}></Menu>*/}
      <HeaderProfile />
      {/*<HeaderData />*/}
      {/*<div className="demo-logo" />*/}
      {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={headerMenu} style={{ flex: 1, flexDirection: 'row-reverse' }}/>*/}
    </Header>
  )
}