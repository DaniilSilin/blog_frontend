import React from "react";
import DjangoService from "@/app/store/services/DjangoService";

import { PostType } from "@/app/types";
import PostItem from "@/app/components/modules/post_page";
import Filter from "@/app/components/modules/filter";
import { useRouter } from "next/router";

const cleanParams = (query, page: number) => {
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

export default function Subscriptions() {
  const router = useRouter();
  const [page, setPage] = React.useState(1);

  const { data: subscriptionList, isFetching } =
    DjangoService.useSubscriptionListQuery(cleanParams(router.query, page));

  React.useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        if (subscriptionList.next != null) {
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
    <div>
      <h1>Подписки</h1>
      <Filter
        page={page}
        setPage={setPage}
        cleanParams={cleanParams(router.query, page)}
      />
      {subscriptionList?.results.map((post: PostType[], index: number) => (
        <PostItem key={index} post={post} />
      ))}
    </div>
  );
}
