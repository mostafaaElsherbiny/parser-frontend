import React, { useState } from "react";
import "./form.scss";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "@/api/auth";
import { setToken } from "@/utils/authLocalStorage";
import onFinishFailed from "@/utils/onFinishFailed";

const { Item } = Form;

const RegisterForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");

  const onFinish = (values: {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
  }) => {
    registerApi({
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
      name: values.name,
    })
      .then((response) => {
        if (response && response.data && response.data.access_token) {
          setToken(response.data.access_token);
          navigate("/");
        }
      })
      .catch((e: any) => {
        onFinishFailed(e, setError);
      });
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Item
        label="name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input size={"large"} />
      </Item>

      <Item
        label="email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input size={"large"} />
      </Item>
      <Item
        label="password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password autoComplete="new-password" size={"large"} />
      </Item>

      <Item
        label="password confirmation"
        name="password_confirmation"
        rules={[
          {
            required: true,
            message: "Please input your password confirmation!",
          },
        ]}
      >
        <Input.Password size={"large"} />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Item>
      <Item>
        Already have an account? <br />
        <Link to={"/login"}>Login</Link>
      </Item>
      <Item>
        {error.length > 0 && <p className={"register-form__error"}>{error}</p>}
      </Item>
    </Form>
  );
};

export default RegisterForm;
