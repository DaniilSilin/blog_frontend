import React from "react";
import { useAppSelector } from "@/app/store";
import DjangoService from "@/app/store/services/DjangoService";
import Link from "next/link";
import { useRouter } from "next/router";

import { Blog } from "@/app/types";

import styles from "@/app/components/modules/blog_page/blog_page.module.css";

export interface Props {
  blog: Blog;
  slug: string;
}

export default function BlogActionMenu({ blog, slug }: Props) {
  const subscribeButtonRef = React.useRef(null);
  const user = useAppSelector((state) => state.django.profile);
  const [openSubscribePopup, setOpenSubscribePopup] = React.useState(false);
  const router = useRouter();

  const [blogSubscription] = DjangoService.useBlogSubscriptionMutation();

  const toggleBlogSubscription = () => {
    blogSubscription({ slug });
  };

  // React.useEffect(() => {
  //   const handler = (e: MouseEvent) => {
  //     if (!subscribeButtonRef.current.contains(e.target)) {
  //       setOpenSubscribePopup(false);
  //     }
  //     document.addEventListener("mousedown", handler);
  //     return () => document.removeEventListener("mousedown", handler);
  //   };
  // });

  if (user.username === blog?.owner.username) {
    return (
      <Link href={`/blog/${blog.slug}/editor/settings/`}>
        <div className={styles.subscribeButton}>Настроить вид канала</div>
      </Link>
    );
  } else {
    return (
      <div>
        {blog?.isSubscribed.toString() === "true" ? (
          <div
            className={styles.unsubscribeButton}
            onClick={toggleBlogSubscription}
          >
            Отписаться
          </div>
        ) : (
          <div
            className={styles.subscribeButton}
            onClick={toggleBlogSubscription}
          >
            Подписаться
          </div>
        )}
      </div>
    );
  }
}
