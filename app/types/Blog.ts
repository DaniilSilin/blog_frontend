import { Author } from './Author'

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
  owner: string,
  authors: Author[]
}