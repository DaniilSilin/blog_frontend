import React from "react";
import DjangoService from "@/app/store/services/DjangoService";

export interface Props {
  item: any;
}

export default function Subscribe({ item }: Props) {
  const { user_data } = DjangoService.useGetUserDataQuery();

  const [subscribeBlog] = DjangoService.useSubscribeBlogMutation();
  const [unsubscribeBlog] = DjangoService.useUnsubscribeBlogMutation();

  const subscribe = () => {
    subscribeBlog({ slug: "apple" });
  };

  const unsubscribe = () => {
    unsubscribeBlog({ slug: "alex2" });
  };

  return (
    <div>
      {user_data.subscriptions.map((item2) => (
        <div>{item2}</div>
        // <div>{item.id === item2 ? <div>alex</div> : <div>alex2</div>}</div>
      ))}
    </div>
  );
}
