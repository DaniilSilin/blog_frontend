import React from "react";
import { Carousel } from "antd";
import PostImage from "@/app/components/modules/post/post_page/PostImages/PostImage";
import Image from "next/image";
import styles from "@/app/components/modules/post/post_page/PostImages/PostImage/post_image.module.css";

export interface Props {
  post: any;
}

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "500",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const BASE_URL = "http://127.0.0.1:8000/";

export default function PostImages({ post }: Props) {
  return (
    <div style={{ margin: "30px 0" }}>
      <Carousel arrows infinite={false}>
        {post.images1.map((image: any, index: number) => (
          <>
            <div key={index}>
              <h3 style={contentStyle}>
                <PostImage key={index} image={image} />
              </h3>
            </div>
            {/*<div className={"modal_3"} style={{ display: "block" }}>*/}
            {/*  <div className={"modalContent_3"}>*/}
            {/*    <Image*/}
            {/*      className={styles.foregroundImage}*/}
            {/*      src={`${BASE_URL}${image.image}`}*/}
            {/*      alt={""}*/}
            {/*      height={400}*/}
            {/*      width={600}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</div>*/}
          </>
        ))}
      </Carousel>
    </div>
  );
}
