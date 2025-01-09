import React from 'react'

const { Content } = Layout
import { Layout, theme, Breadcrumb } from 'antd/lib'

export interface Props {
  children: React.ReactNode
}

export default function ContentReact({ children }: Props) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  return (
      <Content style={{ padding: '0 48px', margin: '16px 0' }}>
          <Breadcrumb
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            style={{ margin: '16px 2px' }}
          />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 720,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
  )
}