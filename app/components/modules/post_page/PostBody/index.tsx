import React from "react";
import { PostType } from "@/app/types";
import classNames from "classnames";

import styles from "./post_body.module.css";

export interface Props {
  post: PostType;
}

export default function PostBody({ post }: Props) {
  const [isBodyExpanded, setIsBodyExpanded] = React.useState(false);
  const [isEnoughTextSpace, setIsEnoughTextSpace] = React.useState(true);

  const bodyRef = React.useRef(null);

  const handleExpandTextOnClick = React.useCallback(() => {
    setIsBodyExpanded((isExpanded) => !isExpanded);
  }, []);

  const currentButtonText = React.useMemo(() => {
    if (!isEnoughTextSpace) {
      return isBodyExpanded ? "Свернуть" : "Читать дальше";
    }
    return "";
  }, [isEnoughTextSpace, isBodyExpanded]);

  return (
    <div className={styles.root}>
      <div
        className={classNames(styles.showMore, {
          [styles.active]: isBodyExpanded,
        })}
      >
        <span>{post.body}</span>
      </div>
      <button className={styles.expandButton} onClick={handleExpandTextOnClick}>
        {currentButtonText}
      </button>
    </div>
  );
}
