import React from "react";
import DjangoService from "@/app/store/services/DjangoService";

import { InviteType } from "@/app/types/Invite";

import InvitationList from "./InvitationList";

import styles from "./blog_invitations.module.css";

export interface Props {
  slug: string;
}

export default function BlogInvitations({ slug }: Props) {
  const [page, setPage] = React.useState(1);
  const { data: blogInvitations, isFetching } =
    DjangoService.useBlogInvitationsQuery({
      slug,
      page,
    });

  React.useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        if (blogInvitations.next != null) {
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
      <div className={styles.title}>История приглашений</div>
      <div style={{ width: "400px", overflowY: "auto", height: "150px" }}>
        {blogInvitations?.results.map((invite: InviteType[], index: number) => (
          <InvitationList key={index} invite={invite} />
        ))}
      </div>
    </div>
  );
}
