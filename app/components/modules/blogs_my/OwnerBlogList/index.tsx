import React from 'react'
import {IoSettingsOutline} from "react-icons/io5";
import DjangoService from "@/app/store/services/DjangoService";
import Link from 'next/link'

export interface Props {
    blog: any
}

const BASE_URL = 'http://127.0.0.1:8000/'

export default function OwnerBlogList({ blog }: Props) {
  const [ showBlogActionsMenu, setShowBlogActionsMenu ] = React.useState(false)
  const [ deleteBlog ] = DjangoService.useDeleteBlogMutation()
  const showBlogActionsMenuHandleFunction = React.useCallback(() => {
    setShowBlogActionsMenu(!showBlogActionsMenu)
  }, [ showBlogActionsMenu, setShowBlogActionsMenu ])

  const deleteChosenBlog = () => {
    deleteBlog({ slug: blog.slug })
  }

  return (
      <div style={{border: '1px solid black', padding: '10px', borderRadius: '10px', marginRight: '10px', marginBottom: '10px'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
              <img src={`${BASE_URL}${blog.avatar_small}`} alt={''} width={'60'} height={'60'}
                   style={{borderRadius: '50%'}}/>
              <div style={{fontSize: '24px', marginLeft: '10px'}}>{blog?.title}</div>
              <IoSettingsOutline size={24} onClick={showBlogActionsMenuHandleFunction} />
              {showBlogActionsMenu && (
                <div onClick={deleteChosenBlog}>
                  Удалить блог
                </div>
              )}
          </div>
          <div>
              <div>Авторы:</div>
              <div>Дата создания: {blog.created_at}</div>
              <div style={{ border: '1px solid black', padding: '5px', display: 'inline-block', borderRadius: '10px' }}>
                  <Link href={`/blog/`}>Перейти в блог</Link>
              </div>
          </div>
      </div>
  )
}