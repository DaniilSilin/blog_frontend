import { PostType, User } from "./index";

export interface BlogType {
  id: number;
  avatar?: string;
  avatar_small?: string;
  banner?: string;
  banner_small?: string;
  title: string;
  description: string;
  slug: string;
  created_at: string;
  updated_at: string;
  count_of_posts: number;
  count_of_commentaries: number;
  subscribers: number;
  owner: User;
  authors: User[];
  isSubscribed: boolean;
  email?: string;
  vk_link?: string;
  telegram_link?: string;
  youtube_link?: string;
  dzen_link?: string;
  site_link?: string;
  map?: string;
  subscriberList?: number;
  views: number;
  phone_number: string;
}
