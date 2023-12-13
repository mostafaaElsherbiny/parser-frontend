import React, { useState } from "react";
import "./login-form.scss";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../../api/auth/auth";
import { setToken } from "../../../../utils/authLocalStorage";

const { Item } = Form;

interface props {}
const LoginForm: React.FC<props> = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");

  const onFinish = (values: { email: string; password: string }) => {
    authApi({ email: values.email, password: values.password })
      .then((response) => {
        if (response && response.data && response.data.access_token) {
          setToken(response.data.access_token);
          navigate("/");
        }
      })
      .catch((e) => {
        onFinishFailed(e);
      });
  };

  interface response {
    data: {
      message: string;
      errors: {
        property: string;
        message: string;
      }[];
    };
  }
  const onFinishFailed = (e: { response: response }) => {
    if (e.response && e.response.data) {
      if (e.response.data.message) {
        setError(e.response.data.message);
      }
      if (e.response.data.errors) {
        setError(
          e.response.data.errors
            .map(
              (item: { property: string; message: string }) =>
                `(${item.property})${item.message}`
            )
            .join(", ")
        );
      }
    }
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
          <Button type="primary">
            register now!
          </Button>
        </Link>
      </Item>
      <Item>
        {error.length > 0 && <p className={"login-form__error"}>{error}</p>}
      </Item>
    </Form>
  );
};

export default LoginForm;
