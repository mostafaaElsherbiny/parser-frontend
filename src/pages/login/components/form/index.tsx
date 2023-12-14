import React, { useState } from "react";
import "./login.scss";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../../api/auth/auth";
import { setToken } from "../../../../utils/authLocalStorage";
import onFinishFailed from "@/utils/onFinishFailed";

const { Item } = Form;

interface props {}
const LoginForm: React.FC<props> = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");

  const onFinish = (values: { email: string; password: string }) => {
    authApi({ email: values.email, password: values.password })
      .then((response) => {
        const { data } = response;
        if (data && data.access_token) {
          setToken(data.access_token);
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
        <Input.Password size={"large"} />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Item>
      <Item>
        <Link type="primary" to={"/register"}>
          <Button type="primary">register now!</Button>
        </Link>
      </Item>
      <Item>
        {error.length > 0 && <p className={"login-form__error"}>{error}</p>}
      </Item>
    </Form>
  );
};

export default LoginForm;
