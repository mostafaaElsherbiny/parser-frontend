import React from "react";
import "./register-page.scss";
import { Card, Col, Row, Typography } from "antd";
import RegisterForm from "./components/register-form/register-form";

const { Title } = Typography;

interface props {}

const RegisterPage: React.FC<props> = () => {
  return (
    <section className={"register"}>
      <div className={"container"}>
        <Row
          justify={"space-between"}
          className={"register__wrapper"}
          align={"middle"}
        >
          <Col xl={12} md={12} className={"register__item"}>
            <Card style={{ paddingTop: "50px" }}>
              <Title className={"register__welcome"}>create account now </Title>
              <RegisterForm />
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default RegisterPage;