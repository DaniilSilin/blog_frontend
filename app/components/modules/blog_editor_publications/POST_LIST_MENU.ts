const postListMenu = (slug: string) => {
  const POST_MENU = (slug: string) => [
    {
      id: 1,
      title: 'Опубликованные',
      pathname: '/blog/[slug]/editor/publications?state=published',
      href: `/blog/${slug}/editor/publications?state=published`
    },
    {
      id: 2,
      title: 'Черновики',
      pathname: '/blog/[slug]/editor/publications?state=draft',
      href: `/blog/${slug}/editor/posts?state=draft`
    },
  ]

  return POST_MENU(slug)
}

export default postListMenu