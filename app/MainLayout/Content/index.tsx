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
      <Content>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 720,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
        <div style={{ width: '1100px', margin: '20px auto' }}>
          {children}
        </div>
        </div>
      </Content>
  )
}