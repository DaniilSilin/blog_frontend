import { Blog, Tag, User, Author, Comment } from "./index";

export interface Post {
  id: number;
  post_id: number;
  title: string;
  author: Author;
  body: string;
  is_published: boolean;
  created_at: string;
  likes: number;
  isLiked: boolean;
  dislikes: number;
  isDisliked: boolean;
  views: number;
  blog: Blog;
  tags: Tag[];
  liked_users: User[];
  pinned_comment: Comment;
  isBookmarked: boolean;
  commentCount: number;
  comments: number;
  subscribers: number;
  isSubscribed: boolean;
  map: string;
  author_is_hidden: boolean;
  comments_allowed: boolean;
}
