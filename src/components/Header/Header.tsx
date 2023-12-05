import React from "react";
import "./Header.css";

type HeaderProps = {
  name: string;
}
const Header = ({name}: HeaderProps) => {
  return <div className="mnd-header">Welcome, {name}!</div>;
};

export default Header;
