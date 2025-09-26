import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";
import Image from "next/image";

import BlogActionMenu from "./BlogActionMenu";
import BlogHeaderToolbar from "./BlogHeaderToolbar";
import AdditionalBlogInformation from "./AdditionalBlogInformation";

import styles from "./blog_page.module.css";

const BASE_URL = "http://127.0.0.1:8000";

export interface Props {
  children: React.ReactNode;
  slug: string;
}

export default function BlogItem({ slug, children }: Props) {
  const { data: blogData } = DjangoService.useGetBlogQuery({ slug });
  const user = useAppSelector((state) => state.django.profile);

  const [dynamicContentModalDisplayed, setDynamicContentModalDisplayed] =
    React.useState(false);
  const freezeBody = React.useCallback(
    () => document.querySelector(".modal_3")?.classList.add("freeze"),
    [],
  );
  const unfreezeBody = React.useCallback(
    () => document.querySelector(".modal_3")?.classList.remove("freeze"),
    [],
  );

  const blogSubscribersTitle = React.useMemo(() => {
    const blogSubscribers = blogData?.subscriberList.toString();
    if (
      blogSubscribers.slice(-1) === "1" &&
      blogSubscribers.slice(-2) !== "11"
    ) {
      return `${blogSubscribers} подписчик`;
    } else if (
      (blogSubscribers.slice(-1) === "2" ||
        blogSubscribers.slice(-1) === "3" ||
        blogSubscribers.slice(-1) === "4") &&
      blogSubscribers.slice(-2) !== "12" &&
      blogSubscribers.slice(-2) !== "13" &&
      blogSubscribers.slice(-2) !== "14"
    ) {
      return `${blogSubscribers} подписчика`;
    } else {
      return `${blogSubscribers} подписчиков`;
    }
  }, [blogData?.subscriberList]);

  const handleDynamicContentClick = React.useCallback(
    (e: any) => {
      let elem = e.target;
      if (dynamicContentModalDisplayed) {
        if (
          elem.className.startsWith("close_3") ||
          elem.className.startsWith("modal_3")
        ) {
          if (elem.className.startsWith("close_3")) {
            elem = elem.parentNode.parentNode.parentNode;
            elem.style.display = "none";
            unfreezeBody();
            setDynamicContentModalDisplayed(false);
          }
          elem.style.display = "none";
          unfreezeBody();
          setDynamicContentModalDisplayed(false);
        }
      } else {
        let modalNode = null;
        if (elem.lastElementChild.className.startsWith("modal_3")) {
          modalNode = elem.lastElementChild;
          modalNode.style.display = "block";
          freezeBody();
          setDynamicContentModalDisplayed(true);
        }
      }
    },
    [freezeBody, unfreezeBody, dynamicContentModalDisplayed],
  );

  return (
    <div className={styles.root}>
      <div className={styles.blogContainer}>
        <Image
          src={
            blogData?.banner_small
              ? `${BASE_URL}${blogData?.banner_small}`
              : "/img/default/banner.jpg"
          }
          width={1070}
          height={180}
          style={{ borderRadius: "15px" }}
          alt=""
        />
        <div style={{ display: "flex" }}>
          <Image
            src={
              blogData?.avatar_small
                ? `${BASE_URL}${blogData?.avatar_small}`
                : "/img/default/avatar_default.jpg"
            }
            style={{ borderRadius: "50%" }}
            alt=""
            width={150}
            height={150}
          />
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "870px",
            }}
          >
            <div className={styles.blogInfo}>
              <div className={styles.blogTitle}>{blogData?.title}</div>
              <div style={{ display: "flex" }}>
                <div>{blogData?.slug}</div>
                <div className={styles.delimiter}>·</div>
                <div>{blogSubscribersTitle}</div>
                <div className={styles.delimiter}>·</div>
                <div>{blogData?.count_of_posts} постов</div>
              </div>
              <div
                onClick={handleDynamicContentClick}
                className={styles.blogDescription}
              >
                {blogData?.description ? (
                  <>
                    {blogData?.description.length < 35 ? (
                      <>{blogData?.description}...ещё</>
                    ) : (
                      <>{blogData?.description.slice(0, 35)}...ещё</>
                    )}
                  </>
                ) : (
                  <>
                    <>Подробнее о канале</>
                    <>...ещё</>
                  </>
                )}
                <div className={"modal_3"} style={{ overflow: "hidden" }}>
                  <div
                    className={"modalContent_3"}
                    style={{ margin: "10% auto" }}
                  >
                    <AdditionalBlogInformation blog={blogData} />
                  </div>
                </div>
              </div>
              <div>
                <BlogActionMenu blog={blogData} slug={slug} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlogHeaderToolbar slug={slug} />
      <div className={styles.divider}></div>
      {children}
    </div>
  );
}
