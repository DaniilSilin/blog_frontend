import React, { ChangeEvent } from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import NextImage from 'next/image'
import styles from './blog_edit.module.css'
import AvatarCrop from "@/app/components/modules/blog_edit/AvatarCrop"
import BannerCrop from "@/app/components/modules/blog_edit/BannerCrop"
import TextArea from "@/app/components/modules/form/Textarea"
import { UpdateInput } from "@/app/components/modules/form"
import { emailValidator, titleValidator } from "@/app/components/modules/form/validators"
import BlogSocialMediaLinks from "@/app/components/modules/blog_edit/BlogSocialMediaLinks"

const BASE_URL = 'http://127.0.0.1:8000/'
const AVATAR_SMALL_PATH = '/img/default/avatar_default.jpg'
const BANNER_SMALL_PATH = '/img/default/banner.jpg'

const MIN_AVATAR_SIZE_IN_MB = 33554432
const MIN_BANNER_SIZE_IN_MB = 50331648
const MIN_DIMENSION_AVATAR = 100
const MIN_HEIGHT_BANNER = 576
const MIN_WIDTH_BANNER = 1024

const titleDescription = 'Придумайте название канала, которое будет представлять вас и ваш контент. Если вы укажете другое название или ' +
    'поменяете фото профиля, эти изменения будут видны только на YouTube, а не во всех сервисах Google. Изменить имя можно дважды в течение 14 дней. '
const slugDescription = 'Ваше уникальный URL блога. Менять уникальный URL нельзя.'
const descriptionDescription = 'Придумайте описание для вашего блога.'

const titleLabel = 'Название блога'
const descriptionLabel = 'Описание блога'

