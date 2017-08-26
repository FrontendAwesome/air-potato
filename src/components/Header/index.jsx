import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => (
    <header className="header">
      <NavLink className="logo" to="/">Home</NavLink>
      <nav className="nav">
        <NavLink className="nav__item" to="/">About</NavLink>
        <NavLink className="nav__item" to="/">Contact</NavLink>
        <NavLink className="nav__item" to="/">Live Results</NavLink>
        <NavLink className="nav__item nav__item--donate" to="/">Donate</NavLink>
      </nav>
    </header>
);

export default Header;
