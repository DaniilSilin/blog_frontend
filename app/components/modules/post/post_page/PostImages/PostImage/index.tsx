import React, { ChangeEvent } from "react";
import Image from "next/image";

import styles from "./post_image.module.css";

export interface Props {
  image: any;
}

const BASE_URL = "http://127.0.0.1:8000";

export default function PostImage({ image }: Props) {
  const [isImageModalOn, setIsImageModalOn] = React.useState(false);
  const imageUrl = `${BASE_URL}${image.image}`;

  const modalToggle = React.useCallback(
    (e: any) => {
      let elem = e.target;
      if (isImageModalOn) {
      } else {
        let modalNode = null;
        if (
          elem.lastElementChild &&
          elem.lastElementChild.className.startsWith("modal_3")
        ) {
          modalNode = elem.lastElementChild;
          modalNode.style.display = "block";
          setIsImageModalOn(true);
        }
      }
    },
    [setIsImageModalOn, isImageModalOn],
  );

  return (
    <>
      <div className={styles.root} onClick={modalToggle}>
        <div
          className={styles.blurredBackground}
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <Image
          className={styles.foregroundImage}
          src={`${BASE_URL}${image.image}`}
          alt={""}
          height={400}
          width={600}
        />
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
  );
}
