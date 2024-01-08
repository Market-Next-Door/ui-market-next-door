import React from 'react';
import './Header.css';

type HeaderProps = {
  name: string;
  greeting?: string;
};
const Header = ({ name, greeting }: HeaderProps) => {
  return (
    <div className="mnd-header">
      {greeting} {name}!
    </div>
  );
};

export default Header;
