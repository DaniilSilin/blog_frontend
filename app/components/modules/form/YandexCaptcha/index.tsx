import React from "react";
import { SmartCaptcha } from "@yandex/smart-captcha";

export interface Props {
  setToken: (value: string) => void;
}

export default function YandexCaptcha({ setToken }: Props) {
  return (
    <div>
      <SmartCaptcha
        sitekey={"ysc1_2ZI0asoXIE1TtagkykBzdtbUyfUFUtJR9WuSJ1gK4e4cd413"}
        language={"ru"}
        onSuccess={setToken}
      />
    </div>
  );
}
