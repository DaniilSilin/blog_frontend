import React, { ChangeEvent, FormEvent } from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useRouter } from "next/router";
import { PlusOutlined } from "@ant-design/icons/lib";
import type { InputRef } from "antd/lib";
import { Input, Tag, theme } from "antd/lib";
import TweenOne from "rc-tween-one/lib/TweenOne";
import { IoReturnDownBack } from "react-icons/io5";
import Link from "next/link";
import {
  titleValidator,
  bodyValidator,
  mapValidator,
} from "../form/validators";
import classNames from "classnames";
import {
  Map,
  PostDataInput,
  PostDataTextArea,
} from "../../../components/modules/form";

import styles from "./PostCreate.module.css";

export default function PostCreate({ slug }) {
  const router = useRouter();
  const [displayMapInput, setDisplayMapInput] = React.useState(false);
  const { token } = theme.useToken();
  const [inputVisible, setInputVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<InputRef>(null);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, `#${inputValue}`]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag: string) => (
    <span key={tag} style={{ display: "inline-block" }}>
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    </span>
  );

  const tagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  const [title, setTitle] = React.useState<string>("");
  const [body, setBody] = React.useState<string>("");
  const [map, setMap] = React.useState<string>("");
  const [isPublished, setIsPublished] = React.useState<boolean>(false);
  const [tags, setTags] = React.useState([]);
  const tagChild = tags.map(forMap);
  const [availableToSubmit, setAvailableToSubmit] = React.useState(false);

  const [createPost] = DjangoService.useCreatePostMutation();

  const [titleError, setTitleError] = React.useState<string>("");
  const [bodyError, setBodyError] = React.useState<string>("");
  const [mapError, setMapError] = React.useState<string>("");

  const handleChangeCheckbox = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIsPublished(e.target.checked);
    },
    [],
  );

  React.useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

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
      map,
      is_published: isPublished,
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
        <div>
          <Link href={`/blog/${slug}/`} className={styles.returnToBlog}>
            <IoReturnDownBack />
            <div>Вернуться на страницу блога</div>
          </Link>
        </div>
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
          <>
            <Map
              width={400}
              height={120}
              onChange={setMap}
              label={"Вставьте ссылку на карту"}
              error={mapError}
              defaultValue={map}
              value={map}
            />
            <div>
              <a href={`https://yandex.ru/map-constructor/`} target={"_blank"}>
                Вставьте карту через сервис Яндекса
              </a>
            </div>
          </>
        )}
        <div className={styles.tagListContainer}>
          <TweenOne
            style={{ marginBottom: "10px" }}
            appear={false}
            enter={{ scale: 0.8, opacity: 0, type: "from", duration: 100 }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            onEnd={(e) => {
              if (e.type === "appear" || e.type === "enter") {
                (e.target as any).style = "display: inline-block";
              }
            }}
          >
            {tagChild}
          </TweenOne>
          {inputVisible ? (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          ) : (
            <Tag onClick={showInput} style={tagPlusStyle}>
              <PlusOutlined /> Новый тэг
            </Tag>
          )}
        </div>
        <div style={{ margin: "10px 0", cursor: "pointer" }}>
          <label style={{ cursor: "pointer" }}>
            <input
              type={"checkbox"}
              style={{ marginRight: "5px", cursor: "pointer" }}
              onChange={handleChangeCheckbox}
            />
            Опубликовать
          </label>
        </div>
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
