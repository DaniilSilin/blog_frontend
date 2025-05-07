import React from "react";
import Subscription from "@/app/components/modules/profile/ProfileSider/Subscription";

export interface Props {
  user: any;
}

export default function ProfileSider({ user }: Props) {
  return (
    <div style={{ backgroundColor: "#edeef0" }}>
      <div>Подписки {user.subscriptionList}</div>
      <div>
        {user?.subscriptions.map((subscription: any, index: number) => (
          <Subscription key={index} subscription={subscription} />
        ))}
      </div>
    </div>
  );
}
