import React, { FormEvent } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import BlogPageInput from "@/app/components/modules/form/BlogPageInput";

import styles from "./sorting_blog_posts.module.css";

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
    title: "Название (↓)",
    query_param: "title_asc",
  },
  {
    id: 4,
    title: "Название (↑)",
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
  const [displaySearchInput, setDisplaySearchInput] = React.useState("");
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
          query: { ...router.query, sorting: param },
        },
        undefined,
        { shallow: true },
      );
    },
    [router],
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    router.push(
      {
        pathname: `/blog/${slug}/posts/`,
        query: { ...router.query, search: blogSearchInput },
      },
      undefined,
      { shallow: true },
    );
  };

  const dispSearchInput = React.useCallback(() => {
    setDisplaySearchInput("");
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.sortingButtonsContainer}>
        {SORTING_LIST.map((item) => (
          <button
            key={item.id}
            className={classNames(styles.sortingItem, {
              [styles.active]: currentSortingParam === item.query_param,
            })}
            onClick={() => setSortingParam(item.query_param)}
          >
            <div>{item.title}</div>
          </button>
        ))}
      </div>
      <button onClick={dispSearchInput}>
        <HiMiniMagnifyingGlass size={35} />
      </button>
      {displaySearchInput && (
        <form
          style={{ marginTop: "3px", marginLeft: "10px" }}
          onSubmit={handleSubmit}
        >
          <BlogPageInput
            width={200}
            height={40}
            onChange={setBlogSearchInput}
            placeholder={"Поиск"}
          />
        </form>
      )}
    </div>
  );
}
