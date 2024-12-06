import { Blog, Tag, User } from './index'

export interface Post {
  id: number,
  title: string,
  author: string,
  body: string,
  is_published: boolean,
  created_at: string,
  likes: number,
  views: number
  post_id: number,
  isLiked: boolean,
  blog: Blog,
  tags: Tag[]
  liked_users: User[]
}