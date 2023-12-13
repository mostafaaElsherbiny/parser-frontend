import React, { useState } from "react";
import "./register-form.scss";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { authApi, registerApi } from "../../../../api/auth/auth";
import { setToken } from "../../../../utils/authLocalStorage";

const { Item } = Form;

interface props {}
const RegisterForm: React.FC<props> = () => {
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
        <Input.Password  size={"large"} />
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
