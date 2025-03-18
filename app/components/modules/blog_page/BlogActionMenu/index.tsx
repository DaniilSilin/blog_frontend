import React from "react";
import Link from "next/link";
import styles from "@/app/components/modules/blog_page/blog_page.module.css";
import { Blog } from "@/app/types";
import DjangoService from "@/app/store/services/DjangoService";
import { useRouter } from "next/router";
import { useAppSelector } from "@/app/store";

export interface Props {
  blogData: Blog;
  hasAccess: boolean;
  slug: string;
}

export default function BlogActionMenu({ hasAccess, blogData, slug }: Props) {
  const subscribeButtonRef = React.useRef(null);
  const user = useAppSelector((state) => state.django.profile);
  const [subscribeBlog] = DjangoService.useSubscribeBlogMutation();
  const [unsubscribeBlog] = DjangoService.useUnsubscribeBlogMutation();
  const [openSubscribePopup, setOpenSubscribePopup] = React.useState(false);
  const router = useRouter();

  const subscribeRequest = () => {
    subscribeBlog({ slug });
  };

  const unsubscribeRequest = () => {
    unsubscribeBlog({ slug });
  };

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!subscribeButtonRef.current.contains(e.target)) {
        setOpenSubscribePopup(false);
      }
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    };
  });

  if (hasAccess) {
    return (
      <Link href={`/blog/${blogData.slug}/editor/settings/`}>
        <div className={styles.subscribeButton}>Настроить вид канала</div>
      </Link>
    );
  }

  if (Object.keys(user).length === 0) {
    return (
      <>
        <div
          ref={subscribeButtonRef}
          onClick={() => setOpenSubscribePopup(!openSubscribePopup)}
          className={styles.subscribeButton}
        >
          Подписаться
        </div>
        {openSubscribePopup && (
          <div
            style={{
              width: "378px",
              height: "174px",
              backgroundColor: "#212121",
              position: "absolute",
            }}
          >
            <div style={{ margin: "16px 0 16px 0", color: "#d2d2d2" }}>
              Хотите подписаться на этот канал?
            </div>
            <div style={{ margin: "4px 0 32px", color: "#919191" }}>
              Тогда войдите в аккаунт.
            </div>
            <Link href={`/login`}>
              <div>Войти</div>
            </Link>
          </div>
        )}
      </>
    );
  }

  if (Object.keys(user).length !== 0 && !hasAccess) {
    return (
      <div>
        {blogData?.isSubscribed.toString() === "true" ? (
          <div
            className={styles.unsubscribeButton}
            onClick={unsubscribeRequest}
          >
            Отписаться
          </div>
        ) : (
          <div className={styles.subscribeButton} onClick={subscribeRequest}>
            Подписаться
          </div>
        )}
      </div>
    );
  }
}
