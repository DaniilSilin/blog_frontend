import React, { ChangeEvent, FormEvent } from "react";
import DjangoService from "@/app/store/services/DjangoService";
import NextImage from "next/image";
import { useRouter } from "next/router";
import classNames from "classnames";

import AvatarModal from "@/app/components/modules/avatar_modal";

import { slugValidator, titleValidator } from "../../modules/form/validators";
import {
  BlogSlugInput,
  PostDataInput,
  PostDataTextArea,
} from "../../../components/modules/form";

import styles from "./blog_create.module.css";

const MIN_AVATAR_SIZE_IN_MB = 4194304;
const MIN_DIMENSION_AVATAR = 100;

export default function BlogCreate() {
  const router = useRouter();
  const divRef = React.useRef(null);
  const [submitAvailable, setSubmitIsAvailable] = React.useState(false);

  const [title, setTitle] = React.useState<string>("");
  const [slug, setSlug] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const [createBlog] = DjangoService.useCreateBlogMutation();
  const [triggerQuery, { data: blog_slug }] =
    DjangoService.useLazyGetBlogSlugQuery();

  const [imageSource, setImageSource] = React.useState<any>(null);
  const [imageSourceUrl, setImageSourceUrl] = React.useState("");
  const [croppedImage, setCroppedImage] = React.useState<any>(null);
  const [croppedImageUrl, setCroppedImageUrl] = React.useState();

  const [imageErrorMessage, setImageErrorMessage] = React.useState("");

  const [titleError, setTitleError] = React.useState<string>("");
  const [slugError, setSlugError] = React.useState<string>("");

  const onSelectAvatar = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setImageErrorMessage("");
      const file = e.target.files?.[0];
      if (!file) return;

      const fileSize = file?.size;
      console.log(fileSize);
      if (fileSize >= MIN_AVATAR_SIZE_IN_MB) {
        setImageErrorMessage("Файл не может превышать размер 4 Мб!");
      }
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageElement = new Image();
        const imageUrl = reader.result?.toString() || "";
        imageElement.src = imageUrl;

        imageElement.addEventListener("load", (e) => {
          // @ts-ignore
          const width = e.currentTarget.width;
          // @ts-ignore
          const height = e.currentTarget.height;
          if (width < MIN_DIMENSION_AVATAR || MIN_DIMENSION_AVATAR > height) {
            setImageErrorMessage(
              "Минимальный размер изображения – 99 x 99 пикс.",
            );
            setImageSource(undefined);
            imageSourceUrl("");
          } else {
            setImageSource(file);
            setImageSourceUrl(imageUrl);
          }
        });
      });
      reader.readAsDataURL(file);
    },
    [setCroppedImage, setImageSource, setImageErrorMessage],
  );

  React.useEffect(() => {
    if (imageSource) {
      // @ts-ignore
      divRef.current.style.display = "block";
    } else {
      // @ts-ignore
      divRef.current.style.display = "none";
    }
  }, [imageSource]);

  const formValidation = React.useCallback(() => {
    let isValid = false;

    if (titleValidator(title)) {
      setTitleError(titleValidator(title));
      isValid = false;
    } else {
      setTitleError("");
      isValid = true;
    }

    if (slugValidator(slug)) {
      setSlugError(slugValidator(slug));
      isValid = false;
    } else {
      setSlugError("");
      isValid = true;
    }
    if (blog_slug === "Адрес свободен") {
      isValid = true;
    }
    if (blog_slug === "Этот адрес уже занят") {
      isValid = false;
    }

    return isValid;
  }, [title, slug, setSlugError, setTitleError]);

  React.useEffect(() => {
    formValidation();
    const isValid = formValidation();
    if (isValid && title && slug) {
      setSubmitIsAvailable(true);
    } else {
      setSubmitIsAvailable(false);
    }
  }, [title, slug]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let isValid = formValidation();

    if (isValid) {
      const formData = new FormData();
      if (croppedImage) {
        formData.append("avatar_small", croppedImage);
        formData.append("avatar", imageSource);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("slug", slug);
      } else {
        formData.append("title", title);
        formData.append("description", description);
        formData.append("slug", slug);
      }
      const result = await createBlog({ formData });
      if (!result.error) {
        router.push(`/blog/${slug}/`);
      }
    }
  };

  React.useEffect(() => {
    if (slug && !slugError) {
      triggerQuery({ slug });
    }
  }, [slug, slugError, triggerQuery]);

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit}>
        <div className={styles.avatarContainer}>
          <label>
            <NextImage
              src={
                croppedImageUrl
                  ? croppedImageUrl
                  : "/img/default/avatar_default.jpg"
              }
              className={styles.avatar}
              width={100}
              height={100}
              alt={""}
            />
            <input
              style={{ display: "none" }}
              type={"file"}
              accept={"image/*"}
              onChange={onSelectAvatar}
            />
          </label>
        </div>
        <div ref={divRef} className="modal_3">
          <div className="modalContent_3" style={{ margin: "10% auto" }}>
            <AvatarModal
              setImageSource={setImageSource}
              imageSourceUrl={imageSourceUrl}
              setImageSourceUrl={setImageSourceUrl}
              setCroppedImageUrl={setCroppedImageUrl}
              imageSource={imageSource}
              croppedImage={croppedImage}
              setCroppedImage={setCroppedImage}
              ref={divRef}
            />
          </div>
        </div>
        <PostDataInput
          width={600}
          height={40}
          label={"Название канала"}
          onChange={setTitle}
          maxLength={50}
          error={titleError}
        />
        <BlogSlugInput
          width={600}
          height={40}
          label={"Ссылка на сайт"}
          onChange={setSlug}
          maxLength={25}
          description={"Задайте уникальное значение"}
          error={slugError}
          blog_slug={blog_slug}
          value={slug}
        />
        <PostDataTextArea
          width={600}
          height={120}
          label={"Описание"}
          onChange={setDescription}
          maxLength={200}
          autoSize={true}
          showCount={true}
        />
        <button
          onClick={handleSubmit}
          disabled={!submitAvailable}
          className={classNames(styles.buttonSubmit, {
            [styles.active]: submitAvailable,
          })}
        >
          Создать
        </button>
      </form>
    </div>
  );
}
