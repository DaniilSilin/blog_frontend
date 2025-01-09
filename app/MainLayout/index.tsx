import React from 'react'

import { Layout } from 'antd/lib'
import FooterReact from '@/app/MainLayout/Footer'
import HeaderReact from '@/app/MainLayout/Header'
import ContentReact from '@/app/MainLayout/Content'
import Sider from './Sider'

export interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <Layout>
      <HeaderReact />
      <Layout>
        <Sider />
        <ContentReact children={children} />
      </Layout>
      <FooterReact />
    </Layout>
  )
}