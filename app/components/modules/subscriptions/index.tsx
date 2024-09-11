import React from 'react'
import DjangoService from "@/app/store/services/DjangoService";

export default function Subscriptions() {
  const { data } = DjangoService.useGetSubscriptionsQuery({ username: 'admin' })

  return (



    <div>
      {data?.map((item) => (
        <div>
          {item.subscriptions?.map((item2) => (
            <div>
              <div>{item2.title}</div>
              <div>{item2.slug}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}