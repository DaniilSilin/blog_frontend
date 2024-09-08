import React from 'react'

const { Content, Breadcrumb } = Layout
import { Layout, theme } from 'antd/lib'

export interface Props {
  children: React.ReactNode
}

export default function ContentReact({ children }: Props) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
      <Content style={{ padding: '0 48px', margin: '16px 0' }}>
        {/*<Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>*/}
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
  )
}