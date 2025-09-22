import React from "react";
import PostsSearch from "@/app/components/modules/posts_search";

interface Props {
  hashtag: string;
}

export default function PostsSearchView({ hashtag }: Props) {
  return (
    <div>
      <PostsSearch hashtag={hashtag} />
    </div>
  );
}
