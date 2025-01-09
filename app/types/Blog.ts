import { Author, Post } from './index'

export interface Blog {
  id: number,
  avatar: any,
  title: string,
  description: string,
  slug: string,
  created_at: string,
  updated_at: string,
  count_of_posts: number,
  count_of_commentaries: number,
  subscribers: number,
  owner: string,
  pinned_post: Post,
  authors: Author[],
}