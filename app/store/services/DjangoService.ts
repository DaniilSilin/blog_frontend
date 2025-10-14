import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Login, PostType } from "@/app/types";
import { HYDRATE } from "next-redux-wrapper";
import { GetServerSidePropsContext } from "next";
import CookieHelper from "@/app/store/cookieHelper";

function getApiUrl() {
  if (typeof window === "undefined") {
    return process.env.API_URL;
  }
  return process.env.NEXT_PUBLIC_API_URL;
}

const DjangoService = createApi({
  reducerPath: "djangoService",
  tagTypes: ["Comment", "Post", "Blog", "Invite", "Notification", "Post_list"],
  baseQuery: fetchBaseQuery({
    baseUrl: getApiUrl(),
    prepareHeaders: (headers, api) => {
      const token =
        typeof window === "undefined"
          ? (api.extra as GetServerSidePropsContext).req?.cookies?.token || "" // server
          : CookieHelper.getCookie("token"); //client
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => ({
        url: `user_data/`,
      }),
    }),
    getBlogPaginatedList: builder.query({
      query: ({ search, sorting, after, before, page }) => ({
        url: `blog/list/`,
        params: {
          page: page,
          search: search || undefined,
          sorting: sorting || undefined,
          before: before || undefined,
          after: after || undefined,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.previous = newItems.previous;
        currentCache.next = newItems.next;
        if (otherArgs.arg.page > 1) {
          currentCache.results.push(...newItems.results);
        } else {
          currentCache.results = newItems.results;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result
          ? [
              // @ts-ignore
              ...result.results.map(({ slug }) => ({
                type: "Blog" as const,
                slug: slug,
              })),
              { type: "Blog", id: "LIST" },
            ]
          : [{ type: "Blog", id: "LIST" }],
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
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, otherArgs) => {
        let currentPage = 1;
        currentCache.previous = newItems.previous;
        currentCache.next = newItems.next;
        if (currentPage < otherArgs.arg.page) {
          currentCache.results.push(...newItems.results);
        } else {
          currentCache.results = newItems.results;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result
          ? [
              // @ts-ignore
              ...result.results.map(({ post_id, slug }) => ({
                type: "Post" as const,
                id: post_id,
                slug: slug,
              })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    register: builder.mutation({
      query: ({ first_name, last_name, email, username, password, token }) => ({
        url: "register/",
        method: "POST",
        body: { first_name, last_name, email, username, password, token },
      }),
    }),
    getLogin: builder.mutation<Login, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: "login/",
        method: "POST",
        body: { username, password },
      }),
    }),
    createBlog: builder.mutation({
      query: ({ formData }) => ({
        url: "blog/create/",
        method: "POST",
        body: formData,
      }),
    }),
    getBlog: builder.query({
      query: ({ slug }) => ({
        url: `blog/${slug}/`,
      }),
    }),
    deleteBlog: builder.mutation({
      query: ({ slug }) => ({
        url: `blog/${slug}/`,
        method: "DELETE",
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ formData, slug }) => ({
        url: `blog/${slug}/`,
        method: "PUT",
        body: formData,
      }),
    }),
    // getSubscriptions: builder.query<Blog, { username: string }>({
    //   query: ({ username }) => ({
    //     url: `${username}/subscriptions/`,
    //   })
    // }),
    blogSubscription: builder.mutation({
      query: ({ slug }) => ({
        url: `blog/${slug}/subscription/`,
        method: "POST",
      }),
      async onQueryStarted({ slug }, { dispatch, queryFulfilled, getState }) {
        for (const {
          endpointName,
          originalArgs,
        } of DjangoService.util.selectInvalidatedBy(getState(), [
          // @ts-ignore
          { type: "Blog", slug: slug },
        ])) {
          if (!["getBlogPaginatedList"].includes(endpointName)) continue;
          dispatch(
            DjangoService.util.updateQueryData(
              // @ts-ignore
              endpointName,
              originalArgs,
              (draft) => {
                // @ts-ignore
                const blog = draft.results.find((blog) => blog.slug === slug);
                if (blog) {
                  blog.isSubscribed = !blog.isSubscribed;
                }
              },
            ),
          );
        }
        try {
          await queryFulfilled;
        } catch {
          // patchResult.undo();
        }
      },
    }),
    subscribeBlog: builder.mutation({
      query: ({ slug }) => ({
        url: `blog/${slug}/subscribe/`,
        method: "POST",
      }),
    }),
    unsubscribeBlog: builder.mutation({
      query: ({ slug }) => ({
        url: `blog/${slug}/unsubscribe/`,
        method: "POST",
      }),
    }),
    getPost: builder.query({
      query: ({ slug, post_id }) => ({
        url: `blog/${slug}/post/${post_id}/`,
      }),
    }),
    createPost: builder.mutation({
      query: ({ formData, slug }) => ({
        url: `blog/${slug}/post/create/`,
        method: "POST",
        body: formData,
      }),
    }),
    deletePost: builder.mutation({
      query: ({ slug, post_id }) => ({
        url: `blog/${slug}/post/${post_id}/`,
        method: "DELETE",
      }),
    }),
    getBlogPosts: builder.query({
      query: ({ slug, page, sorting, search }) => ({
        url: `blog/${slug}/posts/`,
        params: {
          page: page || undefined,
          sorting: sorting || undefined,
          search: search || undefined,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.previous = newItems.previous;
        currentCache.next = newItems.next;
        if (otherArgs.arg.page > 1) {
          currentCache.results.push(...newItems.results);
        } else {
          currentCache.results = newItems.results;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result
          ? [
              // @ts-ignore
              ...result.results.map(({ post_id }) => ({
                type: "Post" as const,
                id: post_id,
              })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    inviteUserToBlog: builder.mutation({
      query: ({ addressee, description, blog, admin }) => ({
        url: "invite/create/",
        method: "POST",
        body: { addressee, description, blog, admin },
      }),
    }),
    getMyPosts: builder.query({
      query: () => ({
        url: `posts/my/`,
      }),
    }),
    acceptInvite: builder.mutation({
      query: ({ pk }) => ({
        url: `invite/${pk}/accept/`,
        method: "POST",
        body: { pk },
      }),
      async onQueryStarted({ pk }, { dispatch, queryFulfilled, getState }) {
        for (const {
          endpointName,
          originalArgs,
        } of DjangoService.util.selectInvalidatedBy(getState(), [
          { type: "Invite", id: pk },
        ])) {
          if (!["getInviteList"].includes(endpointName)) continue;
          dispatch(
            // @ts-ignore
            DjangoService.util.updateQueryData(
              // @ts-ignore
              endpointName,
              originalArgs,
              (draft) => {
                // @ts-ignore
                const invite = draft.results.find((invite) => invite.pk === pk);
                if (invite) {
                  invite.status = true;
                }
              },
            ),
          );
        }
        try {
          await queryFulfilled;
        } catch {
          // patchResult.undo();
        }
      },
    }),
    rejectInvite: builder.mutation({
      query: ({ pk }) => ({
        url: `invite/${pk}/reject/`,
        method: "POST",
        body: { pk },
      }),
      async onQueryStarted({ pk }, { dispatch, queryFulfilled, getState }) {
        for (const {
          endpointName,
          originalArgs,
        } of DjangoService.util.selectInvalidatedBy(getState(), [
          { type: "Invite", id: pk },
        ])) {
          if (!["getInviteList"].includes(endpointName)) continue;
          dispatch(
            // @ts-ignore
            DjangoService.util.updateQueryData(
              // @ts-ignore
              endpointName,
              originalArgs,
              (draft) => {
                // @ts-ignore
                const invite = draft.results.find((invite) => invite.pk === pk);
                if (invite) {
                  invite.status = false;
                }
              },
            ),
          );
        }
        try {
          await queryFulfilled;
        } catch {
          // patchResult.undo();
        }
      },
    }),
    getInviteList: builder.query({
      query: ({ page }) => ({
        url: `invite/list/`,
        params: {
          page: page || undefined,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.previous = newItems.previous;
        currentCache.next = newItems.next;
        if (otherArgs.arg.page > 1) {
          currentCache.results.push(...newItems.results);
        } else {
          currentCache.results = newItems.results;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result
          ? [
              // @ts-ignore
              ...result.results.map(({ pk }) => ({
                type: "Invite" as const,
                id: pk,
              })),
              { type: "Invite", id: "LIST" },
            ]
          : [{ type: "Invite", id: "LIST" }],
    }),
    createComment: builder.mutation({
      query: ({ slug, post_id, reply_to, body }) => ({
        url: `blog/${slug}/post/${post_id}/comment/create/`,
        method: "POST",
        body: { body, reply_to },
      }),
      async onQueryStarted(
        { post_id, slug, reply_to },
        { dispatch, queryFulfilled, getState },
      ) {
        try {
          const { data: createdComment } = await queryFulfilled;
          if (reply_to) {
            for (const {
              endpointName,
              originalArgs,
            } of DjangoService.util.selectInvalidatedBy(getState(), [
              { type: "Comment", id: reply_to },
            ])) {
              if (
                ![
                  "postCommentList",
                  "blogComments",
                  "notificationCommentList",
                ].includes(endpointName)
              )
                continue;
              dispatch(
                DjangoService.util.updateQueryData(
                  // @ts-ignore
                  endpointName,
                  originalArgs,
                  (draft) => {
                    const comment = draft.results.find(
                      (comment: any) => comment.comment_id === reply_to,
                    );
                    comment.replies_count += 1;
                    if (comment.replies_count === 1) {
                      comment.forceRender = true;
                    }
                  },
                ),
              );
            }
          }
          for (const {
            endpointName,
            originalArgs,
          } of DjangoService.util.selectInvalidatedBy(getState(), [
            { type: "Comment", id: "LIST" },
          ])) {
            if (
              ![
                "postCommentList",
                "notificationCommentList",
                "blogComments",
              ].includes(endpointName)
            )
              continue;
            if (
              originalArgs.slug !== slug ||
              originalArgs.post_id !== post_id ||
              originalArgs.parent_id !== reply_to
            )
              continue;
            dispatch(
              DjangoService.util.updateQueryData(
                // @ts-ignore
                endpointName,
                originalArgs,
                (draft) => {
                  if (!createdComment.reply_to) {
                    draft.results = [createdComment, ...draft.results];
                  } else {
                    draft.results = [createdComment, ...draft.results];
                  }
                },
              ),
            );
          }
        } catch {
          // patchResult.undo();
        }
      },
    }),
    getComment: builder.query({
      query: ({ slug, post_id, comment_id }) => ({
        url: `blog/${slug}/post/${post_id}/comment/${comment_id}/`,
      }),
    }),
    getBlogOwnerList: builder.query({
      query: () => ({
        url: `blog_owner/list/`,
      }),
    }),
    getBlogSlug: builder.query({
      query: ({ slug }) => ({
        url: `blog/${slug}/available/`,
      }),
    }),
    getMySubscriptions: builder.query({
      query: () => ({
        url: `subscriptions/`,
      }),
    }),
    getBlogAuthors: builder.query({
      query: ({ slug }) => ({
        url: `blog/${slug}/authors/`,
        method: "POST",
      }),
    }),
    userProfile: builder.query({
      query: ({ username }) => ({
        url: `profile/${username}/`,
      }),
    }),
    changeUserProfile: builder.mutation({
      query: ({ formData, username }) => ({
        url: `profile/${username}/`,
        method: "PUT",
        body: formData,
      }),
    }),
    deleteProfile: builder.mutation({
      query: ({ username }) => ({
        url: `profile/${username}/`,
      }),
    }),
    setOrRemoveLike: builder.mutation({
      query: ({ slug, post_id }) => ({
        url: `blog/${slug}/post/${post_id}/like/`,
        method: "POST",
      }),
      async onQueryStarted(
        { post_id, slug },
        { dispatch, queryFulfilled, getState },
      ) {
        for (const {
          endpointName,
          originalArgs,
        } of DjangoService.util.selectInvalidatedBy(getState(), [
          // @ts-ignore
          { type: "Post", id: post_id, slug: slug },
        ])) {
          if (
            ![
              "getBlogPosts",
              "likedPostList",
              "bookmarkedPostList",
              "getPostPaginatedList",
              "subscriptionList",
              "postsSearch",
            ].includes(endpointName)
          )
            continue;
          dispatch(
            DjangoService.util.updateQueryData(
              // @ts-ignore
              endpointName,
              originalArgs,
              (draft) => {
                const post = draft.results.find(
                  // @ts-ignore
                  (post) => post.post_id === post_id && post.blog.slug === slug,
                );
                if (post) {
                  if (post.isDisliked) {
                    post.isDisliked = false;
                    post.dislikes -= 1;
                  }
                  if (post.isLiked) {
                    post.isLiked = false;
                    post.likes -= 1;
                  } else {
                    post.isLiked = true;
                    post.likes += 1;
                  }
                }
              },
            ),
          );
        }
        try {
          await queryFulfilled;
        } catch {
          // patchResult.undo();
        }
      },
    }),
    setOrRemoveDislike: builder.mutation({
      query: ({ slug, post_id }) => ({
        url: `blog/${slug}/post/${post_id}/dislike/`,
        method: "POST",
      }),
      async onQueryStarted(
        { post_id, slug },
        { dispatch, queryFulfilled, getState },
      ) {
        for (const {
          endpointName,
          originalArgs,
        } of DjangoService.util.selectInvalidatedBy(getState(), [
          // @ts-ignore
          { type: "Post", id: post_id, slug: slug },
        ])) {
          if (
            ![
              "getBlogPosts",
              "likedPostList",
              "bookmarkedPostList",
              "getPostPaginatedList",
              "subscriptionList",
              "postsSearch",
            ].includes(endpointName)
          )
            continue;
          dispatch(
            DjangoService.util.updateQueryData(
              // @ts-ignore
              endpointName,
              originalArgs,
              (draft) => {
                const post = draft.results.find(
                  // @ts-ignore
                  (post) => post.post_id === post_id && post.blog.slug === slug,
                );
                if (post) {
                  if (post.isLiked) {
                    post.isLiked = false;
                    post.likes -= 1;
                  }
                  if (post.isDisliked) {
                    post.isDisliked = false;
                    post.dislikes -= 1;
                  } else {
                    post.isDisliked = true;
                    post.dislikes += 1;
                  }
                }
              },
            ),
          );
        }
        try {
          await queryFulfilled;
        } catch {
          // patchResult.undo();
        }
      },
    }),
    postsSearch: builder.query({
      query: ({ hashtag, page }) => ({
        url: `posts/search/${hashtag}/`,
        params: {
          page: page || undefined,
          hashtag: hashtag || undefined,
        },
      }),
    }),
    postsSearchData: builder.query({
      query: ({ hashtag }) => ({
        url: `posts/search_data/${hashtag}/`,
      }),
    }),
    blogPublications: builder.query({
      query: ({ state, slug }) => ({
        url: `blog/${slug}/publications/`,
        params: {
          state: state || undefined,
        },
      }),
    }),
    addOrRemoveBookmark: builder.mutation({
      query: ({ slug, post_id }) => ({
        url: `/blog/${slug}/post/${post_id}/bookmark/`,
        method: "POST",
      }),
      async onQueryStarted(
        { slug, post_id },
        { dispatch, queryFulfilled, getState },
      ) {
        for (const {
          endpointName,
          originalArgs,
        } of DjangoService.util.selectInvalidatedBy(getState(), [
          // @ts-ignore
          { type: "Post", id: post_id, slug: slug },
        ])) {
          if (
            ![
              "getPostPaginatedList",
              "subscriptionList",
              "getBlogPosts",
              "likedPostList",
            ].includes(endpointName)
          )
            continue;
          dispatch(
            DjangoService.util.updateQueryData(
              // @ts-ignore
              endpointName,
              originalArgs,
              (draft) => {
                const post = draft.results.find(
                  // @ts-ignore
                  (post) => post.post_id === post_id && post.blog.slug === slug,
                );
                if (post) {
                  post.isBookmarked = !post.isBookmarked;
                }
              },
            ),
          );
        }
        try {
          await queryFulfilled;
        } catch {
          // patchResult.undo();
        }
      },
    }),
    deleteComment: builder.mutation({
      query: ({ slug, post_id, comment_id }) => ({
        url: `blog/${slug}/post/${post_id}/comment/${comment_id}/`,
        method: "DELETE",
      }),
      async onQueryStarted(
        { comment_id },
        { dispatch, queryFulfilled, getState },
      ) {
        for (const {
          endpointName,
          originalArgs,
        } of DjangoService.util.selectInvalidatedBy(getState(), [
          { type: "Comment", id: comment_id },
        ])) {
          if (!["postCommentList", "blogComments"].includes(endpointName))
            continue;
          dispatch(
            DjangoService.util.updateQueryData(
              // @ts-ignore
              endpointName,
              originalArgs,
              (draft) => {
                const comment = draft.results.find(
                  // @ts-ignore
                  (comment) => comment.comment_id === comment_id,
                );
                if (comment) {
                  draft.results = draft.results.filter(
                    // @ts-ignore
                    (comment) => comment.comment_id !== comment_id,
                  );
                }
              },
            ),
          );
        }
        try {
          await queryFulfilled;
        } catch {
          // patchResult.undo();
        }
      },
    }),
    pinComment: builder.mutation({
      query: ({ slug, post_id, comment_id }) => ({
        url: `blog/${slug}/post/${post_id}/comment/${comment_id}/pin/`,
        method: "POST",
      }),
      async onQueryStarted(
        { comment_id, body },
        { dispatch, queryFulfilled, getState },
      ) {
        for (const {
          endpointName,
          originalArgs,
        } of DjangoService.util.selectInvalidatedBy(getState(), [
          { type: "Comment", id: comment_id },
        ])) {
          if (!["postCommentList"].includes(endpointName)) continue;
          dispatch(
            DjangoService.util.updateQueryData(
              // @ts-ignore
              endpointName,
              originalArgs,
              (draft) => {
                const comment = draft.results.find(
                  // @ts-ignore
                  (comment) => comment.comment_id === comment_id,
                );
                console.log(comment);
                if (comment) {
                  comment.is_pinned = true;
                  comment.pinned_by_user = "admin";
                  draft.results = [comment, ...draft.results];
                }
              },
            ),
          );
        }
        try {
          await queryFulfilled;
        } catch {
          // patchResult.undo();
        }
      },
    }),
    updateComment: builder.mutation({
      query: ({ slug, post_id, comment_id, body, reply_to }) => ({
        url: `blog/${slug}/post/${post_id}/comment/${comment_id}/`,
        method: "PUT",
        body: { body, reply_to },
      }),
      async onQueryStarted(
        { comment_id, body },
        { dispatch, queryFulfilled, getState },
      ) {
        for (const {
          endpointName,
          originalArgs,
        } of DjangoService.util.selectInvalidatedBy(getState(), [
          { type: "Comment", id: comment_id },
        ])) {
          if (!["postCommentList", "blogComments"].includes(endpointName))
            continue;
          dispatch(
            DjangoService.util.updateQueryData(
              // @ts-ignore
              endpointName,
              originalArgs,
              (draft) => {
                const comment = draft.results.find(
                  // @ts-ignore
                  (comment) => comment.comment_id === comment_id,
                );
                if (comment) {
                  comment.body = body;
                  comment.is_edited = true;
                }
              },
            ),
          );
        }
        try {
          await queryFulfilled;
        } catch {
          // patchResult.undo();
        }
      },
    }),
    likedUserList: builder.query({
      query: ({ slug, post_id, page }) => ({
        url: `blog/${slug}/post/${post_id}/liked_user_list/`,
        params: {
          page: page || undefined,
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const args = { ...queryArgs };
        delete args.page;
        return `${endpointName}(${JSON.stringify(args)})`;
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.previous = newItems.previous;
        currentCache.next = newItems.next;
        if (otherArgs.arg.page > 1) {
          currentCache.results.push(...newItems.results);
        } else {
          currentCache.results = newItems.results;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return true;
      },
    }),
    getUsers: builder.query({
      query: ({ slug, username }) => ({
        url: `invite/blog/${slug}/get_users/?query=${username}`,
      }),
    }),
    isUsernameAvailable: builder.query({
      query: ({ username }) => ({
        url: `${username}/available/`,
      }),
    }),
    changeAvatar: builder.mutation({
      query: ({ formData, username }) => ({
        url: `profile/${username}/change/avatar/`,
        method: "PUT",
        body: formData,
      }),
    }),
    blogEditorPosts: builder.query({
      query: ({ slug, currentPostListType, columnType, sortOrder }) => ({
        url: `blog/${slug}/editor/posts?state=${currentPostListType}`,
        params: {
          columnType: columnType || undefined,
          sortOrder: sortOrder || undefined,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              // @ts-ignore
              ...result.results.map(({ post_id, slug }) => ({
                type: "Post" as const,
                id: post_id,
                slug: slug,
              })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    blogDeletePosts: builder.mutation({
      query: ({ slug, selectedPosts }) => ({
        url: `blog/${slug}/posts/delete/`,
        method: "DELETE",
        body: { selectedPosts },
      }),
      async onQueryStarted(
        { slug, selectedPosts },
        { dispatch, queryFulfilled, getState },
      ) {
        for (const { post_id } of selectedPosts) {
          console.log(post_id);
          for (const {
            endpointName,
            originalArgs,
          } of DjangoService.util.selectInvalidatedBy(getState(), [
            // @ts-ignore
            { type: "Post", id: post_id, slug: slug },
          ])) {
            if (
              ![
                "getPostPaginatedList",
                "subscriptionList",
                "getBlogPosts",
                "likedPostList",
                "blogEditorPosts",
              ].includes(endpointName)
            )
              continue;

            dispatch(
              DjangoService.util.updateQueryData(
                // @ts-ignore
                endpointName,
                originalArgs,
                (draft) => {
                  draft.results = draft.results.filter(
                    (post: PostType) =>
                      post.post_id !== post_id || post.blog.slug !== slug,
                  );
                },
              ),
            );
          }
          try {
            await queryFulfilled;
          } catch {
            // patchResult.undo();
          }
        }
      },
    }),
    blogsWhereUserIsOwner: builder.query({
      query: ({ username }) => ({
        url: `${username}/blogs/owner/`,
      }),
    }),
    blogsWhereUserIsAuthor: builder.query({
      query: ({ username }) => ({
        url: `${username}/blogs/author/`,
      }),
    }),
    leaveBlog: builder.mutation({
      query: ({ slug }) => ({
        url: `blog/${slug}/leave/`,
        method: "POST",
      }),
    }),
    blogInvitations: builder.query({
      query: ({ slug, page }) => ({
        url: `blog/${slug}/invitations/`,
        params: {
          page: page || undefined,
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const args = { ...queryArgs };
        delete args.page;
        return `${endpointName}(${JSON.stringify(args)})`;
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.previous = newItems.previous;
        currentCache.next = newItems.next;
        if (otherArgs.arg.page > 1) {
          currentCache.results.push(...newItems.results);
        } else {
          currentCache.results = newItems.results;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return true;
      },
    }),
    blogComments: builder.query({
      query: ({ slug, page, search_query, sort_by, parent_id }) => ({
        url: `blog/${slug}/comments/`,
        params: {
          page: page || undefined,
          search_query: search_query || undefined,
          sort_by: sort_by || undefined,
          parent_id: parent_id || undefined,
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const args = { ...queryArgs };
        delete args.page;
        return `${endpointName}(${JSON.stringify(args)})`;
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.previous = newItems.previous;
        currentCache.next = newItems.next;
        if (otherArgs.arg.page > 1) {
          currentCache.results.push(...newItems.results);
        } else {
          currentCache.results = newItems.results;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return true;
      },
      providesTags: (result) =>
        result
          ? [
              // @ts-ignore
              ...result.results.map(({ comment_id }) => ({
                type: "Comment" as const,
                id: comment_id,
              })),
              { type: "Comment", id: "LIST" },
            ]
          : [{ type: "Comment", id: "LIST" }],
    }),
    likedPostList: builder.query({
      query: ({ page }) => ({
        url: `liked_posts/`,
        params: {
          page: page || undefined,
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const args = { ...queryArgs };
        delete args.page;
        return `${endpointName}(${JSON.stringify(args)})`;
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.previous = newItems.previous;
        currentCache.next = newItems.next;
        if (otherArgs.arg.page > 1) {
          currentCache.results.push(...newItems.results);
        } else {
          currentCache.results = newItems.results;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return true;
      },
      providesTags: (result) =>
        result
          ? [
              // @ts-ignore
              ...result.results.map(({ post_id, slug }) => ({
                type: "Post" as const,
                id: post_id,
                slug: slug,
              })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    bookmarkedPostList: builder.query({
      query: ({ page }) => ({
        url: `bookmarked_posts/`,
        params: {
          page: page || undefined,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, otherArgs) => {
        let currentPage = 1;
        currentCache.previous = newItems.previous;
        currentCache.next = newItems.next;
        if (currentPage < otherArgs.arg.page) {
          currentCache.results.push(...newItems.results);
        } else {
          currentCache.results = newItems.results;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result
          ? [
              // @ts-ignore
              ...result.results.map(({ post_id, slug }) => ({
                type: "Post" as const,
                id: post_id,
                slug: slug,
              })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    subscriptionList: builder.query({
      query: ({ page, after, before, sort_by, search }) => ({
        url: `subscriptions/`,
        params: {
          page: page || undefined,
          after: after || undefined,
          before: before || undefined,
          sort_by: sort_by || undefined,
          search: search || undefined,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, otherArgs) => {
        let currentPage = 1;
        currentCache.previous = newItems.previous;
        currentCache.next = newItems.next;
        if (currentPage < otherArgs.arg.page) {
          currentCache.results.push(...newItems.results);
        } else {
          currentCache.results = newItems.results;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result
          ? [
              // @ts-ignore
              ...result.results.map(({ post_id, slug }) => ({
                type: "Post" as const,
                id: post_id,
                slug: slug,
              })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    subscriptionListMini: builder.query({
      query: () => ({
        url: `subscriptions/mini/`,
      }),
    }),
    blogAuthors: builder.query({
      query: ({ slug, username }) => ({
        url: `blog/${slug}/authors/?query=${username}`,
      }),
    }),
    kickUser: builder.mutation({
      query: ({ slug, username }) => ({
        url: `blog/${slug}/kick/${username}/`,
        method: "POST",
      }),
    }),
    postCommentList: builder.query({
      query: ({ slug, post_id, parent_id, page, sort_by }) => ({
        url: `blog/${slug}/post/${post_id}/comment/list/`,
        params: {
          page: page || undefined,
          parent_id: parent_id || undefined,
          sort_by: sort_by || undefined,
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const args = { ...queryArgs };
        delete args.page;
        return `${endpointName}(${JSON.stringify(args)})`;
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.previous = newItems.previous;
        currentCache.next = newItems.next;
        if (otherArgs.arg.page > 1) {
          currentCache.results.push(...newItems.results);
        } else {
          currentCache.results = newItems.results;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return true;
      },
      providesTags: (result) =>
        result
          ? [
              // @ts-ignore
              ...result.results.map(({ comment_id }) => ({
                type: "Comment" as const,
                id: comment_id,
              })),
              { type: "Comment", id: "LIST" },
            ]
          : [{ type: "Comment", id: "LIST" }],
    }),
    setOrRemoveCommentLike: builder.mutation({
      query: ({ slug, post_id, comment_id }) => ({
        url: `blog/${slug}/post/${post_id}/comment/${comment_id}/like/`,
        method: "POST",
      }),
      async onQueryStarted(
        { comment_id },
        { dispatch, queryFulfilled, getState },
      ) {
        for (const {
          endpointName,
          originalArgs,
        } of DjangoService.util.selectInvalidatedBy(getState(), [
          { type: "Comment", id: comment_id },
        ])) {
          if (
            ![
              "postCommentList",
              "blogComments",
              "notificationCommentList",
            ].includes(endpointName)
          )
            continue;
          dispatch(
            DjangoService.util.updateQueryData(
              // @ts-ignore
              endpointName,
              originalArgs,
              (draft) => {
                const comment = draft.results.find(
                  // @ts-ignore
                  (comment) => comment.comment_id === comment_id,
                );
                console.log(comment);
                if (comment) {
                  if (comment.isDisliked) {
                    comment.isDisliked = false;
                    comment.dislikes -= 1;
                  }
                  if (comment.isLiked) {
                    comment.isLiked = false;
                    comment.likes -= 1;
                  } else {
                    comment.isLiked = true;
                    comment.likes += 1;
                  }
                }
              },
            ),
          );
        }
        try {
          await queryFulfilled;
        } catch {
          // patchResult.undo();
        }
      },
    }),
    setOrRemoveCommentDislike: builder.mutation({
      query: ({ slug, post_id, comment_id }) => ({
        url: `blog/${slug}/post/${post_id}/comment/${comment_id}/dislike/`,
        method: "POST",
      }),
      async onQueryStarted(
        { comment_id },
        { dispatch, queryFulfilled, getState },
      ) {
        for (const {
          endpointName,
          originalArgs,
        } of DjangoService.util.selectInvalidatedBy(getState(), [
          { type: "Comment", id: comment_id },
        ])) {
          if (
            ![
              "postCommentList",
              "blogComments",
              "notificationCommentList",
            ].includes(endpointName)
          )
            continue;
          dispatch(
            DjangoService.util.updateQueryData(
              // @ts-ignore
              endpointName,
              originalArgs,
              (draft) => {
                const comment = draft.results.find(
                  // @ts-ignore
                  (comment) => comment.comment_id === comment_id,
                );
                if (comment) {
                  if (comment.isLiked) {
                    comment.isLiked = false;
                    comment.likes -= 1;
                  }
                  if (comment.isDisliked) {
                    comment.isDisliked = false;
                    comment.dislikes -= 1;
                  } else {
                    comment.isDisliked = true;
                    comment.dislikes += 1;
                  }
                }
              },
            ),
          );
        }
        try {
          await queryFulfilled;
        } catch {
          // patchResult.undo();
        }
      },
    }),
    setOrRemoveLikeByAuthor: builder.mutation({
      query: ({ slug, post_id, comment_id }) => ({
        url: `blog/${slug}/post/${post_id}/comment/${comment_id}/like_by_author/`,
        method: "POST",
      }),
      async onQueryStarted(
        { comment_id },
        { dispatch, queryFulfilled, getState },
      ) {
        for (const {
          endpointName,
          originalArgs,
        } of DjangoService.util.selectInvalidatedBy(getState(), [
          { type: "Comment", id: comment_id },
        ])) {
          if (
            ![
              "postCommentList",
              "blogComments",
              "notificationCommentList",
            ].includes(endpointName)
          )
            continue;
          dispatch(
            DjangoService.util.updateQueryData(
              // @ts-ignore
              endpointName,
              originalArgs,
              (draft) => {
                const comment = draft.results.find(
                  // @ts-ignore
                  (comment) => comment.comment_id === comment_id,
                );
                if (comment) {
                  comment.liked_by_author =
                    comment.liked_by_author.toString() !== "true";
                }
              },
            ),
          );
        }
      },
    }),
    subscribeOrUnsubscribeBlog: builder.mutation({
      query: ({ slug }) => ({
        url: `blog/${slug}/subscribe/`,
        method: "POST",
      }),
      async onQueryStarted(
        { comment_id },
        { dispatch, queryFulfilled, getState },
      ) {
        for (const {
          endpointName,
          originalArgs,
        } of DjangoService.util.selectInvalidatedBy(getState(), [
          { type: "Post", id: comment_id },
        ])) {
          if (!["postCommentList", "blogComments"].includes(endpointName))
            continue;
          dispatch(
            DjangoService.util.updateQueryData(
              // @ts-ignore
              endpointName,
              originalArgs,
              (draft) => {
                const comment = draft.results.find(
                  // @ts-ignore
                  (comment) => comment.comment_id === comment_id,
                );
                if (comment) {
                  comment.liked_by_author =
                    comment.liked_by_author.toString() !== "true";
                }
              },
            ),
          );
        }
      },
    }),
    blogCommentListDelete: builder.mutation({
      query: ({ slug, comment_list }) => ({
        url: `blog/${slug}/comment/list/delete/`,
        method: "DELETE",
        body: { comment_list },
      }),
    }),
    updatePost: builder.mutation({
      query: ({
        slug,
        post_id,
        title,
        body,
        map,
        tags,
        is_published,
        author_is_hidden,
        comments_allowed,
      }) => ({
        url: `/blog/${slug}/post/${post_id}/`,
        method: "PUT",
        body: {
          title,
          body,
          map,
          tags,
          is_published,
          author_is_hidden,
          comments_allowed,
        },
      }),
    }),
    notificationList: builder.query({
      query: ({ username, page }) => ({
        url: `profile/${username}/notification/list/`,
        params: {
          page: page || undefined,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.previous = newItems.previous;
        currentCache.next = newItems.next;
        if (otherArgs.arg.page > 1) {
          currentCache.results.push(...newItems.results);
        } else {
          currentCache.results = newItems.results;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return true;
      },
    }),
    postCommentListReply: builder.query({
      query: ({ slug, post_id, parent_id, page, comment_reply }) => ({
        url: `blog/${slug}/post/${post_id}/comment/list/reply`,
        params: {
          page: page || undefined,
          parent_id: parent_id || undefined,
          comment_reply: comment_reply || undefined,
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const args = { ...queryArgs };
        delete args.page;
        return `${endpointName}(${JSON.stringify(args)})`;
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.previous = newItems.previous;
        currentCache.next = newItems.next;
        if (otherArgs.arg.page > 1) {
          currentCache.results.push(...newItems.results);
        } else {
          currentCache.results = newItems.results;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return true;
      },
      providesTags: (result) =>
        result
          ? [
              // @ts-ignore
              ...result.results.map(({ comment_id }) => ({
                type: "Comment" as const,
                id: comment_id,
              })),
              { type: "Comment", id: "LIST" },
            ]
          : [{ type: "Comment", id: "LIST" }],
    }),
    readNotification: builder.mutation({
      query: ({ id }) => ({
        url: `/notification/${id}/is_read/`,
        method: "POST",
      }),
    }),
    hideNotification: builder.mutation({
      query: ({ id }) => ({
        url: `/notification/${id}/hide/`,
        method: "POST",
      }),
    }),
    notificationCommentList: builder.query({
      query: ({ slug, post_id, parent_id, page }) => ({
        url: `blog/${slug}/post/${post_id}/comment/list/reply/`,
        params: {
          page: page || undefined,
          parent_id: parent_id || undefined,
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const args = { ...queryArgs };
        delete args.page;
        return `${endpointName}(${JSON.stringify(args)})`;
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.previous = newItems.previous;
        currentCache.next = newItems.next;
        if (otherArgs.arg.page > 1) {
          currentCache.results.push(...newItems.results);
        } else {
          currentCache.results = newItems.results;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return true;
      },
      providesTags: (result) =>
        result
          ? [
              // @ts-ignore
              ...result.results.map(({ comment_id }) => ({
                type: "Comment" as const,
                id: comment_id,
              })),
              { type: "Comment", id: "LIST" },
            ]
          : [{ type: "Comment", id: "LIST" }],
    }),
  }),
});

export default DjangoService;
