import React from "react";
import __Input from "@/app/components/modules/form/Input";
import DjangoService from "@/app/store/services/DjangoService";
import { Button, Divider, Input, Select, Space } from "antd/lib";
import SelectField from "@/app/components/modules/form/SelectField";

export default function Invite() {
  const [addressee, setAddressee] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [blog, setBlog] = React.useState<string>("");

  const [inviteToBlog] = DjangoService.useInviteUserToBlogMutation();
  const { data } = DjangoService.useGetUserDataQuery();
  const { data: blog_owner_list } = DjangoService.useGetBlogOwnerListQuery();

  const inviteToBlogOnClick = () => {
    inviteToBlog({ addressee, description, blog: blog, admin: data.id });
  };

  const [username, setUsername] = React.useState<string>("");
  const { data: user_list } = DjangoService.useGetUsersQuery({ username });
  const { data: userList } = DjangoService.useGetUsersQuery({ username: "a" });
  const [value, setValue] = React.useState("admin");

  return (
    <div>
      <div>Создать приглашение в Блог</div>
      <__Input
        width={300}
        height={50}
        onChange={setDescription}
        label={"Текст приглашения"}
      />
      <div>Выбрать блог</div>
      <Select
        showSearch
        placeholder="Выбрать блог"
        options={blog_owner_list}
        style={{ width: "300px" }}
        onChange={setBlog}
      />
      <SelectField options={userList} value={value} setValue={setValue} />
      <input
        style={{ display: "block" }}
        type={"submit"}
        value={"Отправить приглашение"}
        onClick={inviteToBlogOnClick}
      />
    </div>
  );
}
