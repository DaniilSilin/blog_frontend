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
  PostDataInput,
  PostDataTextArea,
} from "../../../components/modules/form";

import validateField from "@/app/utils/validator";

import CheckboxContainer from "./CheckboxContainer";
import ImagesContainer from "./ImagesContainer";
import MapContainer from "./MapContainer";
import Tags from "./Tags";

import styles from "./PostCreate.module.css";

export default function PostCreate({ slug }) {
  const router = useRouter();
  const [displayMapInput, setDisplayMapInput] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [title, setTitle] = React.useState<string>("");
  const [body, setBody] = React.useState<string>("");
  const [mapType, setMapType] = React.useState<string>("");
  const [map, setMap] = React.useState<string>("");
  const [tags, setTags] = React.useState([]);
  const [isPublished, setIsPublished] = React.useState<boolean>(false);
  const [authorIsHidden, setAuthorIsHidden] = React.useState<boolean>(false);
  const [commentsAllowed, setCommentsAllowed] = React.useState<boolean>(false);
  const [images, setImages] = React.useState<File[]>();

  const [availableToSubmit, setAvailableToSubmit] = React.useState(false);

  const [createPost] = DjangoService.useCreatePostMutation();

  const [titleError, setTitleError] = React.useState<string>("");
  const [bodyError, setBodyError] = React.useState<string>("");
  const [mapError, setMapError] = React.useState<string>("");

  const formValidation = React.useCallback(() => {
    const title_value = validateField(
      title,
      null,
      titleValidator,
      setTitleError,
    );
    const map_value = validateField(map, null, mapValidator, setMapError);
    const body_value = validateField(body, null, bodyValidator, setBodyError);

    return title_value && map_value && body_value;
  }, [title, map]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("body", body);
    formData.append("map_type", mapType);
    formData.append("map", map);
    formData.append("is_published", isPublished);
    formData.append("comments_allowed", commentsAllowed);
    formData.append("author_is_hidden", authorIsHidden);
    formData.append("blog", slug);
    formData.append("tags", tags.join(" "));
    images?.forEach((image2) => {
      formData.append("images", image2);
    });
    setIsLoading(true);
    try {
      const result = await createPost({ formData, slug });
      if (!result.error) {
        router.push(`/blog/${slug}/post/${result.data.post_id}/`);
      }
    } catch (error) {
      console.error("Ошибка при отправке комментария:", error);
    } finally {
      setIsLoading(false);
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
          autoSize
          showCount
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
        <ImagesContainer images={images} setImages={setImages} />
        <Tags tags={tags} setTags={setTags} />
        <CheckboxContainer
          onChange={setIsPublished}
          title={"Опубликовать сразу"}
        />
        <CheckboxContainer
          onChange={setCommentsAllowed}
          title={"Комментарии доступны"}
        />
        <CheckboxContainer
          onChange={setAuthorIsHidden}
          title={"Скрыть автора"}
        />
        <button
          className={classNames(styles.submitButton, {
            [styles.active]: availableToSubmit && !isLoading,
          })}
          onClick={handleSubmit}
          disabled={!availableToSubmit}
        >
          {isLoading ? (
            <div className={"loaderMini"}></div>
          ) : (
            <div>Создать публикацию</div>
          )}
        </button>
      </form>
    </div>
  );
}
