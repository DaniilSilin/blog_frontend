import React from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import styles from "@/app/components/modules/blog_posts/blog_posts.module.css";
import BlogPageInput from "@/app/components/modules/form/BlogPageInput";

export interface Props {
  slug: string;
  page: number;
  setPage: (value: number) => void;
  cleanParams: any;
}

const SORTING_LIST = [
  {
    id: 1,
    title: "Новые",
    query_param: "newest",
  },
  {
    id: 2,
    title: "Старые",
    query_param: "oldest",
  },
  {
    id: 3,
    title: "Название",
    query_param: "title_asc",
  },
  {
    id: 4,
    title: "Название",
    query_param: "title_desc",
  },
];

export default function SortingBlogPosts({
  slug,
  page,
  setPage,
  cleanParams,
}: Props) {
  const [currentSortingParam, setCurrentSortingParam] = React.useState(
    cleanParams.sorting ? cleanParams.sorting : "newest",
  );
  const [blogSearchInput, setBlogSearchInput] = React.useState("");
  const router = useRouter();

  const setSortingParam = React.useCallback(
    (param: string) => {
      if (currentSortingParam !== param) {
        setCurrentSortingParam(param);
        setPage(1);
      }
      router.push(
        {
          pathname: `/blog/${slug}/posts/`,
          query: { sorting: param },
        },
        undefined,
        { shallow: true },
      );
    },
    [router],
  );

  return (
    <div style={{ display: "flex", marginTop: "15px" }}>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        {SORTING_LIST.map((item) => (
          <button
            className={classNames(styles.sortingItem, {
              [styles.active]: currentSortingParam === item.query_param,
            })}
            onClick={() => setSortingParam(item.query_param)}
          >
            <div>{item.title}</div>
          </button>
        ))}
      </div>
      <form style={{ marginTop: "3px" }}>
        {/*<HiMiniMagnifyingGlass />*/}
        <BlogPageInput
          width={100}
          height={40}
          onChange={setBlogSearchInput}
          placeholder={"Поиск"}
        />
      </form>
      <div style={{ marginBottom: "2px solid black", height: "1px" }}></div>
    </div>
  );
}
