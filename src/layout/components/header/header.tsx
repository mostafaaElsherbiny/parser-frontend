import React from "react";
import "./header.scss";
import { useLocation } from "react-router-dom";
import SearchAutoComplete from "./components/search-auto-complete/search-auto-complete";
import Profile from "./components/profile/profile";

interface props {}

const Header: React.FC<props> = () => {
  const { pathname } = useLocation();

  const titleHandler = () => {
    if (pathname.includes("articles")) {
      return "articles";
    }

    return "articles";
  };

  return (
    <header className={"header"}>
      <h1 className={"header__title"}>{titleHandler()}</h1>
      <div className={"header__info"}>
        <SearchAutoComplete />
        <Profile />
      </div>
    </header>
  );
};

export default Header;
