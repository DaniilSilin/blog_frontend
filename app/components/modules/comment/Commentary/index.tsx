import React from "react";
import { useAppSelector } from "@/app/store";

import { PostType, CommentType } from "@/app/types";
import { BsThreeDotsVertical } from "react-icons/bs";

import CommentBody from "./CommentBody";
import CommentaryActionMenu from "./CommentaryActionMenu";
import CommentaryAuthorThumbnail from "./CommentaryAuthorThumbnail";
import CommentBox from "@/app/components/modules/comment/CommentBox";

import styles from "./commentary.module.css";

export interface Props {
  comment: CommentType;
  slug: string;
  post_id: number;
  width: number;
  height: number;
  post: PostType;
  isParent?: boolean;
}

export default function Commentary({
  slug,
  post_id,
  comment,
  width,
  height,
  post,
  isParent,
}: Props) {
  const [loading, setLoading] = React.useState(false);

  const user = useAppSelector((state) => state.django.profile);
  const commentAdditionalMenuRef = React.useRef(null);
  const [displayAdditionalMenu, setDisplayAdditionalMenu] =
    React.useState<boolean>(false);
  const [editMode, setEditMode] = React.useState(false);

  const [displayReplyInput, setDisplayReplyInput] = React.useState(false);

  const displayAdditionalMenuHandler = React.useCallback(() => {
    setDisplayAdditionalMenu((displayAdditionalMenu) => !displayAdditionalMenu);
  }, []);

  React.useEffect(() => {
    if (!editMode) {
      const handleMouseDown = (e: MouseEvent) => {
        if (displayAdditionalMenu) {
          // @ts-ignore
          if (!commentAdditionalMenuRef.current.contains(e.target)) {
            setDisplayAdditionalMenu(false);
          }
        }
      };
      document.addEventListener("mousedown", handleMouseDown);
      return () => document.removeEventListener("mousedown", handleMouseDown);
    }
  });

  return (
    <div className={styles.root}>
      <CommentaryAuthorThumbnail
        comment={comment}
        width={width}
        height={height}
      />
      {editMode ? (
        <CommentBox
          editMode={editMode}
          setEditMode={setEditMode}
          comment={comment}
          placeholder={""}
          submitButtonText={"Сохранить"}
          slug={slug}
          post_id={post_id}
          setDisplayReplyInput={setDisplayReplyInput}
          setLoading={setLoading}
          isParent={isParent}
        />
      ) : (
        <>
          {loading ? (
            <div className={"loader"}></div>
          ) : (
            <>
              <CommentBody
                comment={comment}
                post={post}
                slug={slug}
                post_id={post_id}
                displayReplyInput={displayReplyInput}
                editMode={editMode}
                setDisplayReplyInput={setDisplayReplyInput}
                // @ts-ignore
                setLoading={setLoading}
                isParent={isParent}
              />
              {!user.isGuest && (
                <div>
                  <button
                    className={styles.commentActionMenuButton}
                    onClick={displayAdditionalMenuHandler}
                  >
                    <BsThreeDotsVertical />
                  </button>
                  {displayAdditionalMenu && (
                    <div ref={commentAdditionalMenuRef}>
                      <CommentaryActionMenu
                        setDisplayAdditionalMenu={setDisplayAdditionalMenu}
                        comment={comment}
                        slug={slug}
                        post_id={post_id}
                        postData={post}
                        setEditMode={setEditMode}
                        isParent={isParent}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
