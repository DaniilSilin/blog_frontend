import { BlogType, User } from "@/app/types";

export interface InviteType {
  pk: number;
  status: boolean;
  blog: BlogType;
  admin: any;
  addressee: any;
  created_at: string;
  description: string;
}
