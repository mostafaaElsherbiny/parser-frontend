import React from "react";
import "./login.scss";
import { Card, Col, Row, Typography } from "antd";
import LoginForm from "./components/form";

const { Title } = Typography;

interface props {}

const Login: React.FC<props> = () => {
  return (
    <section className={"login"}>
      <div className={"container"}>
        <Row
          justify={"space-between"}
          className={"login__wrapper"}
          align={"middle"}
        >
          <Col xl={12} md={12} className={"login__item"}>
            <Card style={{ paddingTop: "50px" }}>
              <Title className={"login__welcome"}>welcome to parser page</Title>
              <LoginForm />
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Login;
