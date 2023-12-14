import { useState, useEffect } from "react";
import "./layout.scss";
import { ConfigProvider, Layout, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/icons/logo.svg";
import logoutIcon from "@/assets/icons/logout.svg";
import personsIcon from "@/assets/icons/persons.svg";

import { Content } from "antd/es/layout/layout";
import Header from "./components/header";
import { useWindowSize } from "@/hooks/useWindowSize";
import { getToken, removeToken } from "@/utils/authLocalStorage";
const LayoutMain = () => {
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const token = getToken();
  const logout = () => {
    removeToken();
    navigate("/login");
  };
  useEffect(() => {
    if (!token && pathname !== "/register") {
      removeToken();
      navigate("/login");
    }
  }, [token, navigate, pathname]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const items: MenuProps["items"] = [
    {
      key: "/",
      label: <Link to="/articles">Articles</Link>,
      icon: <img src={personsIcon} alt="" />,
    },
    {
      key: "/logout",
      label: (
        <Link to="/" onClick={logout}>
          logout
        </Link>
      ),
      icon: <img src={logoutIcon} alt="" />,
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
