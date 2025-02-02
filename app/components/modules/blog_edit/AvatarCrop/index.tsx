import React from 'react'
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop, convertToPixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

export interface Props {
  originalImageSourceUrl: string
}

const MIN_DIMENSION = 100
const ASPECT_RATIO = 1

export default function AvatarCrop({ originalImageSourceUrl }: Props) {
  const imgRef = React.useRef(null)
  const previewCanvasRef = React.useRef(null)
  const [ crop, setCrop ] = React.useState()

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
    scale = 1,
    rotate = 0,
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

  return (
    <div>
      <ReactCrop
        onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
        circularCrop
        crop={crop}
        keepSelection
        aspect={ASPECT_RATIO}
        minWidth={MIN_DIMENSION}
      >
        <img src={originalImageSourceUrl} onLoad={onImageLoad} alt='' />
      </ReactCrop>
      <div>
        <div>Отмена</div>
        <div>Готово</div>
      </div>
    </div>
  )
}