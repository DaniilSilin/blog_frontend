import { Author, PostType } from "@/app/types";

export interface CommentType {
  id: number;
  comment_id: number;
  body: string;
  author: Author;
  post: PostType;
  created_at: string;
  likes: number;
  dislikes: number;
  date: string;
  is_edited: boolean;
  liked_by_author: boolean;
  reply_to?: number;
  count_of_replies?: number;
  forceRender?: boolean;
  is_pinned: boolean;
  isLiked: boolean;
  isDisliked: boolean;
}
