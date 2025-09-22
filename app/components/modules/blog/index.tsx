import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { BlogType, CleanParamsType } from "@/app/types";
import { useRouter } from "next/router";

import BlogItem from "@/app/components/modules/blog_item";
import Filter from "../filter";

import styles from "./blog.module.css";

const cleanParams = (
  query: Record<string, any>,
  page: number,
): CleanParamsType => {
  const search = query.search ? query.search : undefined;
  const before = query.before ? query.before : undefined;
  const after = query.after ? query.after : undefined;
  const sort_by = query.sort_by ? query.sort_by : undefined;

  return {
    page: page,
    search: search,
    sort_by: sort_by,
    after: after,
    before: before,
  };
};

export default function BlogList() {
  const router = useRouter();
  const [page, setPage] = React.useState<number>(1);
  const {
    data: blogList,
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
      <Filter setPage={setPage} cleanParams={cleanParams(router.query, page)} />
      {blogList?.results.map((blog: BlogType, index: number) => (
        <BlogItem key={index} blog={blog} />
      ))}
    </div>
  );
}
