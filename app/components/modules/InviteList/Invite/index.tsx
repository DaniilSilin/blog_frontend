import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import moment from "moment";
import "moment/locale/ru";
import Link from "next/link";
import Image from "next/image";

import { InviteType } from "@/app/types/Invite";

import styles from "./invite.module.css";

export interface Props {
  invite: InviteType;
}

function getApiUrl() {
  if (typeof window === "undefined") {
    return process.env.API_URL;
  }
  return process.env.NEXT_PUBLIC_API_URL;
}

const BASE_URL = getApiUrl();

export default function Invite({ invite }: Props) {
  const [acceptInvite] = DjangoService.useAcceptInviteMutation();
  const [rejectInvite] = DjangoService.useRejectInviteMutation();

  const acceptInviteFunction = (pk: number) => {
    acceptInvite({ pk });
  };

  const rejectInviteFunction = (pk: number) => {
    rejectInvite({ pk });
  };

  return (
    <div className={styles.inviteContainer}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link href={`/profile/${invite.admin.username}`}>
          <Image
            src={
              invite.blog.avatar_small
                ? `${BASE_URL}${invite.blog.avatar_small}`
                : "/img/default/avatar_default.jpg"
            }
            className={styles.avatar}
            width={50}
            height={50}
            alt=""
          />
        </Link>
        <div>
          Пользователь{" "}
          <Link href={`/profile/${invite.admin.username}`}>
            {invite.admin.username}
          </Link>{" "}
          приглашает Вас стать автором блога{" "}
          <Link href={`/blog/${invite.blog.slug}/`}>{invite.blog.title}</Link>
        </div>
      </div>
      <div style={{ marginLeft: "60px" }}>
        <div>
          <span style={{ fontWeight: "600" }}>Дата приглашения: </span>
          <span>{moment(invite.created_at).format("D MMMM hh:mm")}</span>
        </div>
        <div style={{ wordBreak: "break-all", marginTop: "7px" }}>
          <span style={{ fontWeight: "600" }}>Текст приглашения:</span>
          <span>&nbsp;{invite.description}</span>
        </div>
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
        ) : invite.status.toString() === "true" ? (
          <div className={styles.inviteText}>Вы приняли приглашение</div>
        ) : (
          <div className={styles.inviteText}>Вы отклонили приглашение</div>
        )}
      </div>
    </div>
  );
}
