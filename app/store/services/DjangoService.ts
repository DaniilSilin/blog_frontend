import { createApi, fetchBaseQuery, defaultSerializeQueryArgs } from '@reduxjs/toolkit/query/react'
import { Blog, Post, Register, Login, Author } from '@/app/types'
import { HYDRATE } from 'next-redux-wrapper'

const API_URL = 'http://localhost:3001/api/v1/'


const DjangoService = createApi({
  reducerPath: 'djangoService',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, api) => {
      headers.set("Content-Type", "application/json")
      // headers.set("Content-Type", "multipart/form-data")
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
    getBlogPaginatedList: builder.query<Blog[], { limit: number, search: string, order: string[], after: string, before: string, page: number }>({
      query: ({ limit, search, order, after, before, page }) => ({
        url: `blog/list/?page=${limit}`,
        params: {
          page: page || undefined,
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
    getLogin: builder.mutation<Login, { username: string, password: string }>({
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
    createBlog: builder.mutation({
      query: ({ formData }) => ({
        url: 'blog/create/',
        method: 'POST',
        body: formData,
        formData: true,
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
    updateBlog: builder.mutation<Blog>({
      query: ({ formData, slug }) => ({
        url: `blog/${slug}/`,
        method: 'PUT',
        body: formData,
        formData: true
      })
    }),
    getSubscriptions: builder.query<Blog, { username: string }>({
      query: ({ username }) => ({
        url: `${username}/subscriptions/`,
      })
    }),
    subscribeBlog: builder.mutation({
      query: ({ slug }) => ({
        url: `blog/${slug}/subscribe/`,
        method: 'POST',
      })
    }),
    unsubscribeBlog: builder.mutation({
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
      query: ({ formData, slug }) => ({
        url: `blog/${slug}/post/create/`,
        method: 'POST',
        body: formData,
        formData: true
      })
    }),
    deletePost: builder.mutation({
      query: ({ slug, post_id }) => ({
        url: `blog/${slug}/post/${post_id}/`,
        method: 'DELETE'
      })
    }),
    getBlogPosts: builder.query({
      query: ({ slug, page, sorting }) => ({
        url:`blog/${slug}/posts/`,
        params: {
          page: page || undefined,
          sorting: sorting || undefined
        }
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems, otherArgs) => {
        let currentPage = 1
        currentCache.previous = newItems.previous
        currentCache.next = newItems.next
        if (currentPage < otherArgs.arg.page) {
          currentCache.results.push(...newItems.results)
        } else {
          currentCache.results = newItems.results
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
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
      query: ({ slug, post_id, reply_to_1, body }) => ({
        url: `blog/${slug}/post/${post_id}/comment/create/`,
        method: 'POST',
        body: { body, reply_to_1 }
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
    getUsers: builder.query({
      query: ({ username }) => ({
        url: `invite/get_users/${username}/`
      })
    }),
    getMySubscriptions: builder.query({
      query: () => ({
        url: `subscriptions/`
      })
    }),
    kickUser: builder.mutation({
      query: ({ slug, username }) => ({
        url: `blog/${slug}/kick/${username}/`,
        method: 'POST',
      })
    }),
    getBlogAuthors: builder.query({
      query:({ slug }) => ({
        url: `blog/${slug}/authors/`,
        method: 'POST',
      })
    }),
    userProfile: builder.query({
      query:({ username }) => ({
        url: `profile/${username}/`,
      })
    }),
    changeUserProfile: builder.mutation({
      query:({ formData, usernameState }) => ({
        url: `profile/${usernameState}/change/`,
        method: 'POST',
        body: formData,
        formData: true,
      })
    }),
    setLike: builder.mutation({
      query: ({ slug, post_id}) => ({
        url: `blog/${slug}/post/${post_id}/like/add/`,
        method: 'POST',
      })
    }),
    removeLike: builder.mutation({
      query: ({ slug, post_id}) => ({
        url: `blog/${slug}/post/${post_id}/like/remove/`,
        method: 'POST',
      })
    }),
    postsSearch: builder.query({
      query: ({ hashtag }) => ({
        url: `posts/search/`,
        params: {
          hashtag: hashtag || undefined
        }
      })
    }),
    blogPublications: builder.query({
      query: ({ state, slug }) => ({
        url: `blog/${slug}/publications/`,
        params: {
          state: state || undefined
        }
      })
    }),
    postCommentList: builder.query({
      query: ({ slug, post_id, page, sortBy }) => ({
        url: `blog/${slug}/post/${post_id}/comments/`,
        params: {
          page: page || undefined,
          sortBy: sortBy || undefined
        }
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.next = newItems.next
        currentCache.previous = newItems.previous
        currentCache.results.push(...newItems.results)
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    postCommentReplyList: builder.query({
      query: ({ slug, post_id, comment_id }) => ({
        url: `blog/${slug}/post/${post_id}/comment/${comment_id}/replies/`
      }),
    })
  }),
})

export default DjangoService
