import React from 'react';
import FirebaseAuthBar from '../../modules/Firebase/AuthBar';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <FirebaseAuthBar /> &nbsp;&nbsp;|&nbsp;&nbsp; Powered by an <a target="_blank" rel="noopener noreferrer" href="https://github.com/FrontendAwesome/air-potato">Air Potato</a>!
    </div>
  </footer>
);

export default Footer;
