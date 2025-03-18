import React from "react";
import Post from "../../../../types";
import classNames from "classnames";

import styles from "./post_body.module.css";

export interface Props {
  post: Post;
}

export default function PostBody({ post }: Props) {
  const [showMore, setShowMore] = React.useState(false);
  const [showButton, setShowButton] = React.useState(false);
  const bodyRef = React.useRef(null);

  const handleResizeBody = React.useCallback(() => {
    setShowMore(!showMore);
  }, [setShowMore, showMore]);

  React.useEffect(() => {
    // @ts-ignore
    if (bodyRef.current.offsetHeigth > 400) {
      setShowButton(false);
      setShowMore(true);
    } else {
      setShowMore(false);
      setShowButton(false);
    }
  }, [bodyRef, setShowMore, setShowButton]);

  return (
    <div className={styles.root}>
      <div
        ref={bodyRef}
        className={classNames(styles.showMore, { [styles.active]: !showMore })}
      >
        {post.body}
      </div>
      {showButton && (
        <>
          {showMore ? (
            <div onClick={handleResizeBody}>Читать дальше</div>
          ) : (
            <div onClick={handleResizeBody}>Свернуть</div>
          )}
        </>
      )}
    </div>
  );
}
