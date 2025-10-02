import React from "react";
import { BlogType } from "@/app/types";

import BlogHeaderAdditionalMenuPopup from "./BlogHeaderAdditionalMenuPopup";

import styles from "./blog_header_additional_menu_popup.module.css";

export interface Props {
  blog: BlogType;
}

export default function BlogHeaderDescriptionPreview({ blog }: Props) {
  const [dynamicContentModalDisplayed, setDynamicContentModalDisplayed] =
    React.useState(false);
  const freezeBody = React.useCallback(
    () => document.querySelector(".modal")?.classList.add("freeze"),
    [],
  );
  const unfreezeBody = React.useCallback(
    () => document.querySelector(".modal")?.classList.remove("freeze"),
    [],
  );
  const handleDynamicContentClick = React.useCallback(
    (e: any) => {
      let elem = e.target;
      if (dynamicContentModalDisplayed) {
        if (
          elem.className.startsWith("close_3") ||
          elem.className.startsWith("modal")
        ) {
          if (elem.className.startsWith("close_3")) {
            elem = elem.parentNode.parentNode.parentNode;
            elem.style.display = "none";
            unfreezeBody();
            setDynamicContentModalDisplayed(false);
          }
          elem.style.display = "none";
          unfreezeBody();
          setDynamicContentModalDisplayed(false);
        }
      } else {
        let modalNode = null;
        if (elem.lastElementChild.className.startsWith("modal")) {
          modalNode = elem.lastElementChild;
          modalNode.style.display = "block";
          freezeBody();
          setDynamicContentModalDisplayed(true);
        }
      }
    },
    [freezeBody, unfreezeBody, dynamicContentModalDisplayed],
  );

  const previewDescriptionButtonTitle = React.useMemo(() => {
    if (blog?.description.length < 35) {
      return <div>{blog?.description}...ещё</div>;
    } else {
      <div>{blog?.description.slice(0, 35)}...ещё</div>;
    }
  }, [blog]);

  return (
    <div>
      <div
        onClick={handleDynamicContentClick}
        className={styles.blogDescription}
      >
        {blog?.description ? (
          previewDescriptionButtonTitle
        ) : (
          <div>
            <>Подробнее о канале</>
            <>...ещё</>
          </div>
        )}
      </div>
      <div className={"modal"} style={{ overflow: "hidden" }}>
        <div className={"modalContent"} style={{ margin: "10% auto" }}>
          <BlogHeaderAdditionalMenuPopup blog={blog} />
        </div>
      </div>
    </div>
  );
}

// {blog?.description ? (
//   <>
//     {blog?.description.length < 35 ? (
//       <>{blog?.description}...ещё</>
//     ) : (
//       <>{blog?.description.slice(0, 35)}...ещё</>
//     )}
//   </>
// ) : (
//   <>
//     <>Подробнее о канале</>
//     <>...ещё</>
//   </>
// )}
