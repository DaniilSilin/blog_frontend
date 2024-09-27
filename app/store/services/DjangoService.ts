import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Blog, Post, Register, Login, Author } from '@/app/types'
import { HYDRATE } from 'next-redux-wrapper'

const API_URL = 'http://localhost:3001/api/v1/'


const DjangoService = createApi({
  reducerPath: 'djangoService',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, api) => {
      headers.set("Content-Type", "application/json")
      const token = localStorage.getItem("authToken")
      if (token) {
        headers.set('Authorization', `Token ${token}`)
      }
      return headers
    }
  }),
  extractRehydrationInfo(action, { reducerPath }) {
  if (action.type === HYDRATE) {
    return action.payload[reducerPath]
  }
},
  endpoints: builder => ({
    getBlogPaginatedList: builder.query<Blog[], { limit: number, search: string, order: string[] }>({
      query: ({ limit, search, order, after, before }) => ({
        url: `blog/list/?page=${limit}`,
        params: {
          search: search || undefined,
          order: order || undefined,
          before: before || undefined,
          after: after || undefined
        }
      }),
    }),
    getPostPaginatedList: builder.query<Post[], { limit: number }>({
      query: ({ limit }) => ({
        url: `post/list/?page=${limit}`
      })
    }),
    getRegister: builder.mutation<Register>({
      query: ({ email, username, password }) => ({
        url: 'register/',
        method: 'POST',
        body: {email, username, password},
      })
    }),
    getLogin: builder.mutation<Login>({
      query: ({ username, password }) => ({
        url: 'login/',
        method: 'POST',
        body: { username, password }
      })
    }),
    getLogout: builder.mutation({
      query: () => ({
        url: 'logout/',
        method: 'POST'
      })
    }),
    createBlog: builder.mutation<Blog, undefined>({
      query: ({ title, slug, description, authors }) => ({
        url: 'blog/create/',
        method: 'POST',
        body: { title, slug, description, authors },
      })
    }),
    getBlog: builder.query<Blog, {slug: string}>({
      query: ({ slug }) => ({
        url: `blog/${slug}/`,
      })
    }),
    deleteBlog: builder.mutation<Blog, {slug: string}>({
      query: ({ slug }) => ({
        url: `blog/${slug}/`,
        method: 'DELETE',
      })
    }),
    updateBlog: builder.mutation<Blog, {slug: string}>({
      query: ({ slug, title, description, authors }) => ({
        url: `blog/${slug}/`,
        method: 'PUT',
        body: { title, description, authors }
      })
    }),
    getSubscriptions: builder.query<Blog, { username: string }>({
      query: ({ username }) => ({
        url: `${username}/subscriptions/`,
      })
    }),
    subscribeBlog: builder.mutation<{ slug: string }>({
      query: ({ slug }) => ({
        url: `blog/${slug}/subscribe/`,
        method: 'POST',
      })
    }),
    unsubscribeBlog: builder.mutation<{ slug: string }>({
      query: ({ slug }) => ({
        url: `blog/${slug}/unsubscribe/`,
        method: 'POST',
      })
    }),
    getPost: builder.query<Post, { slug: string, post_id: number}>({
      query: ({ slug, post_id }) => ({
        url: `blog/${slug}/post/${post_id}/`
      })
    }),
    getUserData: builder.query({
      query: () => ({
        url: `user_data/`
      })
    }),
    createPost: builder.mutation({
      query: ({ title, body, is_published, blog, tags }) => ({
        url: `blog/${blog}/post/create/`,
        method: 'POST',
        body: { title, body, is_published, blog, tags }
      })
    }),
    getBlogPosts: builder.query({
      query: ({ slug }) => ({
        url: `blog/${slug}/posts/`,
      })
    }),
    inviteUserToBlog: builder.mutation({
      query: ({ addressee, description, blog, admin}) => ({
        url: 'invite/create/',
        method: 'POST',
        body: { addressee, description, blog, admin }
      })
    }),
    getInviteList: builder.query({
      query: () => ({
        url: `invite/list/`,
      })
    }),
    getMyPosts: builder.query({
      query: () => ({
        url: `posts/my/`,
      })
    }),
    acceptInvite: builder.mutation({
      query: ({ pk }) => ({
        url: `invite/${pk}/accept/`,
        method: 'POST',
        body: { pk }
      })
    }),
    createComment: builder.mutation({
      query: ({ slug, post_id, body }) => ({
        url: `blog/${slug}/post/${post_id}/comment/create/`,
        method: 'POST',
        body: { body }
      })
    }),
    getComment: builder.query({
      query: ({ slug, post_id, comment_id }) => ({
        url: `blog/${slug}/post/${post_id}/comment/${comment_id}/`,
      })
    }),
    getBlogOwnerList: builder.query({
      query: () => ({
        url: `blog_owner/list/`,
      })
    }),
    getBlogSlug: builder.query({
      query: ({ slug }) => ({
        url: `blog/${slug}/available/`,
      })
    }),
  })
})

export default DjangoService
