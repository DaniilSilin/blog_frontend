import { User, Post } from "./index";

export interface NotificationType {
  pk: number;
  addressee: User;
  post: Post;
  text: string;
  author: User;
  created_at: string;
  is_read: boolean;
  is_hidden: boolean;
}
