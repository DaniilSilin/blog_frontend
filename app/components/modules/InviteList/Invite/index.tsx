import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import moment from "moment";
import "moment/locale/ru";
import Link from "next/link";

import styles from "./invite.module.css";

export interface Props {
  invite: any;
}

export default function Invite({ invite }: Props) {
  const [acceptInvite] = DjangoService.useAcceptInviteMutation();
  const [rejectInvite] = DjangoService.useAcceptInviteMutation();

  const acceptInviteFunction = (pk: number) => {
    acceptInvite({ pk });
  };

  const rejectInviteFunction = (pk: number) => {
    rejectInvite({ pk });
  };

  return (
    <div className={styles.inviteContainer}>
      <div>Приглашение от пользователя: {invite.admin}</div>
      <div>
        Приглашение в блог:
        <Link href={`/blog/${invite.blog.slug}/`}>{invite.blog.title}</Link>
      </div>
      <div>
        Дата приглашения: {moment(invite.created_at).format("D MMMM hh:mm")}
      </div>
      <div>Текст приглашения: {invite.description}</div>
      {invite.status === null ? (
        <div style={{ display: "flex", marginTop: "10px" }}>
          <button
            className={styles.acceptInvite}
            onClick={() => acceptInviteFunction(invite.pk)}
          >
            Принять
          </button>
          <button
            className={styles.rejectInvite}
            onClick={() => rejectInviteFunction(invite.pk)}
          >
            Отклонить
          </button>
        </div>
      ) : invite.status ? (
        <div className={styles.inviteText}>Вы приняли приглашение</div>
      ) : (
        <div className={styles.inviteText}>Вы отклонили приглашение</div>
      )}
    </div>
  );
}
