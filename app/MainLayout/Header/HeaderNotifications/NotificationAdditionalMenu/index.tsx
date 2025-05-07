import React from "react";

import { NotificationType } from "@/app/types";
import DjangoService from "@/app/store/services/DjangoService";

export interface Props {
  notification: NotificationType;
}

export default function NotificationAdditionalMenu({ notification }: Props) {
  const [hideNotification] = DjangoService.useHideNotificationMutation();

  const hideNotificationFunction = () => {
    hideNotification({ is_hidden: true });
  };

  return (
    <div>
      <div onClick={() => hideNotificationFunction()}>Скрыть уведомление</div>
    </div>
  );
}
