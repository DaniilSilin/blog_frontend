import React from "react";
import ProfileEdit from "@/app/components/modules/profile_edit";

interface Props {
  username: string;
}

export default function ProfileEditView({ username }: Props) {
  return <ProfileEdit username={username} />;
}
