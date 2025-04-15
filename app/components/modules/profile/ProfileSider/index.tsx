import React from "react";

export interface Props {
  user: any;
}

export default function ProfileSider({ user }: Props) {
  return (
    <div>
      <div>Подписки {user.subscriptionList}</div>
      <div>
        {user.subscriptions.map((subscription: any, index: number) => (
          <div></div>
        ))}
      </div>
    </div>
  );
}
