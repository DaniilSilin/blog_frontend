import React, { ChangeEvent } from 'react'
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
  const [ isPublished, setIsPublished ] = React.useState<any>(false)
  const [ tags, setTags] = React.useState([])
  const [ images, setImages ] = React.useState([])

  const [ createPost ] = DjangoService.useCreatePostMutation()

  const { token } = theme.useToken();
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

  const requestImages = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    setImages(e.target.files)
  }

    const sendData = () => {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('body', body)
      formData.append('is_published', isPublished)
      formData.append('tags', tags.join(' '))
      // formData.append('images', images)
      // for(let i=0; i < images.length; i++) {
      //   formData.append(`images${i}`, images[i])
      // }
      for (let image of images) {
          formData.append('images', image)
      }
      formData.append('blog', slug)
      console.log(images)
      createPost({ formData, slug })
      // createPost({ title, body, is_published: isPublished, blog: slug, tags: tags.join(' ') })
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
            <input style={{ display: 'block', marginTop: '8px' }} type='file' multiple accept='image/*' onChange={requestImages} />
          {images && (

            <section>
                {/*{images?.map((image) => (*/}
                {/*  <img src={image} />*/}
                {/*))}*/}
                File details:
              {/*<ul>*/}
              {/*  <li>Name: {images[0].name}</li>*/}
              {/*  <li>Type: {images[0].type}</li>*/}
              {/*  <li>Size: {images[0].size} bytes</li>*/}
              {/*  <img src={URL.createObjectURL(images[0])} height={250} width={250}  />*/}
              {/*  <img src={URL.createObjectURL(images[1])} height={250} width={250}  />*/}
              {/*  <img src={URL.createObjectURL(images[2])} height={250} width={250}  />*/}
              {/*</ul>*/}
            </section>
          )}
            <input type={"submit"} style={{ display: 'block', marginTop: '10px' }} onClick={sendData} value={'Создать пост'} />
        </div>
    )
}