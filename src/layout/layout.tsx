import React, { useState, useEffect } from "react";
import "./layout.scss";
import { ConfigProvider, Layout, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo.svg";
import { Content } from "antd/es/layout/layout";
import Header from "./components/header/header";
import { useWindowSize } from "../hooks/useWindowSize";
import { getToken, removeToken } from "../utils/authLocalStorage";

interface props {}

const LayoutMain: React.FC<props> = () => {
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const token = getToken();
  const logout = () => {
    removeToken();
    navigate("/login");
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!token && pathname !== "/register") {
      removeToken();
      navigate("/login");
    }
  }, [token, navigate]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const items: MenuProps["items"] = [
    {
      key: "/",
      label: <Link to="/articles">Articles</Link>,
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8001 12.3432C4.18912 12.3432 0.559143 15.4385 0.559143 21.0939V21.6671H21.0798V21.0939C21.0416 15.4765 17.4114 12.3432 10.8005 12.3432H10.8001Z"
            fill="#FFFFFF"
          />
          <path
            d="M10.8001 11.4646C13.6279 11.4646 15.9208 8.7896 15.9208 5.54132C15.9208 2.36973 13.7045 0.000427246 10.8001 0.000427246C7.8957 0.000427246 5.67939 2.36959 5.67939 5.54132C5.67939 8.82761 7.97204 11.4641 10.8001 11.4641V11.4646Z"
            fill="#FFFFFF"
          />
        </svg>
      ),
    },
    {
      key: "/logout",
      label: (
        <Link to="/" onClick={logout}>
          logout
        </Link>
      ),
      icon: (
        <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 14.5L5.625 13.05L8.175 10.5H0V8.5H8.175L5.625 5.95L7 4.5L12 9.5L7 14.5ZM9 18.5V16.5H16V2.5H9V0.5H18V18.5H9Z"
            fill="#ffffff"
          />
        </svg>
      ),
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        breakpoint="md"
        collapsedWidth={width && width <= 767 ? 0 : undefined}
        collapsed={collapsed}
        onCollapse={(value: boolean) => setCollapsed(value)}
      >
        <div className={"layout__logo"}>
          <h1>
            <img src={logo} alt="logo" />
          </h1>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#357EEC",
            },
          }}
        >
          <Menu
            theme="dark"
            selectedKeys={[pathname]}
            mode="inline"
            defaultOpenKeys={["/articles"]}
            defaultSelectedKeys={["/"]}
            items={items}
          />
        </ConfigProvider>
      </Sider>
      <Layout className="site-layout">
        <Header />
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutMain;
