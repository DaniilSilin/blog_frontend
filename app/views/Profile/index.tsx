import React from "react";
import Profile from "@/app/components/modules/profile";

interface Props {
  username: string;
}

export default function ProfileView({ username }: Props) {
  return <Profile username={username} />;
}
