import React from "react";
import BlogEditorInvite from "@/app/components/modules/blog_editor_invite";

interface Props {
  slug: string;
}

export default function BlogEditorInviteView({ slug }: Props) {
  return <BlogEditorInvite slug={slug} />;
}
