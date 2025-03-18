import React from "react";
import UploadImagePage from "@/app/components/modules/profile_edit/ImageChange/UploadImagePage";

export interface Props {
  username: string;
}

export default function ImageChange({ username }: Props) {
  return (
    <div>
      <UploadImagePage username={username} />
    </div>
  );
}
