import React from 'react'
import Post from '../../../../types'

import styles from './post_body.module.css'

export interface Props {
  post: Post,
}

export default function PostBody({ post }: Props) {
  return (
    <div className={styles.root}>
      <div dangerouslySetInnerHTML={{__html: post.body}} />
    </div>
  )
}