import React from 'react'

import { Layout, Menu, theme } from 'antd/lib';
const { Header } = Layout;

export default function HeaderReact() {
  const items = new Array(1).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
  }));

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  )
}