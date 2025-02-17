import { Blog, Tag, User, Author } from './index'

export interface Post {
  id: number,
  post_id: number,
  title: string,
  author: Author
  body: string,
  is_published: boolean,
  created_at: string,
  likes: number,
  views: number
  isLiked: boolean,
  blog: Blog,
  tags: Tag[]
  liked_users: User[]
  isBookmarked: boolean
  commentCount: number
  comments: number
}