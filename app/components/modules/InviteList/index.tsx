import React from "react";
import DjangoService from "@/app/store/services/DjangoService";

import Invite from "./Invite";

import styles from "./invite_list.module.css";

export default function InviteList() {
  const { data: inviteList } = DjangoService.useGetInviteListQuery({});

  return (
    <div className={styles.root}>
      <div className={styles.title}>Список приглашений</div>
      {inviteList?.results.map((invite: any, index: number) => (
        <Invite key={index} invite={invite} />
      ))}
    </div>
  );
}
