import React from "react";
import DjangoService from "@/app/store/services/DjangoService";

import PostItem from "@/app/components/modules/post_page";

export default function PostsSearch({ hashtag }) {
  const { data: postList } = DjangoService.usePostsSearchQuery({
    hashtag: hashtag,
  });

  if (!postList) {
    return <div>wait for data</div>;
  }

  return (
    <div>
      <div style={{ fontSize: "28px" }}>#{hashtag}</div>
      <div style={{ display: "flex" }}>
        <div>{postList?.count_of_posts} постов</div>
        <div>•</div>
        <div>{postList?.count_of_blogs} блогов</div>
      </div>
      {postList?.results.map((post) => (
        <div key={post.id}>
          <PostItem post={post} />
        </div>
      ))}
    </div>
  );
}
