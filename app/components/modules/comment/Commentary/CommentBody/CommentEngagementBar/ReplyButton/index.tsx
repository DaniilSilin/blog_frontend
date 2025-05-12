import React from "react";
import { useAppSelector } from "@/app/store";

import NoUserPopup from "@/app/components/modules/NoUserPopup";

import styles from "./reply_button.module.css";

export interface Props {
  slug: string;
  post_id: number;
  setDisplayReplyInput: (value: boolean) => void;
}

export default function ReplyButton({
  slug,
  post_id,
  setDisplayReplyInput,
}: Props) {
  const userRef = React.useRef(null);
  const user = useAppSelector((state) => state.django.profile);

  const [displayReplyPopup, setDisplayReplyPopup] = React.useState(false);

  const handleShowReplyPopup = React.useCallback(() => {
    setDisplayReplyPopup(!displayReplyPopup);
  }, [setDisplayReplyPopup, displayReplyPopup]);

  const showReplyInputHandleChange = React.useCallback(() => {
    setDisplayReplyInput((displayReplyInput) => !displayReplyInput);
  }, []);

  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      // @ts-ignore
      if (user.isGuest) {
        // @ts-ignore
        if (!userRef.current.contains(e.target)) {
          setDisplayReplyPopup(false);
        }
      }
    };
    document.addEventListener("mousedown", handleMouse);
    return () => document.removeEventListener("mousedown", handleMouse);
  });

  return (
    <>
      {user.isGuest ? (
        <div ref={userRef}>
          <button
            onClick={handleShowReplyPopup}
            className={styles.createReplyButton}
          >
            Ответить
          </button>
          {displayReplyPopup && (
            <NoUserPopup
              marginTop={0}
              title={"Хотите присоединиться к обсуждению?"}
              description={"Войдите, чтобы продолжить"}
              redirectTo={`/blog/${slug}/post/${post_id}`}
            />
          )}
        </div>
      ) : (
        <div>
          <button
            className={styles.createReplyButton}
            onClick={showReplyInputHandleChange}
          >
            Ответить
          </button>
        </div>
      )}
    </>
  );
}
