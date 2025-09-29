import React from "react";
import { SmartCaptcha } from "@yandex/smart-captcha";

export interface Props {
  setToken: (value: string) => void;
}

export default function YandexCaptcha({ setToken }: Props) {
  return (
    <div>
      <SmartCaptcha
        sitekey={process.env.NEXT_PUBLIC_YANDEX_CAPTCHA || ""}
        language={"ru"}
        onSuccess={setToken}
      />
    </div>
  );
}
