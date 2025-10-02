import React from "react";
import moment from "moment";

import { BlogType } from "@/app/types";
import { AiOutlineMail, AiOutlineRise } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { FaSignsPost } from "react-icons/fa6";
import { IoCalendar } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";

import styles from "./blog_summary.module.css";

export interface Props {
  blog: BlogType;
  blogSummaryTitle: string;
}

export default function BlogSummary({ blog, blogSummaryTitle }: Props) {
  const subscribersCount = React.useMemo(() => {
    // @ts-ignore
    const subscribers = blog?.subscriberList.toString();
    if (subscribers.slice(-1) === "1" && subscribers.slice(-2) !== "11") {
      return `${subscribers} подписчик`;
    } else if (
      (subscribers.slice(-1) === "2" ||
        subscribers.slice(-1) === "3" ||
        subscribers.slice(-1) === "4") &&
      subscribers.slice(-2) !== "12" &&
      subscribers.slice(-2) !== "13" &&
      subscribers.slice(-2) !== "14"
    ) {
      return `${subscribers} подписчика`;
    } else {
      return `${subscribers} подписчиков`;
    }
  }, [blog?.subscriberList]);

  const postsCount = React.useMemo(() => {
    const posts = blog?.count_of_posts.toString();
    if (posts.slice(-1) === "1" && posts.slice(-2) !== "11") {
      return `${posts} публикация`;
    } else if (
      (posts.slice(-1) === "2" ||
        posts.slice(-1) === "3" ||
        posts.slice(-1) === "4") &&
      posts.slice(-2) !== "12" &&
      posts.slice(-2) !== "13" &&
      posts.slice(-2) !== "14"
    ) {
      return `${posts} публикации`;
    } else {
      return `${posts} публикаций`;
    }
  }, [blog.count_of_posts]);

  const viewsCount = React.useMemo(() => {
    const views = blog?.views.toString();
    if (views.slice(-1) === "1" && views.slice(-2) !== "11") {
      return `${views} просмотр`;
    } else if (
      (views.slice(-1) === "2" ||
        views.slice(-1) === "3" ||
        views.slice(-1) === "4") &&
      views.slice(-2) !== "12" &&
      views.slice(-2) !== "13" &&
      views.slice(-2) !== "14"
    ) {
      return `${views} просмотра`;
    } else {
      return `${views} просмотров`;
    }
  }, [blog.views]);

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <span>{blogSummaryTitle}</span>
      </div>
      <table>
        <tbody>
          {blog?.email && (
            <tr style={{ height: "40px" }}>
              <td style={{ width: "36px" }}>
                <AiOutlineMail size={24} style={{ display: "flex" }} />
              </td>
              <td>
                <a className={styles.link} href={`mailto:${blog?.email}`}>
                  {blog?.email}
                </a>
              </td>
            </tr>
          )}
          {blog?.phone_number && (
            <tr style={{ height: "40px" }}>
              <td style={{ width: "36px" }}>
                <FaPhone size={24} style={{ display: "flex" }} />
              </td>
              <td>
                <a className={styles.link} href={`tel:${blog?.phone_number}`}>
                  {blog?.phone_number}
                </a>
              </td>
            </tr>
          )}
          <tr style={{ height: "40px" }}>
            <td style={{ width: "36px" }}>
              <IoIosPeople size={24} style={{ display: "flex" }} />
            </td>
            <td>{subscribersCount}</td>
          </tr>
          <tr style={{ height: "40px" }}>
            <td style={{ width: "36px" }}>
              <FaSignsPost size={24} style={{ display: "flex" }} />
            </td>
            <td>{postsCount}</td>
          </tr>
          <tr style={{ height: "40px" }}>
            <td style={{ width: "36px" }}>
              <IoCalendar size={24} style={{ display: "flex" }} />
            </td>
            <td>
              Дата регистрации:{" "}
              {moment(blog?.created_at).format("D MMMM hh:mm")}
            </td>
          </tr>
          <tr style={{ height: "40px" }}>
            <td style={{ width: "36px" }}>
              <AiOutlineRise size={24} style={{ display: "flex" }} />
            </td>
            <td>{viewsCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
