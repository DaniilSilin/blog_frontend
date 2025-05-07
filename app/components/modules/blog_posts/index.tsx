import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";
import Link from "next/link";
import { useRouter } from "next/router";

import { PostType } from "@/app/types";
import { GoPlus } from "react-icons/go";

import SortingBlogPosts from "./SortingBlogPosts";
import BlogItem from "@/app/components/modules/blog_page";
import PostItem from "@/app/components/modules/post_page";

import styles from "./blog_posts.module.css";

const cleanParams = (queryParams: any, page: number, slug: string) => {
  const sorting = queryParams.sorting ? queryParams.sorting : undefined;
  const search = queryParams.search ? queryParams.search : undefined;

  return { sorting: sorting, search: search, slug: slug, page: page };
};

export default function BlogPosts({ slug }) {
  const router = useRouter();
  const user = useAppSelector((state) => state.django.profile);
  const [page, setPage] = React.useState(1);
  const { data: blogPosts, isFetching } = DjangoService.useGetBlogPostsQuery(
    cleanParams(router.query, page, slug),
  );
  const { data: blog } = DjangoService.useGetBlogQuery({ slug });

  React.useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        if (blogPosts.next != null) {
          setPage(page + 1);
        } else {
          return;
        }
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [page, blogPosts]);

  return (
    <div className={styles.root}>
      <BlogItem slug={slug}>
        {blogPosts?.results.length > 0 ? (
          <>
            <SortingBlogPosts
              page={page}
              setPage={setPage}
              cleanParams={cleanParams(router.query, page, slug)}
              slug={slug}
            />
            {(user.username === blog?.owner.username ||
              blog.authors.find(
                (author) => author.username === user.username,
              )) && (
              <div>
                <Link
                  className={styles.createPostButton}
                  href={`/blog/${blog?.slug}/post/create/`}
                >
                  <GoPlus />
                  <div>Создать публикацию</div>
                </Link>
              </div>
            )}
            <div>
              {blogPosts?.results.map((post: PostType, index: number) => (
                <PostItem key={index} post={post} />
              ))}
            </div>
          </>
        ) : (
          <>
            {(user.username === blog?.owner.username ||
              blog.authors.find(
                (author) => author.username === user.username,
              )) && (
              <div style={{ marginTop: "15px" }}>
                <Link
                  className={styles.createPostButton}
                  href={`/blog/${blog?.slug}/post/create/`}
                >
                  <GoPlus />
                  <div>Создать публикацию</div>
                </Link>
              </div>
            )}
            <h1>В блоге не размещены какие-либо пуликации</h1>
          </>
        )}
      </BlogItem>
    </div>
  );
}
