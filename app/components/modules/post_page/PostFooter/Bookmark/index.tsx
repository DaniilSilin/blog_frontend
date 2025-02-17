import React from 'react'
import { HiMiniBookmark } from "react-icons/hi2";
import styles from "@/app/components/modules/post_page/PostFooter/post_footer.module.css";
import CookieHelper from "@/app/store/cookieHelper";
import DjangoService from "@/app/store/services/DjangoService";
import NoUserPopup from "@/app/components/modules/NoUserPopup";

export interface Props {
  post: any
}

export default function Bookmark({ post }: Props) {
  const [ showPopup, setShowPopup ] = React.useState(false)
  const [ addBookmark ] = DjangoService.useAddToBookmarksMutation()
  const [ removeBookmark ] = DjangoService.useRemoveFromBookmarksMutation()

  const addToBookmarks = ()=> {
    addBookmark({ post_id: post.post_id, slug: post.blog.slug })
  }

  const removeFromBookmarks = () => {
    removeBookmark({ post_id: post.post_id, slug: post.blog.slug })
  }

  return (
    <div>
      {CookieHelper.getCookie('token') ? (
        <div>
           {post?.isBookmarked.toString() === 'true' ? (
             <HiMiniBookmark className={styles.likeIcon} size={20} style={{ color: 'black' }} onClick={() => removeFromBookmarks()} />
           ) : (
             <HiMiniBookmark className={styles.likeIcon} size={20} style={{ color: 'red' }} onClick={() => addToBookmarks()} />
           )}
        </div>
      ) : (
        <div>
          <HiMiniBookmark className={styles.likeIcon} size={20} style={{ color: 'black' }} onClick={() => setShowPopup(!showPopup)} />
          {showPopup && (
            <NoUserPopup title={'123123'} description={'123123123'} />
          )}
        </div>
      )}
    </div>
  )
}