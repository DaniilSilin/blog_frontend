import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useAppSelector } from "@/app/store";
import classNames from "classnames";

import TextArea from "@/app/components/modules/form/Textarea";
import SelectField from "@/app/components/modules/form/SelectField";

import styles from "./invite_or_remove_author.module.css";

export interface Props {
  slug: string;
}

export default function InviteOrRemoveAuthor({ slug }: Props) {
  const user = useAppSelector((state) => state.django.profile);
  const [addressee, setAddressee] = React.useState("");
  const [username, setUsername] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [authorUsername, setAuthorUsername] = React.useState<string>("");
  const [kickAddressee, setKickAddressee] = React.useState("");

  const [inviteToBlog] = DjangoService.useInviteUserToBlogMutation();
  const [kickAuthor] = DjangoService.useKickUserMutation();

  const inviteToBlogOnClick = () => {
    inviteToBlog({ addressee, description, blog: slug, admin: user?.id });
  };

  const kickAuthorHandleSubmit = () => {
    kickAuthor({ slug: slug, username: kickAddressee });
  };

  const { data: userList } = DjangoService.useGetUsersQuery({
    username: username,
    slug: slug,
  });
  const { data: blogAuthors } = DjangoService.useBlogAuthorsQuery({
    slug: slug,
    username: authorUsername,
  });

  return (
    <div className={styles.root}>
      <div className={styles.title}>Создать приглашения</div>
      <div style={{ marginBottom: "20px" }}>
        <div className={styles.inviteUserContainer}>
          <SelectField
            title={"Пригласить пользователя"}
            data={userList}
            setAddressee={setAddressee}
            setUsername={setUsername}
          />
          <TextArea
            width={400}
            height={100}
            onChange={setDescription}
            autoSize={false}
            showCount={true}
            maxLength={300}
            label={"Текст приглашения"}
          />
          <button
            className={classNames(styles.inviteButton, {
              [styles.active]: !!(addressee && description),
            })}
            disabled={!(addressee && description)}
            onClick={inviteToBlogOnClick}
          >
            Отправить приглашение
          </button>
        </div>
        <div className={styles.kickUserContainer}>
          <SelectField
            title={"Выгнать автора"}
            data={blogAuthors}
            setAddressee={setKickAddressee}
            setUsername={setAuthorUsername}
          />
          <button
            className={classNames(styles.kickButton, {
              [styles.active]: !!kickAddressee,
            })}
            disabled={!kickAddressee}
            onClick={kickAuthorHandleSubmit}
          >
            Выгнать автора
          </button>
        </div>
      </div>
    </div>
  );
}
