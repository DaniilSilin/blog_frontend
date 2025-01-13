import React, { ChangeEvent } from 'react'
import { Flex, Input } from 'antd/lib';

const { TextArea } = Input;
import Field from '../Field'

export interface Props {
  height: number
  onChange: (value: string) => void
  placeholder?: string
  defaultValue?: string
  setInputIsFocused?: any
  value: string
}

const CommentInput = React.forwardRef(function CommentInput({ height, onChange, placeholder, defaultValue, setInputIsFocused, value }: Props, ref) {
  const handleChangeInput = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange(value)
  }, [ onChange ])

  const handleFocus = React.useCallback(() => {
    if (setInputIsFocused) {
      setInputIsFocused(true)
    } else return
  }, [ setInputIsFocused ])

  return (
    <div>
      <Field>
        <TextArea onChange={handleChangeInput} ref={ref} value={value} placeholder={placeholder} defaultValue={defaultValue} onFocus={handleFocus} autoSize={true}
                  style={{ display: 'block', height: `${height}px` }} />
      </Field>
    </div>
  )
})

export default CommentInput