import React from 'react'
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop, convertToPixelCrop } from 'react-image-crop'

import styles from './image_crop.module.css'
import ImageUpload from "@/app/components/modules/blog_edit/ImageUpload"
import ImagePreview from "@/app/components/modules/blog_edit/ImageUpload/ImageCrop/ImagePreview"

export interface Props {
  avatar: any
  setAvatar: (value: any) => null
  avatarSmall: any
  setAvatarSmall: (value: any) => null
}

const ASPECT_RATIO = 1
const MIN_DIMENSION = 150

export default function ImageCrop({ avatar, setAvatar, avatarSmall, setAvatarSmall }: Props) {
  const imgRef = React.useRef(null)
  const previewCanvasRef = React.useRef(null)
  const [ crop, setCrop ] = React.useState()
  const [ rotate, setRotate ] = React.useState(0)
  const [ nextModal, setNextModal ] = React.useState(false)
  const [ nextModalTwo, setNextModalTwo ] = React.useState(false)

  const onImageLoad = (e) => {
    const width = e.target.width
    const height = e.target.height
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100

    const crop = makeAspectCrop(
      {
          unit: '%',
          width: 50,
      },
      ASPECT_RATIO,
      width,
      height
    )
    const centeredCrop = centerCrop(crop, width, height)
    setCrop(centeredCrop)
  }

  const setCanvasPreview = (
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    crop: PixelCrop,
  ) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      throw new Error("No 2d context")
    }

    const pixelRatio = window.devicePixelRatio
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

    ctx.scale(pixelRatio, pixelRatio)
    ctx.imageSmoothingQuality = "high"
    ctx.save()

    const cropX = crop.x * scaleX
    const cropY = crop.y * scaleY

    ctx.translate(-cropX, -cropY)
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    )

    ctx.restore()
  }

  if (nextModal) {
    return (
      <ImageUpload avatar={avatar} setAvatar={setAvatar} avatarSmall={avatarSmall} setAvatarSmall={setAvatarSmall} />
    )
  }

  if (nextModalTwo) {
    return (
        <ImagePreview />
    )
  }

  return (
    <div>
      {avatarSmall && (
      <div>
          <ReactCrop
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
              crop={crop}
              keepSelection
              aspect={ASPECT_RATIO}
              minWidth={MIN_DIMENSION}>
          </ReactCrop>
          <div style={{ display: 'flex' }}>
            <div onClick={() => { setCanvasPreview(imgRef.current, previewCanvasRef.current, convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height )) }} className={styles.saveAndContinueButton}>Сохарнить и продолжить</div>
            <div onClick={() => setNextModal(true)} className={styles.backButton}>Назад</div>
            <button onChange={(e) => setRotate(90)} />
          </div>
      </div>)}
      {crop &&
        <canvas
            ref={previewCanvasRef}
            style={{
              border: '1px solid black',
              objectFit: 'contain',
              width: '150px',
              height: '150px'
        }}>
        </canvas>
      }
    </div>
  )
}