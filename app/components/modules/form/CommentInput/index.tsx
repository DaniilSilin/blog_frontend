import React, { ChangeEvent } from 'react'
import { Flex, Input } from 'antd/lib'

const { TextArea } = Input;
import Field from '../Field'

export interface Props {
  height: number
  onChange: (value: string) => void
  placeholder?: string
  defaultValue?: string
  setFocusOnInput?: any
  value: string
}

const CommentInput = React.forwardRef(function CommentInput({ height, onChange, placeholder, defaultValue, setFocusOnInput, value }: Props, ref) {
  const handleChangeInput = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange(value)
  }, [ onChange ])

  const handleFocus = React.useCallback(() => {
    setFocusOnInput(true)
  }, [ setFocusOnInput ])

  return (
    <div>
      <TextArea onChange={handleChangeInput} ref={ref} value={value} placeholder={placeholder} defaultValue={defaultValue} onFocus={handleFocus} autoSize={true}
                  style={{ display: 'block', height: `${height}px` }} />
    </div>
  )
})

export default CommentInput