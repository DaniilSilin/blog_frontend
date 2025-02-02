import React from 'react'
import { CiWarning } from "react-icons/ci"
import { FaCheck } from "react-icons/fa6"
import classNames from "classnames"
import styles from './field.module.css'

export interface Props {
  label?: string | undefined
  children: React.ReactNode
  error: string | undefined
  value: string
  description: string
  onFocus: boolean
  blog_slug: string
}

export default function Field({ label, children, error, value, description, onFocus, blog_slug }: Props) {
  const isInputEmptyOrHasNoError = React.useMemo(() => {
    return !!(!error && !value || !error && value);
  }, [ error, value ])

  const iconValue = React.useMemo(() => {
    if (!error && !value) {
      return '1'
    } else if (error && value) {
      return '2'
    } else {
      return '3'
    }
  }, [ error, value ])

  return (
    <div style={{ margin: '10px 0' }}>
      <div className={classNames(styles.label, {
        [styles.active]: onFocus,
        [styles.non_active]: !onFocus
      })}>{label}</div>
      <div style={{ display: 'flex' }}>
        {children}
        {/*{iconValue === '3' && <div><FaCheck color={'green'} size={25} style={{ position: 'absolute', margin: '8px 8px' }} /></div>}*/}
        {/*{iconValue === '2' && <div><CiWarning color={'red'} size={25} style={{ position: 'absolute', margin: '8px 8px' }} /></div>}*/}
      </div>
      <>
        {isInputEmptyOrHasNoError ? (
          <div className={classNames(styles.description, {
            [styles.active]: onFocus,
            [styles.non_active]: !onFocus
          })}>{blog_slug ? blog_slug : description}</div>
        ) : (
          <div className={classNames(styles.error, {
            [styles.active]: onFocus,
            [styles.non_active]: !onFocus
          })}>{error}</div>
        )}
      </>
    </div>
  )
}