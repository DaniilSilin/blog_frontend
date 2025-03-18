import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { Blog } from "@/app/types";
import { useRouter } from "next/router";

import BlogItem from "@/app/components/modules/blog_item";
import Filter from "../filter";

import styles from "./blog.module.css";

const cleanParams = (query, page: number) => {
  const search = query.search ? query.search : undefined;
  const before = query.before ? query.before : undefined;
  const after = query.after ? query.after : undefined;
  const sorting = query.sorting ? query.sorting : undefined;

  return {
    page: page,
    search: search,
    sorting: sorting,
    after: after,
    before: before,
  };
};

export default function BlogList() {
  const router = useRouter();
  const [page, setPage] = React.useState<number>(1);
  const {
    data: blogList,
    isLoading,
    isFetching,
    refetch: refetchBlogList,
  } = DjangoService.useGetBlogPaginatedListQuery(
    cleanParams(router.query, page),
  );

  React.useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        if (blogList.next != null) {
          setPage(page + 1);
        } else {
          return;
        }
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [page, isFetching]);

  return (
    <div className={styles.root}>
      <h1>Блоги</h1>
      <Filter
        page={page}
        setPage={setPage}
        cleanParams={cleanParams(router.query, page)}
      />
      {blogList?.results.map((blog: Blog[], index: number) => (
        <BlogItem key={index} blog={blog} refetchBlogList={refetchBlogList} />
      ))}
    </div>
  );
}
