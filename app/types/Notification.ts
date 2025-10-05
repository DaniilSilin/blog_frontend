import { User, PostType } from "./index";

export interface NotificationType {
  id: number;
  addressee: User;
  post: PostType;
  text: string;
  author: User;
  created_at: string;
  is_read: boolean;
  is_hidden: boolean;
}
