const createBlogMenu = (slug: string) => {
  const BLOG_MENU = (slug: string) => [
    {
      id: 1,
      title: 'Главная',
      pathname: '/blog/[slug]',
      href: `/blog/${slug}`
    },
    {
      id: 2,
      title: 'Публикации',
      pathname: '/blog/[slug]/posts',
      href: `/blog/${slug}/posts`
    },
    {
      id: 3,
      title: 'Сообщество',
      pathname: '/blog/[slug]/playlists',
      href: `/blog/${slug}/playlists`
    }
  ]

  return BLOG_MENU(slug)
}

export default createBlogMenu