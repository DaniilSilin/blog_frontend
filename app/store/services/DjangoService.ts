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
    getBlogPaginatedList: builder.query<Blog[], { limit: number }>({
      query: ({ limit }) => ({
        url: `blog/list/?page=${limit}`,
      })
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
    createBlog: builder.mutation<Blog2, undefined>({
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
    })
  })
})

export default DjangoService
