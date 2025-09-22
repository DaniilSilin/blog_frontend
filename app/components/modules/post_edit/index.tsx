import React from "react";
import DjangoService from "@/app/store/services/DjangoService";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";

import {
  bodyValidator,
  mapValidator,
  titleValidator,
} from "@/app/components/modules/form/validators";
import { UpdateInput } from "@/app/components/modules/form";

import UpdateTextArea from "@/app/components/modules/form/UpdateTextArea";

import { IoReturnDownBack } from "react-icons/io5";
import PostInputComponent from "@/app/components/modules/post_edit/PostInputComponent";

import styles from "./post_edit.module.css";

export interface Props {
  slug: string;
  post_id: number;
}

export default function PostEdit({ slug, post_id }: Props) {
  const router = useRouter();
  const { data: post } = DjangoService.useGetPostQuery({
    slug: slug,
    post_id: post_id,
  });
  const [updatePost] = DjangoService.useUpdatePostMutation();
  const [deletePost] = DjangoService.useDeletePostMutation();
  const [hasPostChanged, setHasPostChanged] = React.useState(true);
  const [isReadyToSubmit, setIsReadyToSubmit] = React.useState(false);

  const [titleInitial, setTitleInitial] = React.useState<string | undefined>(
    post?.title,
  );
  const [bodyInitial, setBodyInitial] = React.useState<string | undefined>(
    post?.body,
  );
  const [mapInitial, setMapInitial] = React.useState<string | undefined>(
    post?.map,
  );
  const [tagsInitial, setTagsInitial] = React.useState<string | undefined>(
    post?.tags,
  );
  const [isPublishedInitial, setIsPublishedInitial] = React.useState<boolean>(
    post?.is_published,
  );
  const [isCommentsAllowedInitial, setIsCommentsAllowedInitial] =
    React.useState<boolean>(post?.comments_allowed);
  const [isAuthorHiddenInitial, setIsAuthorHiddenInitial] =
    React.useState<boolean>(post?.author_is_hidden);

  const [title, setTitle] = React.useState<string | undefined>(titleInitial);
  const [body, setBody] = React.useState<string | undefined>(bodyInitial);
  const [map, setMap] = React.useState<string | undefined>(mapInitial);
  const [tags, setTags] = React.useState<string | undefined>(tagsInitial);
  const [isPublished, setIsPublished] =
    React.useState<boolean>(isPublishedInitial);
  const [isCommentsAllowed, setIsCommentsAllowed] =
    React.useState(isPublishedInitial);
  const [isAuthorHidden, setIsAuthorHidden] = React.useState<boolean>(
    isAuthorHiddenInitial,
  );

  const [titleError, setTitleError] = React.useState();
  const [bodyError, setBodyError] = React.useState();
  const [mapError, setMapError] = React.useState();

  React.useEffect(() => {
    setTitleInitial(post?.title);
    setBodyInitial(post?.body);
    setMapInitial(post?.map);
    setTagsInitial(post?.tags);
    setIsPublishedInitial(post?.is_published);
    setIsCommentsAllowed(post?.comments_allowed);
    setIsAuthorHidden(post?.author_is_hidden);
  }, [post]);

  const setToDefaultHandleChange = React.useCallback(() => {
    setTitle(titleInitial);
    setBody(bodyInitial);
    setMap(mapInitial);
    setTags(tagsInitial);
    setIsPublished(isPublishedInitial);
    setIsCommentsAllowed(isCommentsAllowedInitial);
    setIsAuthorHidden(isAuthorHiddenInitial);
  }, [
    setTitle,
    setBody,
    setMap,
    setTags,
    setIsPublished,
    bodyInitial,
    titleInitial,
    mapInitial,
    tagsInitial,
    isPublishedInitial,
    isCommentsAllowedInitial,
    isAuthorHiddenInitial,
  ]);

  React.useEffect(() => {
    if (
      title === titleInitial &&
      body === bodyInitial &&
      map === mapInitial &&
      tags === tagsInitial &&
      isPublished === isPublishedInitial &&
      isCommentsAllowed === isCommentsAllowedInitial &&
      isAuthorHidden === isAuthorHiddenInitial
    ) {
      setHasPostChanged(true);
    } else {
      setHasPostChanged(false);
    }
  }, [
    title,
    body,
    map,
    tags,
    isPublished,
    isCommentsAllowed,
    isAuthorHidden,
    setHasPostChanged,
    titleInitial,
    bodyInitial,
    mapInitial,
    tagsInitial,
    isPublished,
    isPublishedInitial,
    isCommentsAllowedInitial,
    isAuthorHiddenInitial,
  ]);

  const formValidator = React.useCallback(() => {
    let isValid = false;

    // @ts-ignore
    if (titleValidator(title)) {
      // @ts-ignore
      setTitleError(titleValidator(title));
      isValid = false;
    } else {
      // @ts-ignore
      setTitleError("");
      isValid = true;
    }
    // @ts-ignore
    if (bodyValidator(body)) {
      // @ts-ignore
      setBodyError(bodyValidator(body));
      isValid = false;
    } else {
      // @ts-ignore
      setBodyError("");
      isValid = true;
    }
    // @ts-ignore
    if (mapValidator(map)) {
      // @ts-ignore
      setMapError(mapValidator(map));
      isValid = false;
    } else {
      // @ts-ignore
      setMapError("");
      isValid = true;
    }

    return isValid;
  }, [setBodyError, setTitleError, setMapError, title, body, map]);

  React.useEffect(() => {
    formValidator();
    const isValid = formValidator();
    if (!hasPostChanged && isValid) {
      setIsReadyToSubmit(true);
    } else {
      setIsReadyToSubmit(false);
    }
  }, [title, body, setIsReadyToSubmit, hasPostChanged, formValidator]);

  const deletePostFunction = async () => {
    const result = await deletePost({ slug, post_id });
    // @ts-ignore
    if (!result.error) {
      router.push(`/blog/${slug}/`);
    }
  };

  const postUpdateRequest = async () => {
    const validator = formValidator();
    if (validator) {
      const result = await updatePost({
        slug,
        post_id,
        title,
        body,
        map,
        tags,
        is_published: isPublished,
        comments_allowed: isCommentsAllowed,
        author_is_hidden: isAuthorHidden,
      });
      // @ts-ignore
      if (!result.error) {
        router.push(`/blog/${slug}/post/${post_id}/`);
      }
    }
  };

  return (
    <div>
      <div>
        <Link
          href={`/blog/${slug}/post/${post_id}/`}
          className={styles.returnToPost}
        >
          <IoReturnDownBack />
          <div>Вернуться на страницу публикации</div>
        </Link>
      </div>
      <h1>Редактировать публикацию</h1>
      <UpdateInput
        width={600}
        height={40}
        label={"Название публикации"}
        defaultValue={titleInitial}
        error={titleError}
        value={title}
        onChange={setTitle}
      />
      <UpdateTextArea
        width={600}
        height={40}
        label={"Тело публикации"}
        defaultValue={bodyInitial}
        error={bodyError}
        value={body}
        onChange={setBody}
        autoSize={true}
        showCount={true}
      />
      <UpdateTextArea
        width={600}
        height={40}
        label={"Карта"}
        defaultValue={mapInitial}
        error={mapError}
        value={map}
        onChange={setMap}
        autoSize={true}
        showCount={true}
      />
      <UpdateTextArea
        width={600}
        height={40}
        label={"Тэги"}
        defaultValue={tagsInitial}
        error={mapError}
        value={tags}
        onChange={setTags}
        autoSize={true}
        showCount={true}
      />
      <PostInputComponent
        defaultChecked={isPublishedInitial}
        value={isPublished}
        description={"Опубликовать"}
        onChange={setIsPublished}
      />
      <PostInputComponent
        defaultChecked={isCommentsAllowedInitial}
        value={isCommentsAllowed}
        description={"Закрыть комментарии"}
        onChange={setIsCommentsAllowed}
      />
      <PostInputComponent
        defaultChecked={isAuthorHiddenInitial}
        value={isAuthorHidden}
        description={"Скрыть автора"}
        onChange={setIsAuthorHidden}
      />
      <div className={styles.actionButtonsContainer}>
        <button className={styles.deleteButton} onClick={deletePostFunction}>
          Удалить публикацию
        </button>
        <button
          onClick={setToDefaultHandleChange}
          className={classNames(styles.cancelButton, {
            [styles.active]: !hasPostChanged,
          })}
          disabled={hasPostChanged}
        >
          Отмена
        </button>
        <button
          className={classNames(styles.cancelButton, {
            [styles.active]: isReadyToSubmit,
          })}
          disabled={!isReadyToSubmit}
          onClick={postUpdateRequest}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}
