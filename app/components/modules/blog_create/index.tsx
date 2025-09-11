import React, { FormEvent } from "react";
import DjangoService from "@/app/store/services/DjangoService";
import { useRouter } from "next/router";
import classNames from "classnames";

import AvatarUpload from "@/app/components/modules/blog_create/AvatarUpload";
import validateField from "@/app/utils/validator";

import { slugValidator, titleValidator } from "../../modules/form/validators";
import {
  BlogSlugInput,
  PostDataInput,
  PostDataTextArea,
} from "../../../components/modules/form";

import styles from "./blog_create.module.css";

export default function BlogCreate() {
  const router = useRouter();
  const [submitAvailable, setSubmitIsAvailable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [title, setTitle] = React.useState<string>("");
  const [slug, setSlug] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const [createBlog] = DjangoService.useCreateBlogMutation();

  const { data: blog_slug } = DjangoService.useGetBlogSlugQuery({ slug });

  const [imageSource, setImageSource] = React.useState<any>(null);
  const [imageSourceUrl, setImageSourceUrl] = React.useState("");
  const [croppedImage, setCroppedImage] = React.useState<any>(null);
  const [croppedImageUrl, setCroppedImageUrl] = React.useState();

  const [imageErrorMessage, setImageErrorMessage] = React.useState("");

  const [titleError, setTitleError] = React.useState<string>("");
  const [slugError, setSlugError] = React.useState<string>("");

  const formValidation = React.useCallback(() => {
    const titleValue = validateField(
      title,
      null,
      titleValidator,
      setTitleError,
    );
    const slugValue = validateField(
      slug,
      blog_slug,
      slugValidator,
      setSlugError,
    );

    return titleValue && slugValue;
  }, [title, slug, blog_slug, setSlugError, setTitleError]);

  React.useEffect(() => {
    const isValid = formValidation();
    if (isValid && title && slug && blog_slug === "Адрес свободен") {
      setSubmitIsAvailable(true);
    } else {
      setSubmitIsAvailable(false);
    }
  }, [title, slug, blog_slug, formValidation]);

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
      setIsLoading(true);
      try {
        const result = await createBlog({ formData });
        if (!result.error) {
          router.push(`/blog/${slug}/`);
        }
      } catch (error) {
        console.error("Ошибка при отправке комментария:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // React.useEffect(() => {
  //   if (slug && !slugError) {
  //     triggerQuery({ slug });
  //   }
  // }, [slug, slugError, triggerQuery]);

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit}>
        <AvatarUpload
          imageSource={imageSource}
          setImageSource={setImageSource}
          imageSourceUrl={imageSourceUrl}
          setImageSourceUrl={setImageSourceUrl}
          croppedImage={croppedImage}
          setCroppedImage={setCroppedImage}
          croppedImageUrl={croppedImageUrl}
          setCroppedImageUrl={setCroppedImageUrl}
          setImageErrorMessage={setImageErrorMessage}
        />
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
          maxLength={300}
          autoSize
          showCount
        />
        <button
          onClick={handleSubmit}
          disabled={!submitAvailable}
          className={classNames(styles.buttonSubmit, {
            [styles.active]: submitAvailable && !isLoading,
          })}
        >
          {isLoading ? (
            <div className={"loaderMini"}></div>
          ) : (
            <div>Создать</div>
          )}
        </button>
      </form>
    </div>
  );
}
