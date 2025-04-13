import React from "react";
import DjangoService from "@/app/store/services/DjangoService";

import { InviteType } from "@/app/types/Invite";

import Invite from "./Invite";

import styles from "./invite_list.module.css";

export default function InviteList() {
  const [page, setPage] = React.useState(1);
  const { data: inviteList, isFetching } = DjangoService.useGetInviteListQuery({
    page,
  });

  React.useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        if (inviteList.next != null) {
          setPage(page + 1);
        } else {
          return;
        }
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [page, isFetching]);

  if (inviteList?.results.length === 0) {
    return (
      <div className={styles.root}>
        <div className={styles.title}>Список приглашений</div>
        <div>Вы не имеете каких-либо приглашений</div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.title}>Список приглашений</div>
      {inviteList?.results.map((invite: InviteType, index: number) => (
        <Invite key={index} invite={invite} />
      ))}
    </div>
  );
}
