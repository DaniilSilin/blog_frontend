import React from "react";

import { TiArrowForwardOutline } from "react-icons/ti";

import ShareMenu from "./ShareMenu";

import styles from "./share_button.module.css";

export interface Props {
  post: any;
}

export default function ShareButton({ post }: Props) {
  const [displayShareMenu, setDisplayShareMenu] = React.useState(false);

  const handleShowShareMenu = () => {
    setDisplayShareMenu(true);
  };

  return (
    <div className={styles.root} onClick={handleShowShareMenu}>
      <TiArrowForwardOutline className={styles.shareIcon} size={20} />
      <div>Поделиться</div>
      {displayShareMenu && (
        <ShareMenu setDisplayShareMenu={setDisplayShareMenu} post={post} />
      )}
    </div>
  );
}
