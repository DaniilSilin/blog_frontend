import { createApi, fetchBaseQuery, defaultSerializeQueryArgs } from '@reduxjs/toolkit/query/react'
import { Blog, Post, Register, Login, Author } from '@/app/types'
import { HYDRATE } from 'next-redux-wrapper'
import {GetServerSidePropsContext} from "next";
import CookieHelper from "@/app/store/cookieHelper";

const API_URL = 'http://127.0.0.1:3001/api/v1/'


const DjangoService = createApi({
  reducerPath: 'djangoService',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, api) => {
      // headers.set("Content-Type", "application/json")
      // headers.set("Content-Type", "multipart/form-data")
      const token =
      typeof window === "undefined"
        ? (api.extra as GetServerSidePropsContext).req?.cookies?.token ||
          "" // server
        : CookieHelper.getCookie("token") //client
      // const token = localStorage.getItem("authToken")
      console.log(`token`)
      console.log(token)
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
    getUserData: builder.query({
      query: () => ({
        url: `user_data/`
      })
    }),
    getBlogPaginatedList: builder.query({
      query: ({ search, sorting, after, before, page }) => ({
        url: `blog/list/`,
        params: {
          page: page,
          search: search || undefined,
          sorting: sorting || undefined,
          before: before || undefined,
          after: after || undefined
        }
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.previous = newItems.previous
        currentCache.next = newItems.next
        if (otherArgs.arg.page > 1) {
          currentCache.results.push(...newItems.results)
        } else {
          currentCache.results = newItems.results
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    getPostPaginatedList: builder.query({
      query: ({ page, sort_by, search, before, after }) => ({
        url: `post/list/`,
        params: {
          page: page || undefined,
          sort_by: sort_by || undefined,
          search: search || undefined,
          before: before || undefined,
          after: after || undefined,
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
    register: builder.mutation({
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
    createBlog: builder.mutation({
      query: ({ formData }) => ({
        url: 'blog/create/',
        method: 'POST',
        body: formData,
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
      })
    }),
    // getSubscriptions: builder.query<Blog, { username: string }>({
    //   query: ({ username }) => ({
    //     url: `${username}/subscriptions/`,
    //   })
    // }),
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
    createPost: builder.mutation({
      query: ({ title, body, is_published, map, blog, tags }) => ({
        url: `blog/${blog}/post/create/`,
        method: 'POST',
        body: { title, body, map, is_published, blog, tags },
      })
    }),
    deletePost: builder.mutation({
      query: ({ slug, post_id }) => ({
        url: `blog/${slug}/post/${post_id}/`,
        method: 'DELETE'
      })
    }),
    getBlogPosts: builder.query({
      query: ({ slug, page, sorting, search }) => ({
        url:`blog/${slug}/posts/`,
        params: {
          page: page || undefined,
          sorting: sorting || undefined,
          search: search || undefined
        }
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.previous = newItems.previous
        currentCache.next = newItems.next
        if (otherArgs.arg.page > 1) {
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
      query: ({ addressee, description, blog, admin }) => ({
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
      query: ({ slug, post_id, reply_to, body }) => ({
        url: `blog/${slug}/post/${post_id}/comment/create/`,
        method: 'POST',
        body: { body, reply_to }
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
    getMySubscriptions: builder.query({
      query: () => ({
        url: `subscriptions/`
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
      query:({ formData, username }) => ({
        url: `profile/${username}/`,
        method: 'PUT',
        body: formData,
      })
    }),
    setOrRemoveLike: builder.mutation({
      query: ({ slug, post_id}) => ({
        url: `blog/${slug}/post/${post_id}/like/`,
        method: 'POST',
      })
    }),
    setOrRemoveDislike: builder.mutation({
      query: ({ slug, post_id}) => ({
        url: `blog/${slug}/post/${post_id}/dislike/`,
        method: 'POST',
      })
    }),
    postsSearch: builder.query({
      query: ({ hashtag }) => ({
        url: `posts/search/${hashtag}/`,
        params: {
          hashtag: hashtag || undefined
        }
      })
    }),
    postsSearchData: builder.query({
      query: ({ hashtag }) => ({
        url: `posts/search_data/${hashtag}/`,
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
    addOrRemoveBookmark: builder.mutation({
      query: ({ slug, post_id }) => ({
        url: `/blog/${slug}/post/${post_id}/bookmark/`,
        method: 'POST',
      })
    }),
    deleteComment: builder.mutation({
      query: ({ slug, post_id, comment_id }) => ({
        url: `blog/${slug}/post/${post_id}/comment/${comment_id}/`,
        method: 'DELETE',
      })
    }),
    updateComment: builder.mutation({
      query: ({ slug, post_id, comment_id, body, reply_to }) => ({
        url: `blog/${slug}/post/${post_id}/comment/${comment_id}/`,
        method: 'PUT',
        body: { body, reply_to }
      })
    }),
    likedUserList: builder.query({
      query: ({ slug, post_id, page }) => ({
        url: `blog/${slug}/post/${post_id}/liked_user_list/`,
        params: {
          page: page || undefined
        }
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache = {

        }
        currentCache.results.push(...newItems.results)
        // let currentPage = 1
        // currentCache.previous = newItems.previous
        // currentCache.next = newItems.next
        // if (currentPage < otherArgs.arg.page) {
        //   currentCache.results.push(...newItems.results)
        // } else {
        //   currentCache.results = newItems.results
        // }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    postCommentList: builder.query({
      query: ({ slug, post_id, parent_id, page, sort_by }) => ({
        url: `blog/${slug}/post/${post_id}/comment/list/`,
        params: {
          page: page || undefined,
          parent_id: parent_id || undefined,
          sort_by: sort_by || undefined
        }
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const args = { ...queryArgs }
        // console.log(queryArgs)
        // console.log(args)
        delete args.page
        // console.log(args)
        // console.log(`${endpointName}${JSON.stringify(args)}`)
        return `${endpointName}(${JSON.stringify(args)})`
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.previous = newItems.previous
        currentCache.next = newItems.next
        if (otherArgs.arg.page > 1) {
          currentCache.results.push(...newItems.results)
        } else {
          currentCache.results = newItems.results
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return true
      },
    }),
    getUsers: builder.query({
      query: ({ slug, username }) => ({
        url: `invite/blog/${slug}/get_users/?query=${username}`
      })
    }),
    isUsernameAvailable: builder.query({
      query: ({ username }) => ({
        url: `${username}/available/`
      })
    }),
    changeAvatar: builder.mutation({
      query: ({ formData, username }) => ({
        url: `profile/${username}/change/avatar/`,
        method: 'PUT',
        body: formData,
      })
    }),
    blogEditorPosts: builder.query({
      query: ({ slug, state, columnType, sortOrder }) => ({
        url: `blog/${slug}/editor/posts?state=${state}`,
        params: {
          columnType: columnType || undefined,
          sortOrder: sortOrder || undefined
        }
      })
    }),
    blogsWhereUserIsOwner: builder.query({
      query: ({ username }) => ({
        url: `${username}/blogs/owner/`
      })
    }),
    blogsWhereUserIsAuthor: builder.query({
      query: ({ username }) => ({
        url: `${username}/blogs/author/`
      })
    }),
    leaveBlog: builder.mutation({
      query: ({ slug }) => ({
        url: `blog/${slug}/leave/`,
        method: 'POST'
      })
    }),
    blogInvitations: builder.query({
      query: ({ slug }) => ({
        url: `blog/${slug}/invitations/`,
      })
    }),
    blogComments: builder.query({
      query: ({ slug, page, search_query, sort_by, parent_id }) => ({
        url: `blog/${slug}/comments/`,
        params: {
          page: page || undefined,
          search_query: search_query || undefined,
          sort_by: sort_by || undefined,
          parent_id: parent_id || undefined,
        }
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const args = { ...queryArgs }
        delete args.page
        return `${endpointName}(${JSON.stringify(args)})`
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.previous = newItems.previous
        currentCache.next = newItems.next
        if (otherArgs.arg.page > 1) {
          currentCache.results.push(...newItems.results)
        } else {
          currentCache.results = newItems.results
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return true
      },
    }),
    likedPostList: builder.query({
      query: () => ({
        url: `liked_posts/`
      })
    }),
    bookmarkedPostList: builder.query({
      query: () => ({
        url: `bookmarked_posts/`
      })
    }),
    subscriptionList: builder.query({
      query: () => ({
        url: `subscriptions/`,
      })
    }),
    subscriptionListMini: builder.query({
      query: () => ({
        url: `subscriptions/mini/`
      })
    }),
    blogAuthors: builder.query({
      query: ({ slug, username }) => ({
        url: `blog/${slug}/authors/?query=${username}`
      })
    }),
    kickUser: builder.mutation({
      query: ({ slug, username }) => ({
        url: `blog/${slug}/kick/${username}/`,
        method: 'POST',
      })
    }),
    setOrRemoveCommentLike: builder.mutation({
      query: ({ slug, post_id, comment_id }) => ({
        url: `blog/${slug}/post/${post_id}/comment/${comment_id}/like/`,
        method: 'POST'
      })
    }),
    setOrRemoveCommentDislike: builder.mutation({
      query: ({ slug, post_id, comment_id }) => ({
        url: `blog/${slug}/post/${post_id}/comment/${comment_id}/dislike/`,
        method: 'POST'
      })
    }),
    setOrRemoveLikeByAuthor: builder.mutation({
      query: ({ slug, post_id, comment_id }) => ({
        url: `blog/${slug}/post/${post_id}/comment/${comment_id}/like_by_author/`,
        method: 'POST'
      })
    }),
    blogCommentListDelete: builder.mutation({
      query: ({ slug, comment_list }) => ({
        url: `blog/${slug}/comment/list/delete/`,
        method: 'DELETE',
        body: { comment_list }
      })
    }),
    updatePost: builder.mutation({
      query: ({ slug, post_id, formData }) => ({
        url: `/blog/${slug}/post/${post_id}/`,
        method: 'PUT',
        body: formData
      })
    })
  }),
})

export default DjangoService
