import React from 'react'
import { MdOutlineEmail,  } from "react-icons/md"
import { BsFillTelephoneFill } from "react-icons/bs"
import Link from "next/link"
import { FaLink } from "react-icons/fa6"
import { ImVk, ImYoutube, ImTelegram } from "react-icons/im"
import moment from 'moment'
import 'moment/locale/ru'

import styles from "@/app/components/modules/blog_page/blog_page.module.css"
import { Blog } from "@/app/types"

export interface Props {
  blogData: Blog
}

export default function AdditionalBlogInformation({ blogData }: Props) {
  const alexClick = React.useCallback((email: string) => {
    navigator.clipboard.writeText(email);
  }, [ ])

    return (
      <div>
        <div className={styles.close}>x</div>
        <div className={styles.modalTitle}>{blogData?.title}</div>
        <div className={styles.modalDescription}>{blogData?.description}</div>
        <div>Дата создания {moment(blogData?.created_at).format("D MMMM hh:mm")}</div>
        <ul className={styles.modalList}>
          {blogData?.email && (
            <li>
              <>
                <div className={styles.liTitle}>Почта</div>
                  <div className={styles.li_div_element} onClick={() => alexClick(blogData?.email)}>
                    <div style={{ marginRight: '5px' }}><MdOutlineEmail style={{height: '20px', width: '20px'}} /></div>
                    <div>{blogData?.email}</div>
                  </div>
              </>
            </li>
          )}
          {blogData?.phone_number && (
            <li>
              <>
                <div className={styles.liTitle}>Телефон</div>
                  <div className={styles.li_div_element}>
                    <Link style={{ display: 'flex', color: 'black' }} href={`tel:+7${blogData?.phone_number}`}>
                      <div style={{ marginRight: '5px' }}><BsFillTelephoneFill style={{height: '20px', width: '20px'}} /></div>
                      <div>{blogData?.phone_number}</div>
                    </Link>
                  </div>
              </>
            </li>
          )}
          {blogData?.site_link && (
            <li>
              <>
                <div className={styles.liTitle}>Ссылка</div>
                <div className={styles.li_div_element}>
                    <Link target={'_blank'} style={{ display: 'flex', color: 'black' }} href={blogData?.site_link}>
                        <div style={{ marginRight: '5px' }}><FaLink style={{height: '20px', width: '20px'}} /></div>
                        <div>{blogData?.site_link}</div>
                    </Link>
                </div>
              </>
            </li>
          )}
            <div className={styles.liTitle}>Соцсети</div>
            {blogData?.dzen_link && (
              <li>
                <>
                  <div className={styles.li_div_element}>
                    <Link target={'_blank'} style={{ display: 'flex', color: 'black' }} href={blogData?.dzen_link}>
                      <div style={{ marginRight: '5px' }}><ImYoutube style={{height: '20px', width: '20px'}}/></div>
                      <div>YouTube</div>
                    </Link>
                  </div>
                </>
              </li>
            )}
            {blogData?.vk_link && (
              <li>
                <>
                  <div className={styles.li_div_element}>
                    <Link target={'_blank'} style={{ display: 'flex', color: 'black' }} href={blogData?.vk_link}>
                        <div style={{ marginRight: '5px' }}><ImVk style={{height: '20px', width: '20px'}}/></div>
                        <div>ВКонтакте</div>
                    </Link>
                  </div>
                </>
              </li>
            )}
            {blogData?.vk_link && (
              <li>
                <>
                  <div className={styles.li_div_element}>
                    <Link target={'_blank'} style={{ display: 'flex', color: 'black' }} href={blogData?.vk_link}>
                      <div style={{ marginRight: '5px' }}><ImTelegram style={{height: '20px', width: '20px'}}/></div>
                      <div>Telegram</div>
                    </Link>
                  </div>
                </>
              </li>
            )}
        </ul>
      </div>
    )
}