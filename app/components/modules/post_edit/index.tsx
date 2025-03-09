import React, {ChangeEvent} from 'react'
import DjangoService from '@/app/store/services/DjangoService'
import classNames from 'classnames'

import { bodyValidator, mapValidator, titleValidator } from '@/app/components/modules/form/validators'
import { UpdateInput } from "@/app/components/modules/form"

import UpdateTextArea from '@/app/components/modules/form/UpdateTextArea'

import styles from './post_edit.module.css'

export default function PostEdit({ slug, post_id }) {
  const { data: post } = DjangoService.useGetPostQuery({ slug: slug, post_id: post_id })
  const [ updatePost ] = DjangoService.useUpdatePostMutation()
  const [ hasPostChanged, setHasPostChanged ] = React.useState(true)
  const [ isReadyToSubmit, setIsReadyToSubmit ] = React.useState(false)

  const [ titleInitial, setTitleInitial ] = React.useState<string | undefined>(post?.title)
  const [ bodyInitial, setBodyInitial ] = React.useState<string | undefined>(post?.body)
  const [ mapInitial, setMapInitial ] = React.useState<string | undefined>(post?.map)
  const [ isPublishedInitial, setIsPublishedInitial ] = React.useState<boolean>(post?.is_published)

  const [ title, setTitle ] = React.useState<string | undefined>(titleInitial)
  const [ body, setBody ] = React.useState<string | undefined>(bodyInitial)
  const [ map, setMap ] = React.useState<string | undefined>(mapInitial)
  const [ isPublished, setIsPublished ] = React.useState<boolean>(isPublishedInitial)

  const [ titleError, setTitleError ] = React.useState()
  const [ bodyError, setBodyError ] = React.useState()
  const [ mapError, setMapError ] = React.useState()

  React.useEffect(() => {
    setTitleInitial(post?.title)
    setBodyInitial(post?.body)
    setMapInitial(post?.map)
    setIsPublishedInitial(post?.is_published)
  }, [ post ])

  const setToDefaultHandleChange = React.useCallback(() => {
    setTitle(titleInitial)
    setBody(bodyInitial)
    setMap(mapInitial)
    setIsPublished(isPublishedInitial)
  }, [ setTitle, setBody, setMap, setIsPublished, bodyInitial, titleInitial, mapInitial, isPublishedInitial ])

  React.useEffect(() => {
    if (title === titleInitial && body === bodyInitial && map === mapInitial && isPublished === isPublishedInitial) {
      setHasPostChanged(true)
    } else {
      setHasPostChanged(false)
    }
  }, [ title, body, map, setHasPostChanged, titleInitial, bodyInitial, mapInitial, isPublished, isPublishedInitial ])

  const formValidator = React.useCallback(() => {
    let isValid = false

    if (titleValidator(title)) {
      setTitleError(titleValidator(title))
      isValid = false
    } else {
      setTitleError('')
      isValid = true
    }

    if (bodyValidator(body)) {
      setBodyError(bodyValidator(body))
      isValid = false
    } else {
      setBodyError('')
      isValid = true
    }

    if (mapValidator(map)) {
      setMapError(mapValidator(map))
      isValid = false
    } else {
      setMapError('')
      isValid = true
    }

    return isValid
  }, [ setBodyError, setTitleError, setMapError, title, body, map ])

  React.useEffect(() => {
    formValidator()
    const isValid = formValidator()
    if (!hasPostChanged && isValid) {
      setIsReadyToSubmit(true)
    } else {
      setIsReadyToSubmit(false)
    }
  }, [ title, body, setIsReadyToSubmit, hasPostChanged, formValidator ])

  const inputHandleChange = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsPublished(true)
    } else {
      setIsPublished(false)
    }
  }, [ setIsPublished ])

  const postUpdateRequest = () => {
    const validator = formValidator()
    if (validator) {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('body', body)
      formData.append('map', map)
      formData.append('is_published', isPublished)
      updatePost({ slug: slug, post_id: post_id, formData })
    }
  }

  return (
    <div>
      <UpdateInput width={800} height={40} label={'Название публикации'} defaultValue={titleInitial} error={titleError} value={title} onChange={setTitle} />
      <UpdateTextArea width={800} height={40} label={'Тело публикации'} defaultValue={bodyInitial} error={bodyError} value={body} onChange={setBody} autoSize={true} showCount={true} />
      <UpdateTextArea width={800} height={40} label={'Карта'} defaultValue={mapInitial} error={mapError} value={map} onChange={setMap} autoSize={true} showCount={true} />
      <div>
        Опубликовать
        <input type={'checkbox'} defaultChecked={isPublishedInitial} checked={isPublished} onChange={inputHandleChange} />
      </div>
      <div className={styles.actionButtonsContainer}>
        <button onClick={setToDefaultHandleChange} className={classNames(styles.cancelButton, {[styles.active]: !hasPostChanged })} disabled={hasPostChanged}>
          Отмена
        </button>
        <button className={classNames(styles.cancelButton, {[styles.active]: isReadyToSubmit })} disabled={!isReadyToSubmit} onClick={postUpdateRequest}>
          Сохранить
        </button>
      </div>
    </div>
  )
}