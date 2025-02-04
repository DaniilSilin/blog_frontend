import React from 'react'
import { UpdateInput } from "@/app/components/modules/form"

export interface Props {
  vkLink: string
  setVkLink: (value: string) => void
  telegramLink: string
  setTelegramLink: (value: string) => void
  youtubeLink: string
  setYoutubeLink: (value: string) => void
  dzenLink: string
  setDzenLink: (value: string) => void
}

const vkLinkLabel = 'Ссылка на ВКонтакте'
const telegramLinkLabel = 'Ссылка на Telegram'
const youtubeLinkLabel = 'Ссылка на Youtube'
const dzenLinkLabel = 'Ссылка на Дзен'

export default function BlogSocialMediaLinks({ vkLink, setVkLink, telegramLink, setTelegramLink, youtubeLink, setYoutubeLink, dzenLink, setDzenLink }: Props) {
  return (
    <div>
      <UpdateInput width={400} height={40} onChange={setVkLink} value={vkLink} label={vkLinkLabel} />
      <UpdateInput width={400} height={40} onChange={setTelegramLink} value={telegramLink} label={telegramLinkLabel} />
      <UpdateInput width={400} height={40} onChange={setYoutubeLink} value={youtubeLink} label={youtubeLinkLabel} />
      <UpdateInput width={400} height={40} onChange={setDzenLink} value={dzenLink} label={dzenLinkLabel} />
    </div>
  )
}