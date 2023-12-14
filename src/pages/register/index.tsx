import "./register.scss";
import { Card, Col, Row, Typography } from "antd";
import RegisterForm from "./components/form/form";

const { Title } = Typography;

const RegisterPage = () => {
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
