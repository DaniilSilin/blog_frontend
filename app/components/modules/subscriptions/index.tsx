import React from 'react'
import DjangoService from "@/app/store/services/DjangoService"
import PostItem from "@/app/components/modules/post_page"

export default function Subscriptions() {
  const { data: subscriptionList, isLoading, isFetching } = DjangoService.useSubscriptionListQuery({ })

  if (isLoading) return <div>Загрузка</div>

  return (
    <div>
      <h1>Подписки</h1>
      {subscriptionList?.results.map((post, index: number) => (
          <PostItem key={index} post={post} />
      ))}
    </div>
  )
}