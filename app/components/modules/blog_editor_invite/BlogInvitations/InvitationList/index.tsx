import React from "react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/ru";

import styles from "./invitation_list.module.css";

export interface Props {
  invite: any;
}

export default function InvitationList({ invite }: Props) {
  const inviteStatus = React.useMemo(() => {
    const currentInvite = invite.status;
    if (currentInvite !== null) {
      if (currentInvite.toString() === "true") {
        return "Принята";
      } else {
        return "Отклонена";
      }
    } else {
      return "Без ответа";
    }
  }, [invite]);

  return (
    <div className={styles.root}>
      <div style={{ display: "flex", fontSize: "16px" }}>
        <div style={{ fontWeight: "600" }}>Отправить:&nbsp;</div>
        <Link href={`/profile/${invite.admin}/`}>
          <div>{invite.admin}</div>
        </Link>
      </div>
      <div style={{ display: "flex", fontSize: "16px" }}>
        <div style={{ fontWeight: "600" }}>Получатель:&nbsp;</div>
        <Link href={`/profile/${invite.addressee}/`}>
          <div>{invite.addressee}</div>
        </Link>
      </div>
      <div>
        Дата создания: {moment(invite.created_at).format("D MMMM hh:mm")}
      </div>
      <div>Текст сообщения: {invite.description}</div>
      <div>Статус: {inviteStatus}</div>
    </div>
  );
}