export default function BlogEdit({ slug }) {
  const avatarRef = React.useRef(null)
  const bannerRef = React.useRef(null)
  const uploadErrorRef = React.useRef(null)

  const [ originalBannerSource, setOriginalBannerSource ] = React.useState<File>()
  const [ originalBannerSourceUrl, setOriginalBannerSourceUrl ] = React.useState<string>('')
  const [ croppedBanner, setCroppedBanner ] = React.useState()
  const [ croppedBannerUrl, setCroppedBannerUrl ] = React.useState('')
  const [ isBannerDeleted, setIsBannerDeleted ] = React.useState(false)
  const [ initialBanner, setInitialBanner ] = React.useState()

  const [ originalAvatarSource, setOriginalAvatarSource ] = React.useState<File>()
  const [ originalAvatarSourceUrl, setOriginalAvatarSourceUrl ] = React.useState<string>('')
  const [ croppedAvatar, setCroppedAvatar ] = React.useState()
  const [ croppedAvatarUrl, setCroppedAvatarUrl ] = React.useState('')
  const [ isAvatarDeleted, setIsAvatarDeleted ] = React.useState(false)
  const [ initialAvatar, setInitialAvatar ] = React.useState()

  const [ chosenFile, setChosenFile ] = React.useState<string>('')

  const [ email, setEmail ] = React.useState<string>('')
  const [ initialEmail, setInitialEmail ] = React.useState<string>('')
  const [ emailError, setEmailError ] = React.useState('')

  const [ phoneNumber, setPhoneNumber ] = React.useState<string>('')
  const [ initialPhoneNumber, setInitialPhoneNumber ] = React.useState<string>('')
  const [ phoneNumberError, setPhoneNumberError ] = React.useState<string>('')

  const [ title, setTitle ] = React.useState<string>('')
  const [ initialTitle, setInitialTitle ] = React.useState<string>('')
  const [ titleError, setTitleError ] = React.useState<string>('')

  const [ ownSite, setOwnSite ] = React.useState<string>('')
  const [ initialOwnSite, setInitialOwnSite ] = React.useState()
  const [ ownSiteError, setOwnSiteError ] = React.useState()

  const [ description, setDescription ] = React.useState<string>('')
  const [ initialDescription, setInitialDescription ] = React.useState<string>('')

  const [ deleteBlog ] = DjangoService.useDeleteBlogMutation()
  const [ updateBlog ] = DjangoService.useUpdateBlogMutation()

  const { data } = DjangoService.useGetBlogQuery({ slug })

  const [ vkLink, setVkLink ] = React.useState('')
  const [ initialVkLink, setInitialVkLink ] = React.useState('')
  const [ vkLinkError, setVkLinkError ] = React.useState('')

  const [ dzenLink, setDzenLink ] = React.useState('')
  const [ initialDzenLink, setInitialDzenLink ] = React.useState('')
  const [ dzenLinkError, setDzenLinkError ] = React.useState('')

  const [ youtubeLink, setYoutubeLink ] = React.useState('')
  const [ initialYoutubeLink, setInitialYoutubeLink ] = React.useState('')
  const [ youtubeLinkError, setYoutubeLinkError ] = React.useState('')

  const [ telegramLink, setTelegramLink ] = React.useState('')
  const [ initialTelegramLink, setInitialTelegramLink ] = React.useState('')
  const [ telegramLinkError, setTelegramLinkError ] = React.useState('')

  const [ displaySocialMediaLinks, setDisplaySocialMediaLinks ] = React.useState(false)

  React.useEffect(() => {
    // setInitialEmail(data?.email)
    // setInitialPhoneNumber(data?.email)
    setInitialTitle(data?.title)
    // setInitialDescription(data?.description)
    setInitialAvatar(data?.avatar_small)
    setInitialBanner(data?.banner_small)
  }, [ data ])

  const setToDefault = React.useCallback(() => {
    setCroppedAvatar(undefined)
    setCroppedAvatarUrl('')
    setCroppedBanner(undefined)
    setCroppedBannerUrl('')
    setIsBannerDeleted(false)
    setIsAvatarDeleted(false)
    setEmail(initialEmail)
    setPhoneNumber(initialPhoneNumber)
    setTitle(initialTitle)
    setDescription(initialDescription)
  }, [ initialEmail, initialPhoneNumber, initialTitle, initialDescription, setIsBannerDeleted, setIsAvatarDeleted, setCroppedAvatar,
    setCroppedAvatarUrl, setCroppedBanner, setCroppedBannerUrl, setEmail, setPhoneNumber, setTitle, setDescription ])

  const [ imageErrorMessage, setImageErrorMessage ] = React.useState('')

  const formValidator = React.useCallback(() => {
    let isValid = false

    if (emailValidator(email)) {
      setEmailError(emailValidator(email))
      isValid = false
    } else {
      setEmailError('')
      isValid = true
    }

    if (titleValidator(title)) {
      setTitleError(titleValidator(title))
      isValid = false
    } else {
      setTitleError('')
      isValid = true
    }

    return isValid
  }, [ email, title, setTitleError, setEmailError ])


  React.useEffect(() => {
    formValidator()
  }, [ title ])

  const bannerState = React.useMemo(() => {
    const defaultImage = '/img/default/banner.jpg'
    if (!initialBanner && !(croppedBannerUrl && croppedBanner)) {
      return defaultImage
    }
    if (isBannerDeleted) {
      return defaultImage
    } else {
      if (croppedBannerUrl && croppedBanner) {
        return croppedBannerUrl
      } else {
        return `${BASE_URL}${initialBanner}`
      }
    }
  }, [ isBannerDeleted, croppedBannerUrl, croppedBanner, data, initialBanner ])

  const avatarState = React.useMemo(() => {
    const defaultImage = '/img/default/avatar_default.jpg'
    if (!initialAvatar && !(croppedAvatarUrl && croppedAvatar)) {
      return defaultImage
    }
    if (isAvatarDeleted) {
      return defaultImage
    } else {
      if (croppedAvatarUrl && croppedAvatar) {
        return croppedAvatarUrl
      } else {
        return `${BASE_URL}${initialAvatar}`
      }
    }
  }, [ isAvatarDeleted, croppedAvatarUrl, croppedAvatar, data, initialAvatar ])

  const deleteBanner = React.useCallback(() => {
    setIsBannerDeleted(true)
    setCroppedBannerUrl('')
    setCroppedBanner(undefined)
  }, [ setCroppedBannerUrl, setCroppedBanner, setIsBannerDeleted ])

   const deleteAvatar = React.useCallback(() => {
    setIsAvatarDeleted(true)
    setCroppedAvatarUrl('')
    setCroppedAvatar(undefined)
  }, [ setCroppedAvatarUrl, setCroppedAvatar, setIsAvatarDeleted ])

  const onSelectBannerImage = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setImageErrorMessage('')
    const file = e.target.files?.[0]
    if (!file) return

    const fileSize = file?.size
    if (fileSize >= MIN_BANNER_SIZE_IN_MB) {
      setImageErrorMessage('Максимальный размер изображения - 6 Мб.')
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
          setChosenFile('banner')
          setImageErrorMessage('Минимальный размер изображения – 1024 x 576 пикс.')
          setOriginalBannerSource(undefined)
          setOriginalBannerSourceUrl('')
        } else {
          setOriginalBannerSource(file)
          setOriginalBannerSourceUrl(imageUrl)
        }
      })
    })
    reader.readAsDataURL(file)
  }, [ setOriginalBannerSource, setOriginalBannerSourceUrl, setImageErrorMessage, setChosenFile ])

  const onSelectAvatar = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setImageErrorMessage('')
    const file = e.target.files?.[0]
    if (!file) return

    const fileSize = file?.size
    if (fileSize >= MIN_AVATAR_SIZE_IN_MB) {
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
        if (width < MIN_DIMENSION_AVATAR || MIN_DIMENSION_AVATAR > height) {
          setChosenFile('avatar')
          setImageErrorMessage('Минимальный размер изображения – 99 x 99 пикс.')
          setOriginalAvatarSource(undefined)
          setOriginalAvatarSourceUrl('')
        } else {
          setOriginalAvatarSource(file)
          setOriginalAvatarSourceUrl(imageUrl)
        }
      })
    })
    reader.readAsDataURL(file)
  }, [ setOriginalAvatarSource, setOriginalAvatarSourceUrl, setChosenFile, setImageErrorMessage ])

  const handleDisplayModal = (e: any) => {
    let elem = e.target
    if (elem.className === 'modal_3' || elem.className === 'cancel') {
      if (elem.className === 'cancel') {
        elem = elem.parentNode.parentNode.parentNode
      }
      elem.style.display = 'none'
      setImageErrorMessage('')
    }
  }

  React.useEffect(() => {
    if (imageErrorMessage) {
      uploadErrorRef.current.style.display = 'block'
    }
  }, [ imageErrorMessage ])

  React.useEffect(() => {
    if (originalAvatarSource && originalAvatarSourceUrl) {
      uploadErrorRef.current.style.display = 'none'
      avatarRef.current.style.display = 'block'
    }
  }, [ originalAvatarSource, originalAvatarSourceUrl ])

  React.useEffect(() => {
      if (originalBannerSource && originalBannerSourceUrl) {
        uploadErrorRef.current.style.display = 'none'
        bannerRef.current.style.display = 'block'
      }
  }, [ originalBannerSource, originalBannerSourceUrl ])

  if (!data) {
    return <div>Загрузка</div>
  }

  const updateBlogData = () => {
    const formData = new FormData()
    formData.append('avatar', originalAvatarSource)
    formData.append('avatar_small', croppedAvatar)
    formData.append('banner', originalBannerSource)
    formData.append('banner_small', croppedBanner)
    updateBlog({ formData, slug })
  }

  return (
    <div>
      <div className={styles.tabTitle}>Настройки</div>
      <div className={styles.bannerContainer}>
        <div className={styles.bannerContainerTitle}>Баннер</div>
        <div className={styles.bannerContainerDescription}>Это изображение показывается в верхней части страницы канала.</div>
        <div style={{ display: 'flex', marginTop: '8px' }}>
          <div style={{ width: '290px', height: '160px', backgroundColor: '#1f1f1f', alignItems: 'center', borderRadius: '15px', display: 'flex', justifyContent: 'center' }}>
            <NextImage src={bannerState} style={{ border: '2px solid white' }} width={175} height={100} alt={''} />
          </div>
          <div className={styles.avatarUploadContainer}>
            <div className={styles.bannerGuide}>Чтобы канал выглядел привлекательно на всех устройствах, советуем загрузить изображение размером не менее 2048 x 1152 пикс.
              Размер файла – не более 6 МБ.
            </div>
            <div className={styles.bannerActionsContainer}>
              {(bannerState === BANNER_SMALL_PATH || isBannerDeleted.toString() === 'true') ? (
                <div className={styles.bannerUploadButton}>
                  <label>
                    Загрузить
                    <input type={'file'} accept='image/png,image/jpeg,image/gif' onChange={onSelectBannerImage}/>
                  </label>
                </div>
              ) : (
              <>
                <div className={styles.bannerUploadButton}>
                  <label>
                    Изменить
                    <input type={'file'} accept='image/png,image/jpeg,image/gif' onChange={onSelectBannerImage}/>
                  </label>
                </div>
                <div className={styles.bannerDeleteButton}>
                  <div onClick={deleteBanner}>Удалить</div>
                </div>
              </>
            )}
            <div onClick={handleDisplayModal} ref={bannerRef} className="modal_3">
              <div className="modalContent_3">
                <BannerCrop originalBannerSourceUrl={originalBannerSourceUrl} setOriginalBannerSource={setOriginalBannerSource} setOriginalBannerSourceUrl={setOriginalBannerSourceUrl}
                            setCroppedBanner={setCroppedBanner} setCroppedBannerUrl={setCroppedBannerUrl} setIsBannerDeleted={setIsBannerDeleted} ref={bannerRef}
                />
              </div>
            </div>
            </div>
          </div>
        </div>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarContainerTitle}>Фото профиля</div>
          <div className={styles.bannerContainerDescription}>Фото профиля показывается, например, рядом с вашими видео или комментариями на сайте.</div>
        <div style={{ display: 'flex', marginTop: '8px' }}>
          <div className={styles.avatarBackground}>
            <NextImage src={avatarState} className={styles.avatarImage} width={140} height={140} alt={''} />
          </div>
          <div className={styles.avatarUploadContainer}>
            <div className={styles.avatarGuide}>Рекомендуем использовать изображение размером не менее 98 х 98 пикселей в формате PNG или GIF.
              Анимированные картинки загружать нельзя. Размер файла – не более 4 МБ.
            </div>
            <div className={styles.avatarActionsContainer}>
              {(avatarState === AVATAR_SMALL_PATH || isAvatarDeleted.toString() === 'true') ? (
                <div className={styles.avatarUploadButton}>
                  <label>
                    Загрузить
                    <input type={'file'} accept='image/png,image/jpeg,image/gif' onChange={onSelectAvatar} />
                  </label>
                </div>
              ) : (
              <>
                <div className={styles.avatarUploadButton}>
                  <label>
                    Изменить
                    <input type={'file'} accept='image/png,image/jpeg,image/gif' onChange={onSelectAvatar} />
                  </label>
                </div>
                <div className={styles.avatarDeleteButton}>
                  <div onClick={deleteAvatar}>Удалить</div>
                </div>
              </>
            )}
            <div onClick={handleDisplayModal} ref={avatarRef} className="modal_3">
                <div className="modalContent_3">
                  <AvatarCrop originalAvatarSource={originalAvatarSource} originalAvatarSourceUrl={originalAvatarSourceUrl} setOriginalAvatarSource={setOriginalAvatarSource}
                              setOriginalAvatarSourceUrl={setOriginalAvatarSourceUrl} croppedAvatar={croppedAvatar} setCroppedAvatar={setCroppedAvatar}
                    croppedAvatarUrl={croppedAvatarUrl} setCroppedAvatarUrl={setCroppedAvatarUrl} setIsAvatarDeleted={setIsAvatarDeleted} ref={avatarRef}
                  />
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
            <div className={'cancel'}>
              Отмена
            </div>
              <div>
                <label>
                  Повторить
                  {chosenFile === 'banner' && (
                    <input type={'file'} accept='image/png,image/jpeg,image/gif' style={{ display: 'none' }} onChange={onSelectBannerImage} />
                  )}
                  {chosenFile === 'avatar' && (
                    <input type={'file'} accept='image/png,image/jpeg,image/gif' style={{ display: 'none' }} onChange={onSelectAvatar} />
                  )}
                </label>
              </div>
          </div>
        </div>
      </div>
      </div>
      <div className={styles.otherFields}>
        <div>
          <UpdateInput width={400} height={40} defaultValue={data?.title} label={titleLabel} onChange={setTitle} error={titleError} description={titleDescription} />
          <UpdateInput width={400} height={40} defaultValue={data?.slug} label={'Псевдоним'} description={slugDescription} disabled={true} />
      {/*    <TextArea width={400} height={100} onChange={setDescription} label={descriptionLabel} autoSize={false} showCount={true} value={description} maxLength={300} />*/}
        </div>
      {/*  <div>*/}
      {/*    <div style={{fontSize: '15px', lineHeight: '25px'}}>Ссылки</div>*/}
      {/*    <div style={{fontSize: '13px', lineHeight: '20px', color: '#929292'}}>Поделитесь внешними ссылками с аудиторией. Они будут видны в профиле канала и на вкладке "О канале".</div>*/}
      {/*    <div onClick={() => setDisplaySocialMediaLinks(!displaySocialMediaLinks)}>Показать ссылки</div>*/}
      {/*    {displaySocialMediaLinks && (*/}
      {/*      <BlogSocialMediaLinks vkLink={vkLink} setVkLink={setVkLink} telegramLink={telegramLink} setTelegramLink={setTelegramLink}*/}
      {/*                            youtubeLink={youtubeLink} setYoutubeLink={setYoutubeLink} dzenLink={dzenLink} setDzenLink={setDzenLink}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <div style={{fontSize: '15px', lineHeight: '25px'}}>Контактная информация</div>*/}
      {/*    <div style={{fontSize: '13px', lineHeight: '20px', color: '#929292'}}>Укажите, как связаться с вами по*/}
      {/*      вопросам сотрудничества. Зрители могут увидеть адрес электронной почты на вкладке "О канале". </div>*/}
      {/*    <UpdateInput width={400} height={40} onChange={setEmail} error={emailError} label={'Адрес электронной почты'} description={'123123'} />*/}
      {/*    <UpdateInput width={400} height={40} onChange={setOwnSite} error={ownSiteError} label={'Ссылка на Ваш веб-ресурс'} description={'123123'} />*/}
      {/*  </div>*/}
      </div>
      <div onClick={setToDefault}>Отмена</div>
      <button onClick={updateBlogData}>
        Сохранить
      </button>
    </div>
  )
}