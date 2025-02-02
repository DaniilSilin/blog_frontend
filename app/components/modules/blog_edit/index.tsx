import React, {ChangeEvent} from 'react'
import NextImage from 'next/image'
import DjangoService from "@/app/store/services/DjangoService"

import styles from './blog_edit.module.css'
import AvatarCrop from "@/app/components/modules/blog_edit/AvatarCrop"
import BannerCrop from "@/app/components/modules/blog_edit/BannerCrop"

const BASE_URL = 'http://localhost:8000/'

const MIN_AVATAR_SIZE_IN_MB = 33554432
const MIN_BANNER_SIZE_IN_MB = 50331648
const MIN_DIMENSION_AVATAR = 100
const MIN_HEIGHT_BANNER = 576
const MIN_WIDTH_BANNER = 1024



export default function BlogEdit({ slug }) {
  const avatarRef = React.useRef(null)
  const bannerRef = React.useRef(null)
  const uploadErrorRef = React.useRef(null)

  const [ originalBannerSource, setOriginalBannerSource ] = React.useState<File>()
  const [ originalBannerSourceUrl, setOriginalBannerSourceUrl ] = React.useState<string>('')

  const [ originalAvatarSource, setOriginalAvatarSource ] = React.useState<File>()
  const [ originalAvatarSourceUrl, setOriginalAvatarSourceUrl ] = React.useState<string>('')

  const [ deleteBlog ] = DjangoService.useDeleteBlogMutation()
  const [ updateBlog ] = DjangoService.useUpdateBlogMutation()
  const [ originalImageSource, setOriginalImageSource ] = React.useState<any>()
  const [ originalImageSourceUrl, setOriginalImageSourceUrl ] = React.useState<string>("")

  const { data } = DjangoService.useGetBlogQuery({ slug })
  const [ displayAvatarCropModal, setDisplayAvatarCropModal ] = React.useState(false)

  const [ vkLink, setVkLink ] = React.useState('')
  const [ dzen, setDzenLink ] = React.useState('')
  const [ youtube, setYoutubeLink ] = React.useState('')

  const [ title, setTitle ] = React.useState<string>('')
  const [ description, setDescription ] = React.useState<string>('')
  const [ phoneNumber, setPhoneNumber ] = React.useState<string>('')
  const [ email, setEmail ] = React.useState<string>('')
  const [ avatar, setAvatar ] = React.useState<any>(null)
  const [ avatarSmall, setAvatarSmall ] = React.useState<any>(null)

  const [ displayLinks, setDisplayLinks ] = React.useState(false)
  const [ isModalOpen, setIsModalOpen ] = React.useState<boolean>(false)

  const [ sourceImage, setSourceImage ] = React.useState('')

  const [ imageErrorMessage, setImageErrorMessage ] = React.useState('')

  const onSelectBannerImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const fileSize = file?.size
    if (fileSize >= MIN_BANNER_SIZE_IN_MB) {
      setImageErrorMessage('Максимальный размер изображения - 6 Мб.')
    }
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      // @ts-ignore
      const imageElement = new Image()
      const imageUrl = reader.result?.toString() || ''
      imageElement.src = imageUrl

      imageElement.addEventListener("load", (e) => {
        const width = e.currentTarget.width
        const height = e.currentTarget.height
        if (width < MIN_DIMENSION_AVATAR || MIN_DIMENSION_AVATAR > height) {
          setImageErrorMessage('Минимальный размер изображения – 1024 x 576 пикс.')
          setOriginalBannerSource(undefined)
          setOriginalBannerSourceUrl('')
        }
      })
      setOriginalBannerSource(file)
      setOriginalBannerSourceUrl(imageUrl)
    })
    reader.readAsDataURL(file)
  }

  const onSelectAvatar = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const fileSize = file?.size
    if (fileSize >= 33554432 ) {
      setImageErrorMessage('Файл не может превышать размер 4 Мб!')
    }
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      const imageElement = new Image()
      const imageUrl = reader.result?.toString() || ''
      imageElement.src = imageUrl

      imageElement.addEventListener("load", (e) => {
        const width = e.currentTarget.width
        const height = e.currentTarget.height
        if (width < MIN_WIDTH_BANNER || MIN_HEIGHT_BANNER > height) {
          setImageErrorMessage('Минимальный размер изображения – 1024 x 576 пикс.')
          setOriginalAvatarSource(undefined)
          setOriginalAvatarSourceUrl('')
        }
      })
      setImageErrorMessage('Файл не может превышать размер 4 Мб!')

      setOriginalAvatarSource(file)
      setOriginalAvatarSourceUrl(imageUrl)
    })
    reader.readAsDataURL(file)
  }, [ setOriginalAvatarSource, setOriginalAvatarSourceUrl ])

  const handleDisplayModal = (e: any) => {
    let elem = e.target
    if (elem.className === 'modal_3') {
      elem.style.display = 'none'
      setImageErrorMessage('')
    }
  }

  React.useEffect(() => {
    if (imageErrorMessage) {
      console.log(123)
      uploadErrorRef.current.style.display = 'block'
    }
    if (originalAvatarSource && originalAvatarSourceUrl) {
      avatarRef.current.style.display = 'block'
    }
  }, [ originalAvatarSource, originalAvatarSourceUrl, imageErrorMessage ])

  if (!data) {
    return <div>Загрузка</div>
  }

  return (
    <div>
      <div className={styles.tabTitle}>Настройки</div>
      <div className={styles.bannerContainer}>
        <div className={styles.bannerContainerTitle}>Баннер</div>
        <div className={styles.bannerContainerDescription}>Это изображение показывается в верхней части страницы канала.</div>
        <div style={{ display: 'flex', marginTop: '8px' }}>
          <div style={{ width: '290px', height: '160px', backgroundColor: '#1f1f1f', alignItems: 'center', borderRadius: '15px', display: 'flex', justifyContent: 'center' }}>
            <NextImage src={`${BASE_URL}${data?.banner}`} style={{ border: '2px solid white' }} width={175} height={100} alt={''} />
          </div>
          <div className={styles.avatarUploadContainer}>
            <div className={styles.bannerGuide}>Чтобы канал выглядел привлекательно на всех устройствах, советуем загрузить изображение размером не менее 2048 x 1152 пикс.
              Размер файла – не более 6 МБ.
            </div>
            <div className={styles.bannerActionsContainer}>
              <div className={styles.bannerUploadButton}>
                <label>
                  Изменить
                  <input type={'file'} accept='image/png,image/jpeg,image/gif' onChange={onSelectBannerImage}/>
                </label>
              </div>
              <div className={styles.bannerDeleteButton}>
                <div>Удалить</div>
              </div>
              <div onClick={handleDisplayModal} ref={avatarRef} className="modal_3">
                <div className="modalContent_3">
                  <BannerCrop />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarContainerTitle}>Фото профиля</div>
          <div className={styles.bannerContainerDescription}>Фото профиля показывается, например, рядом с вашими видео или комментариями на сайте.</div>
        <div style={{display: 'flex', marginTop: '8px'}}>
          <div style={{ width: '290px', height: '160px', backgroundColor: '#1f1f1f', alignItems: 'center', borderRadius: '15px', display: 'flex', justifyContent: 'center' }}>
            <NextImage src={`${BASE_URL}${data?.avatar_small}`} style={{ borderRadius: '50%', border: '2px solid white' }} width={140} height={140} alt={''}/>
          </div>
          <div className={styles.avatarUploadContainer}>
            <div className={styles.avatarGuide}>Рекомендуем использовать изображение размером не менее 98 х 98 пикселей в формате PNG или GIF.
              Анимированные картинки загружать нельзя. Размер файла – не более 4 МБ. Помните, что изображение должно соответствовать правилам сообщества YouTube.
            </div>
            <div className={styles.avatarActionsContainer}>
              <div className={styles.avatarUploadButton}>
                <label>
                  Изменить
                  <input type={'file'} accept='image/png,image/jpeg,image/gif' onChange={onSelectAvatar} />
                </label>
              </div>
              <div className={styles.avatarDeleteButton}>
                <div>Удалить</div>
              </div>
              <div onClick={handleDisplayModal} ref={avatarRef} className="modal_3">
                <div className="modalContent_3">
                  <AvatarCrop originalImageSourceUrl={originalImageSourceUrl} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={uploadErrorRef} onClick={handleDisplayModal} className="modal_3">
        <div className={styles.modalContentError}>
          <div style={{ padding: '7px 8px 5px', fontWeight: '500', fontSize: '20px', lineHeight: '28px' }}>
            Ошибка
          </div>
          <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
            <div>
              {imageErrorMessage}
            </div>
          </div>
          <div>
            <div>
              Отмена
            </div>
            <div>
              Повторить
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}