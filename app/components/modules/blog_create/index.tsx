import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import { useRouter } from 'next/router'
import __Input from "@/app/components/modules/form/Input"
import _TextArea from '@/app/components/modules/form/Textarea'
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop, convertToPixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const ASPECT_RATION = 1
const MIN_DIMENSION = 150

const BASE_URL = 'http://localhost:8000'

export default function BlogCreate() {
  const imgRef = React.useRef(null)
  const [ title, setTitle ] = React.useState<string>('')
  const [ slug, setSlug ] = React.useState<string>('')
  const [ description, setDescription ] = React.useState<string>('')
  const [ avatar, setAvatar ] = React.useState<any>()
  const [ imageSource, setImageSource ] = React.useState<string>('')
  const [ avatarBig, setAvatarBig ] = React.useState()
  const [ crop, setCrop ] = React.useState<any>()
  const previewCanvasRef = React.useRef(null)
  const [ createBlog, status ] = DjangoService.useCreateBlogMutation()
  const { data: blog_slug } = DjangoService.useGetBlogSlugQuery({ slug })

  const [ imageOriginal, setImageOriginal ] = React.useState()

  const request = async() => {
    const formData = new FormData()
    formData.append('avatar_small', avatar)
    formData.append('avatar', avatarBig)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('slug', slug)
    createBlog({ formData })
    // createBlog({ title, description, slug })
  }

  const onSelectFile = (e) => {
    const file = e.target?.files[0]

    const reader = new FileReader()
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || ''
      setImageOriginal(file)
      setAvatarBig(file)
      setImageSource(imageUrl)
    })
    reader.readAsDataURL(file)
  }

  const onImageLoad = (e) => {
    const width = e.target.width
    const height = e.target.height
    const crop = makeAspectCrop(
    {
      unit: 'px',
      width: MIN_DIMENSION
    },
      ASPECT_RATION,
      width,
      height
      )
    const centeredCrop = centerCrop(crop, width, height)
    setCrop(centeredCrop)
  }

  const setCanvasPreview = (image, canvas, crop) => {
    const setCanvasPreview = (
      image, // HTMLImageElement
      canvas, // HTMLCanvasElement
      crop // PixelCrop
    ) => {
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        throw new Error('232')
      }
    }
    const ctx = canvas.getContext("2d")

    const PixelRatio = window.devicePixelRatio
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = Math.floor(crop.width)
    canvas.height = Math.floor(crop.height)

    ctx.scale(PixelRatio, PixelRatio)
    ctx.imageSmoothingQuality = 'high'
    ctx.save()

    const cropX = crop.x * scaleX
    const cropY = crop.y * scaleX

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

  const dataURLtoFile = (dataUrl, filename) => {
    const arr = dataUrl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length;
    const u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  return (
    <div>
      <img src={`${BASE_URL}/media/icy.jpg/`} width={30} height={30} alt="" />
      <input type='file' accept='image/*' onChange={onSelectFile} />
      {/*<input type='file' accept='image/*' style={{  }} onChange={onSelectFile}>*/}
      {/*  <img src={`${BASE_URL}/media/icy.jpg/`} width={30} height={30} alt="" />*/}
      {/*</input>*/}
      <div>
        {imageSource && (
          <div>
            <ReactCrop
              crop={crop}
              onChange={
                (pixelCrop, percentCrop)=>setCrop(pixelCrop)
              }
              circularCrop
              keepSelection
              aspect={1}
              minWidth={150}
            >
              <img ref={imgRef} src={imageSource} alt='' onLoad={onImageLoad} />
            </ReactCrop>
          </div>
        )}
      </div>
      <button onClick={() => {
        setCanvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          convertToPixelCrop(
            crop,
            imgRef.current.width,
            imgRef.current.height
          ))
        const dataUrl = previewCanvasRef.current.toDataURL();
        const file = dataURLtoFile(dataUrl, 'croppedImage.jpeg');
        setAvatar(file)
      }}>
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
      </button>
      {avatar && (<img src={previewCanvasRef.current.toDataURL()} />)}
      <__Input width={600} height={50} label={'Название блога'} onChange={setTitle} placeholder={'Придумайте название'}  />
      <div>{blog_slug}</div>
      <__Input width={600} height={50} label={'Slug Блога'} onChange={setSlug} />
      <_TextArea width={600} height={100} label={'Описание'} onChange={setDescription} placeholder={'Напишите пару строк, чтобы заинтересовать аудиторию'} />
      <input type={'submit'} value={'Создать блог'} onClick={request} />
    </div>
  )
}