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
  const [isSubmitAvailable, setIsSubmitAvailable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [title, setTitle] = React.useState<string>("");
  const [slug, setSlug] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const [createBlog] = DjangoService.useCreateBlogMutation();

  const { data: blog_slug } = DjangoService.useGetBlogSlugQuery({ slug });

  const [sourceImageFile, setSourceImageFile] = React.useState<File | null>(
    null,
  );
  const [sourceImageUrl, setSourceImageUrl] = React.useState<string>("");
  const [croppedImageFile, setCroppedImageFile] = React.useState<File | null>(
    null,
  );
  const [croppedImageUrl, setCroppedImageUrl] = React.useState<string>("");

  const [imageErrorMessage, setImageErrorMessage] = React.useState("");

  const [titleError, setTitleError] = React.useState<string>("");
  const [slugError, setSlugError] = React.useState<string>("");

  const formValidation = React.useCallback(() => {
    const titleField = validateField(
      title,
      undefined,
      titleValidator,
      setTitleError,
    );
    const slugField = validateField(
      slug,
      blog_slug,
      slugValidator,
      setSlugError,
    );
    return titleField && slugField;
  }, [title, slug, blog_slug]);

  React.useEffect(() => {
    const isValid = formValidation();
    setIsSubmitAvailable(isValid);
  }, [title, slug, blog_slug]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    formValidation();
    if (isSubmitAvailable) {
      const formData = new FormData();
      if (croppedImageFile && sourceImageFile) {
        formData.append("avatar_small", croppedImageFile);
        formData.append("avatar", sourceImageFile);
      }
      formData.append("title", title);
      formData.append("description", description);
      formData.append("slug", slug);
      setIsLoading(true);
      try {
        const result = await createBlog({ formData });
        // @ts-ignore
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

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit}>
        <AvatarUpload
          sourceImageFile={sourceImageFile}
          setSourceImageFile={setSourceImageFile}
          sourceImageUrl={sourceImageUrl}
          setSourceImageUrl={setSourceImageUrl}
          setCroppedImageFile={setCroppedImageFile}
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
          disabled={!isSubmitAvailable}
          className={classNames(styles.buttonSubmit, {
            [styles.active]: isSubmitAvailable && !isLoading,
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
