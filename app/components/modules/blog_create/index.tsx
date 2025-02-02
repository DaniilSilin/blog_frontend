import React from 'react'
import { useRouter } from 'next/router'

import DjangoService from "@/app/store/services/DjangoService"
import AvatarModal from "@/app/components/modules/avatar_modal"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons/lib'
import { Flex, message, Upload } from 'antd/lib'
import type { GetProp, UploadProps } from 'antd/lib'
import { slugValidator, titleValidator } from '../../modules/form/validators'
import { BlogSlugInput, PostDataInput, PostDataTextArea } from '../../../components/modules/form'

const titleLabel = 'Название канала'
const slugLabel = 'Ссылка на сайт'
const descriptionLabel = 'Описание'

export default function BlogCreate() {
  const router = useRouter()
  const divRef = React.useRef(null)

  const [ title, setTitle ] = React.useState<string>('')
  const [ slug, setSlug ] = React.useState<string>('')
  const [ description, setDescription ] = React.useState<string>('')

  const [ createBlog, { data, isLoading, isSuccess }] = DjangoService.useCreateBlogMutation()
  const [ triggerQuery, { data: blog_slug }] = DjangoService.useLazyGetBlogSlugQuery()

  const [ imageSource, setImageSource ] = React.useState<any>()
  const [ imageSourceUrl, setImageSourceUrl ] = React.useState('')
  const [ croppedImage, setCroppedImage ] = React.useState<any>()
  const [ croppedImageUrl, setCroppedImageUrl ] = React.useState()

  const [ titleError, setTitleError ] = React.useState<string>("")
  const [ slugError, setSlugError ] = React.useState<string>("")

  React.useEffect(() => {
    if (imageSource) {
      divRef.current.style.display = 'block'
    } else {
      divRef.current.style.display = 'none'
    }
  }, [ imageSource ])

  const showModal = React.useCallback((e: any) => {
    let elem = e.target
    if (imageSource) {
      if (elem.className === "modal_4" || elem.className === "close_3") {
        if (elem.className === "close_3") {
          elem = elem.parentNode.parentNode
        }
        elem.style.display = "none"
        setImageSource('')
      }
    } else {

    }
  }, [ setImageSource, imageSource ])


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () =>
      callback(reader.result as string)
  )
  reader.readAsDataURL(img)
};

const beforeUpload = (file: FileType) => {
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Изображение должно быть менее 2 Мб!')
  }
  return isLt2M
}
  const [loading, setLoading] = React.useState(false)

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setImageSource(info.file)
      getBase64(info.file.originFileObj as FileType, (url) => {
        setImageSourceUrl(url)
        setLoading(false)
      })
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </button>
  )

  const formValidation = React.useCallback(() => {
    let isValid = false

    if (titleValidator(title)) {
      setTitleError(titleValidator(title))
      isValid = false
    } else {
      setTitleError('')
      isValid = true
    }

    if (slugValidator(slug)) {
      setSlugError(slugValidator(slug))
      isValid = false
    } else {
      setSlugError('')
      isValid = true
    }
    if (blog_slug === 'Адрес свободен') {
      isValid = true
    }
    if (blog_slug === 'Этот адрес уже занят') {
      isValid = false
    }

    return isValid
  }, [ title, slug, setSlugError, setTitleError ])

  React.useEffect(() => {
    formValidation()
  }, [ title, slug ])


  const request = () => {
    let isValid = formValidation()
    console.log(isValid)
    if (isValid) {
      const formData = new FormData()
      formData.append('avatar_small', croppedImage)
      formData.append('avatar', imageSource)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('slug', slug)
      createBlog({ formData })
    }
  }

  if (isSuccess) {
    router.push({
      pathname: `/blog/${data}/`,
    })
  }

  React.useEffect(() => {
    if (slug && !slugError) {
      triggerQuery({ slug })
    }
  }, [ slug, slugError, triggerQuery ])

  return (
    <div>
      <Flex gap="middle" wrap>
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          accept='image/png,image/jpeg,image/gif,image/heic,image/heif,image/webp'
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          >
            {croppedImage ? <img src={croppedImageUrl} alt="avatar" style={{ width: '100%', borderRadius: '50%'}} /> : uploadButton}
        </Upload>
      </Flex>
        <div onClick={showModal} ref={divRef} className="modal_3">
          <div className="modalContent_3">
            <div className="close_3">x</div>
            <AvatarModal setImageSource={setImageSource} imageSourceUrl={imageSourceUrl} setImageSourceUrl={setImageSourceUrl} setCroppedImageUrl={setCroppedImageUrl}
            imageSource={imageSource} croppedImage={croppedImage} setCroppedImage={setCroppedImage}/>
          </div>
        </div>
      <PostDataInput width={600} height={40} label={titleLabel} onChange={setTitle} maxLength={100} error={titleError} />
      <BlogSlugInput width={600} height={40} label={slugLabel} onChange={setSlug} maxLength={25} description={'Задайте уникальное значение'}
                     error={slugError} blog_slug={blog_slug} value={slug} />
      <PostDataTextArea width={600} height={120} label={descriptionLabel} onChange={setDescription} maxLength={200} autoSize={true} showCount={true} />
      <input type={'submit'} value={'Создать'} onClick={request}/>
    </div>
  )
}