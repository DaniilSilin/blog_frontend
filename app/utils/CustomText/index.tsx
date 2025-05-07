import Link from "next/link";

const userMentionRegex = new RegExp("@\\w+");

const CustomText = (text: string) => {
  const renderText = () => {
    console.log(text);
    const parts = text.split(" ");
    console.log(parts);
    return parts.map((part, index) => {
      if (userMentionRegex.test(part)) {
        const username = part.slice(1);
        return <Link href={`/profile/${username}/`}>{part}</Link>;
      }
      return part;
    });
  };
  return <span>{renderText()}</span>;
};

const cursiveTextRegex = new RegExp("\-[\\w\\s]+\-");

// const CustomText2 = (text: string) => {
//   const renderText = () => {
//     console.log(text);
//
//     if
//
//     const parts = text.split(" ");
//     console.log(parts);
//     return parts.map((part, index) => {
//       console.log(part);
//       if (part === "@admin") {
//         const username = part.slice(1);
//         return <s>{part}</s>;
//       }
//       return <span> {part}</span>;
//     });
//   };
//   return <span>{renderText()}</span>;
// };

export default CustomText;
