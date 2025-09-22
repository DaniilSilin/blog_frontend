import React from "react";

import { PlusOutlined } from "@ant-design/icons/lib";
import type { InputRef } from "antd/lib";
import { Input, Tag, theme } from "antd/lib";
import TweenOne from "rc-tween-one/lib/TweenOne";

import styles from "@/app/components/modules/post_create/PostCreate.module.css";

export interface Props {
  tags: any;
  setTags: any;
}

export default function Tags({ tags, setTags }: Props) {
  const { token } = theme.useToken();

  const [inputVisible, setInputVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<InputRef>(null);

  const handleClose = (removedTag: string) => {
    // @ts-ignore
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
  const tagChild = tags.map(forMap);

  React.useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  return (
    <div style={{ margin: "12px 0", width: "400px" }}>
      <TweenOne
        style={{ marginBottom: "10px" }}
        // @ts-ignore
        appear={false}
        enter={{ scale: 0.8, opacity: 0, type: "from", duration: 100 }}
        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
        // @ts-ignore
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
  );
}
