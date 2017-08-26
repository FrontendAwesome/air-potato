import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navToggle: false,
    };
  }
  render() {
    const { navToggle } = this.state;
    return (
      <header className="header">
        <NavLink className="logo" to="/">Home</NavLink>
        <button
          type="button"
          className={`nav__button ${navToggle ? 'js-navToggle--active' : ''}`}
          onClick={() => { this.setState({
            navToggle: !navToggle,
          })}}
        >
          Open Navigation
        </button>
        <nav className={`nav ${navToggle ? 'js-navToggle--active' : ''}`}>
          <NavLink className="nav__item" to="/">About</NavLink>
          <NavLink className="nav__item" to="/">Contact</NavLink>
          <NavLink className="nav__item" to="/">Live Results</NavLink>
          <NavLink className="nav__item nav__item--donate" to="/">Donate</NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
