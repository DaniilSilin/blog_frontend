import Link from "next/link";
import React from "react";

const CustomText = (text: string) => {
  const renderText = () => {
    console.log(text);
    const parts = text.split(" ");
    console.log(parts);
    return parts.map((part, index) => {
      console.log(part);
      if (part === "@admin") {
        const username = part.slice(1);
        return (
          <Link href={`/profile/${username}/`} key={index}>
            @admin
          </Link>
        );
      }
      return part;
    });
  };
  return <span>{renderText()}</span>;
};

export default CustomText;
