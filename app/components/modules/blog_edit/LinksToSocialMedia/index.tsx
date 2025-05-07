import React from "react";
import { UpdateInput } from "@/app/components/modules/form";

export interface Props {
  initialVkLink: any;
  vkLinkError: string;
  vkLink: any;
  setVkLink: (value: string) => void;
  initialTelegramLink: any;
  telegramLinkError: string;
  telegramLink: any;
  setTelegramLink: (value: string) => void;
  initialYoutubeLink: any;
  youtubeLinkError: string;
  youtubeLink: any;
  setYoutubeLink: (value: string) => void;
  initialDzenLink: any;
  dzenLinkError: string;
  dzenLink: any;
  setDzenLink: (value: string) => void;
  initialOwnSiteLink: any;
  ownSiteLinkError: string;
  ownSiteLink: any;
  setOwnSiteLink: (value: string) => void;
}

export default function LinksToSocialMedia({
  initialVkLink,
  vkLinkError,
  vkLink,
  setVkLink,
  initialYoutubeLink,
  youtubeLinkError,
  youtubeLink,
  setYoutubeLink,
  initialTelegramLink,
  telegramLinkError,
  telegramLink,
  setTelegramLink,
  initialDzenLink,
  dzenLinkError,
  dzenLink,
  setDzenLink,
  initialOwnSiteLink,
  ownSiteLinkError,
  ownSiteLink,
  setOwnSiteLink,
}: Props) {
  return (
    <div>
      <div style={{ fontSize: "22px", marginBottom: "15px" }}>
        Ссылки на Веб-ресурсы
      </div>
      <UpdateInput
        width={400}
        height={40}
        label={"Ссылка на ВКонтакте"}
        defaultValue={initialVkLink}
        error={vkLinkError}
        value={vkLink}
        onChange={setVkLink}
      />
      <UpdateInput
        width={400}
        height={40}
        label={"Ссылка на Telegram"}
        defaultValue={initialTelegramLink}
        error={telegramLinkError}
        value={telegramLink}
        onChange={setTelegramLink}
      />
      <UpdateInput
        width={400}
        height={40}
        label={"Ссылка на Youtube"}
        defaultValue={initialYoutubeLink}
        error={youtubeLinkError}
        value={youtubeLink}
        onChange={setYoutubeLink}
      />
      <UpdateInput
        width={400}
        height={40}
        label={"Ссылка на Дзен"}
        defaultValue={initialDzenLink}
        error={dzenLinkError}
        value={dzenLink}
        onChange={setDzenLink}
      />
      <UpdateInput
        width={400}
        height={40}
        label={"Ссылка на свой Веб-ресурс"}
        defaultValue={initialOwnSiteLink}
        error={ownSiteLinkError}
        value={ownSiteLink}
        onChange={setOwnSiteLink}
      />
    </div>
  );
}
