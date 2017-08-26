import React from 'react';
import FirebaseAuthBar from '../../modules/Firebase/AuthBar';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      Powered by an <a target="_blank" href="https://github.com/FrontendAwesome/air-potato">Air Potato</a>!
      | <FirebaseAuthBar />
    </div>
  </footer>
);

export default Footer;
