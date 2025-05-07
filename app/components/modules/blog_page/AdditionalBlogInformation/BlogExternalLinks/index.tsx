import React from "react";

import { BlogType } from "@/app/types";
import { ImTelegram, ImVk, ImYoutube } from "react-icons/im";
import { TbBrandYandex } from "react-icons/tb";
import { BiPlanet } from "react-icons/bi";

import styles from "./blog_external_links.module.css";

export interface Props {
  blog: BlogType;
}

export default function BlogExternalLinks({ blog }: Props) {
  return (
    <div className={styles.linksContainer}>
      <div className={styles.linksContainerTitle}>Ссылки</div>
      <div className={styles.externalLinksContainer}>
        {blog?.telegram_link && (
          <div className={styles.externalLinkContainer}>
            <ImTelegram size={24} className={styles.externalLinkIcon} />
            <div className={styles.externalLinkSubContainer}>
              <span className={styles.externalLinkTitle}>Telegram</span>
              <span>
                <a
                  className={styles.externalLink}
                  href={`${blog?.telegram_link}`}
                  target={"_blank"}
                >
                  {blog?.telegram_link}
                </a>
              </span>
            </div>
          </div>
        )}
        {blog?.vk_link && (
          <div className={styles.externalLinkContainer}>
            <ImVk size={24} className={styles.externalLinkIcon} />
            <div className={styles.externalLinkSubContainer}>
              <span className={styles.externalLinkTitle}>ВКонтакте</span>
              <span>
                <a
                  className={styles.externalLink}
                  href={`${blog?.vk_link}`}
                  target={"_blank"}
                >
                  {blog?.vk_link}
                </a>
              </span>
            </div>
          </div>
        )}
        {blog?.youtube_link && (
          <div className={styles.externalLinkContainer}>
            <ImYoutube size={24} className={styles.externalLinkIcon} />
            <div className={styles.externalLinkSubContainer}>
              <span className={styles.externalLinkTitle}>YouTube</span>
              <span>
                <a
                  className={styles.externalLink}
                  href={`${blog?.youtube_link}`}
                  target={"_blank"}
                >
                  {blog?.youtube_link}
                </a>
              </span>
            </div>
          </div>
        )}
        {blog?.dzen_link && (
          <div className={styles.externalLinkContainer}>
            <TbBrandYandex size={24} className={styles.externalLinkIcon} />
            <div className={styles.externalLinkSubContainer}>
              <span className={styles.externalLinkTitle}>Дзен</span>
              <span>
                <a
                  className={styles.externalLink}
                  href={`${blog?.dzen_link}`}
                  target={"_blank"}
                >
                  {blog?.dzen_link}
                </a>
              </span>
            </div>
          </div>
        )}
        {blog?.site_link && (
          <div className={styles.externalLinkContainer}>
            <BiPlanet size={24} className={styles.externalLinkIcon} />
            <div className={styles.externalLinkSubContainer}>
              <span className={styles.externalLinkTitle}>
                Личный Веб-ресурс
              </span>
              <span>
                <a
                  className={styles.externalLink}
                  href={`${blog?.site_link}`}
                  target={"_blank"}
                >
                  {blog?.site_link}
                </a>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
