import React, {ChangeEvent} from 'react'
import DjangoService from "@/app/store/services/DjangoService";
import { LikeTwoTone, DislikeTwoTone } from "@ant-design/icons/lib"
import { FaRegHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs"
import Link from 'next/link'
const BASE_URL = 'http://localhost:8000'


export default function BlogEditorCommunity({ slug }) {
  const { data: blogComments } = DjangoService.useBlogCommentsQuery({ slug })

  return (
    <div>
      <div style={{ fontSize: '28px', fontWeight: '600' }}>Сообщество</div>
      <div>Комментарии</div>
      <div>
          {blogComments?.results.map((comment) => (
            <div style={{ display: 'flex', border: '1px solid #3e3e3e', padding: '12px' }}>
                <div>
                    <Link href={`/profile/${comment.author.username}/`}>
                      <img src={`${BASE_URL}${comment.author.avatar_small}`} style={{borderRadius: '50%', marginRight: '16px'}} alt={''}
                         width={50} height={50}/>
                    </Link>
                </div>
                <div>
                    <div style={{display: 'flex', marginBottom: '4px'}}>
                        <div>
                            <Link href={`/profile/${comment.author.username}/`}>
                                <div>{comment.author.username}</div>
                            </Link>
                        </div>
                        <div style={{ margin: '0 4px 0 4px' }}>•</div>
                        <div>{comment.created_at}</div>
                    </div>
                  <div>{comment.body}</div>
                  <div style={{ display: 'flex' }}>
                      <div>Ответить</div>
                      <div>Нет ответов</div>
                      <LikeTwoTone />
                      <DislikeTwoTone />
                      <FaRegHeart />
                      <BsThreeDotsVertical />
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div>
                      <Link href={`/blog/${comment.post.blog.slug}/post/${comment.post.post_id}/`}>
                        <img src={`${BASE_URL}${comment.post.blog.avatar_small}`} alt={''} width={50} height={50} />
                      </Link>
                  </div>
                  <Link href={`/blog/${comment.post.blog.slug}/post/${comment.post.post_id}/`}>
                    <div>{comment.post.title}</div>
                  </Link>
                </div>
            </div>
          ))}
      </div>
      <div></div>
    </div>
  )
}