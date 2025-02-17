import React from 'react'
import { ImVk, ImYoutube, ImTelegram,  } from "react-icons/im"
import { TbBrandYandex } from "react-icons/tb";
import { IoCalendar } from "react-icons/io5"
import { IoIosPeople } from "react-icons/io"
import { AiOutlineRise, AiOutlineMail } from "react-icons/ai"
import { FaSignsPost, FaPhone } from "react-icons/fa6"
import { BiPlanet } from "react-icons/bi"
import moment from 'moment'
import 'moment/locale/ru'
import { Blog } from "@/app/types"

import styles from './addition_information.module.css'

export interface Props {
  blogData: Blog
}

export default function AdditionalBlogInformation({ blogData }: Props) {
  const [ doesHaveLink, setDoesHaveLinks ] = React.useState(false)

  React.useEffect(() => {
    if (blogData?.phone_number || blogData?.site_link || blogData?.vk_link || blogData?.telegram_link || blogData?.dzen_link || blogData?.youtube_link) {
        setDoesHaveLinks(true)
    } else {
        setDoesHaveLinks(false)
    }
  }, [ blogData ])

return (
  <div style={{ padding: '10px 10px' }}>
    <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '10px' }}>О канале</div>
    {blogData?.description && (
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div>{blogData?.description}</div>
      </div>
    )}
    <div>
        <div style={{ fontSize: '21px', fontWeight: '700', marginBottom: '10px' }}>О канале</div>
        {blogData?.email && (
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <AiOutlineMail size={20} style={{ marginRight: '10px' }} />
          <a href={`mailto:${blogData?.email}`}>{blogData?.email}</a>
        </div>
        )}
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <AiOutlineRise size={20} style={{ marginRight: '10px' }} />
          <div>{blogData?.views} просмотров</div>
        </div>
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <IoIosPeople size={20} style={{ marginRight: '10px' }} />
          <div>{blogData?.count_of_posts} подписчиков</div>
        </div>
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <FaSignsPost size={20} style={{ marginRight: '10px' }} />
          <div>{blogData?.subscriberList} постов</div>
        </div>
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <IoCalendar size={20} style={{ marginRight: '10px' }} />
          <div>Дата регистрации: {moment(blogData?.created_at).format("D MMMM hh:mm")}</div>
        </div>
    </div>
      {doesHaveLink && (
          <div>
              <div style={{fontSize: '21px', fontWeight: '700', marginBottom: '10px'}}>Ссылки</div>
              <div style={{display: 'flex', marginBottom: '15px' }}>
                  <ImVk size={20} style={{marginRight: '10px'}}/>
                  <a style={{ textDecoration: 'none', color: 'black' }} href={blogData?.vk_link}>{blogData?.vk_link}</a>
              </div>
              <div style={{display: 'flex', marginBottom: '15px'}}>
                  <ImTelegram size={20} style={{marginRight: '10px'}}/>
                  <a style={{ textDecoration: 'none', color: 'black' }}  href={blogData?.telegram_link}>{blogData?.telegram_link}</a>
              </div>
              <div style={{display: 'flex', marginBottom: '15px'}}>
                  <ImYoutube size={20} style={{marginRight: '10px'}}/>
                  <a style={{ textDecoration: 'none', color: 'black' }}  href={blogData?.youtube_link}>{blogData?.youtube_link}</a>
              </div>
              <div style={{display: 'flex', marginBottom: '15px'}}>
                  <TbBrandYandex size={20} style={{marginRight: '10px'}}/>
                  <a style={{ textDecoration: 'none', color: 'black' }}  href={blogData?.dzen_link}>{blogData?.dzen_link}</a>
              </div>
              <div style={{display: 'flex', marginBottom: '15px'}}>
                  <BiPlanet size={20} style={{marginRight: '10px'}}/>
                  <a style={{ textDecoration: 'none', color: 'black' }}  href={blogData?.site_link}>{blogData?.site_link}</a>
              </div>
              <div style={{display: 'flex', marginBottom: '15px'}}>
                  <FaPhone size={20} style={{marginRight: '10px'}}/>
                  <a style={{ textDecoration: 'none', color: 'black' }}  href={`tel:${blogData?.site_link}`}>${blogData?.site_link}</a>
              </div>
          </div>
      )}
  </div>
  )
}