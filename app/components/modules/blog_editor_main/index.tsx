import React from "react";

export interface Props {
  slug: string;
}

export default function BlogEditorMain({ slug }: Props) {
  return <div>{slug}</div>;
}
