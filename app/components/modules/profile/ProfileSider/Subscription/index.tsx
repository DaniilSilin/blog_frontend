import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface Props {
  subscription: any;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function Subscription({ subscription }: Props) {
  return (
    <div>
      <Link
        style={{ display: "flex", alignItems: "center" }}
        href={`/blog/${subscription.title}/`}
      >
        <Image
          src={
            subscription.avatar_small
              ? `${BASE_URL}${subscription.avatar_small}`
              : "/img/default/avatar_default.jpg"
          }
          width={48}
          height={48}
          alt={""}
        />
        <div>{subscription.title}</div>
      </Link>
    </div>
  );
}
