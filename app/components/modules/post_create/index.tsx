import React from 'react'
import __Input from "@/app/components/modules/form/Input"
import DjangoService from "@/app/store/services/DjangoService"
import { useRouter } from "next/router"
import { PlusOutlined } from '@ant-design/icons/lib'
import type { InputRef } from 'antd/lib'
import { Input, Tag, theme } from 'antd/lib'
import TweenOne from 'rc-tween-one/lib/TweenOne'

export default function PostCreate({ slug }) {
  const router = useRouter()
  const [ title, setTitle ] = React.useState<string>('')
  const [ body, setBody ] = React.useState<string>('')
  const [ isPublished, setIsPublished ] = React.useState<boolean>(false)

  const [ createPost ] = DjangoService.useCreatePostMutation()

  const { token } = theme.useToken();
  const [ tags, setTags] = React.useState([])
  const [ inputVisible, setInputVisible ] = React.useState(false)
  const [ inputValue, setInputValue ] = React.useState('')
  const inputRef = React.useRef<InputRef>(null)

  React.useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible])

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  }

  const showInput = () => {
    setInputVisible(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, `#${inputValue}`])
    }
    setInputVisible(false)
    setInputValue('')
  };

    const handleClickIsPublished = React.useCallback(() => {
        setIsPublished(!isPublished)
    }, [ setIsPublished, isPublished ])

  const forMap = (tag: string) => (
    <span key={tag} style={{ display: 'inline-block' }}>
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    </span>
  );

  const tagChild = tags.map(forMap);

  const tagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  }

    const sendData = () => {
        createPost({ title, body, is_published: isPublished, blog: slug, tags: tags.join(' ') })
    }

    return (
        <div>
            <__Input width={200} height={50} onChange={setTitle} label={'Название поста'} />
            <__Input width={200} height={50} onChange={setBody} label={'Тело поста'} />
            <label style={{ display: 'flex' }}>
            <input type={"checkbox"} onClick={handleClickIsPublished}/>
              Публиковать
            </label>
            <>
              <div style={{ marginBottom: 16 }}>
                <TweenOne
                  appear={false}
                  enter={{ scale: 0.8, opacity: 0, type: 'from', duration: 100 }}
                  leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                  onEnd={(e) => {
                    if (e.type === 'appear' || e.type === 'enter') {
                      (e.target as any).style = 'display: inline-block';
                    }
                  }}
                >
                  {tagChild}
                </TweenOne>
              </div>
              {inputVisible ? (
                <Input
                  ref={inputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              ) : (
                <Tag onClick={showInput} style={tagPlusStyle}>
                  <PlusOutlined /> Новый тэг
                </Tag>
              )}
            </>
            <input type={"submit"} style={{ display: 'block', marginTop: '10px' }} onClick={sendData} value={'Создать пост'} />
        </div>
    )
}