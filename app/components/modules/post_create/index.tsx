import React, { FormEvent } from "react";
import DjangoService from "@/app/store/services/DjangoService";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

import { IoReturnDownBack } from "react-icons/io5";
import {
  titleValidator,
  bodyValidator,
  mapValidator,
} from "../form/validators";
import {
  Map,
  PostDataInput,
  PostDataTextArea,
} from "../../../components/modules/form";

import MapContainer from "@/app/components/modules/post_create/MapContainer";
import Tags from "@/app/components/modules/post_create/Tags";

import styles from "./PostCreate.module.css";
import CheckboxContainer from "@/app/components/modules/post_create/CheckboxContainer";

export default function PostCreate({ slug }) {
  const router = useRouter();
  const [displayMapInput, setDisplayMapInput] = React.useState(false);

  const [title, setTitle] = React.useState<string>("");
  const [body, setBody] = React.useState<string>("");
  const [mapType, setMapType] = React.useState<string>("");
  const [map, setMap] = React.useState<string>("");
  const [tags, setTags] = React.useState([]);
  const [isPublished, setIsPublished] = React.useState<boolean>(false);
  const [authorIsHidden, setAuthorIsHidden] = React.useState<boolean>(false);
  const [commentsAllowed, setCommentsAllowed] = React.useState<boolean>(false);

  const [availableToSubmit, setAvailableToSubmit] = React.useState(false);

  const [createPost] = DjangoService.useCreatePostMutation();

  const [titleError, setTitleError] = React.useState<string>("");
  const [bodyError, setBodyError] = React.useState<string>("");
  const [mapError, setMapError] = React.useState<string>("");

  const formValidation = React.useCallback(() => {
    let isValid;

    if (titleValidator(title)) {
      setTitleError(titleValidator(title));
      isValid = false;
    } else {
      setTitleError("");
      isValid = true;
    }

    if (map) {
      if (mapValidator(map)) {
        setMapError(mapValidator(map));
        isValid = false;
      } else {
        setMapError("");
        isValid = true;
      }
    } else {
      setMapError("");
    }

    if (body) {
      if (bodyValidator(body)) {
        setBodyError(bodyValidator(body));
        isValid = false;
      } else {
        setBodyError("");
        isValid = true;
      }
    } else {
      setBodyError("");
    }

    return isValid;
  }, [title, body, map, setTitleError, bodyError, mapValidator]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = await createPost({
      title,
      body,
      map_type: mapType,
      map,
      is_published: isPublished,
      comments_allowed: commentsAllowed,
      author_is_hidden: authorIsHidden,
      blog: slug,
      tags: tags.join(" "),
    });
    if (!result.error) {
      router.push(`/blog/${slug}/post/${result.data.post_id}/`);
    }
  };

  React.useEffect(() => {
    const isValid = formValidation();
    if (isValid) {
      setAvailableToSubmit(true);
    } else {
      setAvailableToSubmit(false);
    }
  }, [title, body, map]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Link href={`/blog/${slug}/`} className={styles.returnToBlog}>
          <IoReturnDownBack />
          <div>Вернуться на страницу блога</div>
        </Link>
        <h1>Создать публикацию</h1>
        <PostDataInput
          width={400}
          height={40}
          onChange={setTitle}
          label={"Название поста"}
          maxLength={100}
          error={titleError}
        />
        <PostDataTextArea
          width={400}
          height={150}
          onChange={setBody}
          label={"Тело поста"}
          autoSize={true}
          showCount={false}
        />
        <div
          className={styles.mapTitle}
          onClick={() => setDisplayMapInput(!displayMapInput)}
        >
          Хотите вставить карту?
        </div>
        {displayMapInput && (
          <MapContainer
            map={map}
            setMap={setMap}
            mapError={mapError}
            mapType={mapType}
            setMapType={setMapType}
          />
        )}
        <Tags tags={tags} setTags={setTags} />
        <CheckboxContainer
          onChange={setIsPublished}
          title={"Опубликовать сразу"}
        />
        <CheckboxContainer
          onChange={setCommentsAllowed}
          title={"Отключить комментарии"}
        />
        <CheckboxContainer
          onChange={setAuthorIsHidden}
          title={"Скрыть автора"}
        />
        <button
          className={classNames(styles.submitButton, {
            [styles.active]: availableToSubmit,
          })}
          onClick={handleSubmit}
          disabled={!availableToSubmit}
        >
          Создать публикацию
        </button>
      </form>
    </div>
  );
}
