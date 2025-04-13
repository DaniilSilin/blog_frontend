import { Blog, User } from "@/app/types";

export interface InviteType {
  pk: number;
  status: boolean;
  blog: Blog;
  admin: any;
  addressee: any;
  created_at: string;
  description: string;
}
