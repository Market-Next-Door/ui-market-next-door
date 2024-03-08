import React from 'react';
import './Header.css';
import { HeaderProps } from '../../types';

const Header = ({ name, greeting }: HeaderProps) => {
  return (
    <div className="mnd-header">
      {greeting} {name}!
    </div>
  );
};

export default Header;
