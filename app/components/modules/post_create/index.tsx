import React, { ChangeEvent } from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useRouter } from "next/router";
import { PlusOutlined } from "@ant-design/icons/lib";
import type { InputRef } from "antd/lib";
import { Input, Tag, theme } from "antd/lib";
import TweenOne from "rc-tween-one/lib/TweenOne";

import { titleValidator, mapValidator } from "../form/validators";
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

  const [createPost, { isSuccess, isLoading }] =
    DjangoService.useCreatePostMutation();

  const [titleError, setTitleError] = React.useState<string>("");
  const [mapError, setMapError] = React.useState<string>("");

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

    return isValid;
  }, [title, map, setTitleError, mapValidator]);

  const submitPost = () => {
    createPost({
      title,
      body,
      map,
      is_published: isPublished,
      blog: slug,
      tags: tags.join(" "),
    });
  };

  React.useEffect(() => {
    formValidation();
  }, [title, map]);

  if (isSuccess) {
    router.push({
      pathname: `blog/${slug}/post/${1}/`,
    });
  }

  return (
    <div>
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
      <label>
        <input type={"checkbox"} />
        Опубликовать позже
      </label>
      <input
        type={"submit"}
        style={{ display: "block", marginTop: "10px" }}
        disabled={isLoading}
        onClick={submitPost}
        value={"Опубликовать"}
      />
    </div>
  );
}
