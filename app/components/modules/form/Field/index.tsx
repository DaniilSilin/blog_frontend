import React from 'react'

export interface Props {
  label: string | undefined
  children: React.ReactNode
  error: string | undefined
}


export default function Field({ label, children, error }: Props) {
  return (
    <div>
      <div>{label}</div>
      {children}
      <div>{error}</div>
    </div>
  )
}