import { Blog, Tag, User, Author, Comment } from "./index";

export interface PostType {
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
  isBookmarked: boolean;
  commentCount: number;
  comments: number;
  subscribers: number;
  isSubscribed: boolean;
  map: string;
  author_is_hidden: boolean;
  comments_allowed: boolean;
  avatar: string;
  avatar_small: string;
  banner: string;
  banner_small: string;
  is_pinned: boolean;
}
