import { Author } from "@/app/types/Author";

export interface Comment {
  id: number;
  comment_id: number;
  body: string;
  author: Author;
  created_at: string;
  likes: number;
  dislikes: number;
  date: string;
  is_edited: boolean;
  is_liked_by_author: boolean;
  reply_to?: number;
  count_of_replies?: number;
}
