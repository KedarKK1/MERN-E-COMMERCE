import React from 'react';
import playstore from '../../../images/playstore.png';
import appstore3 from '../../../images/appstore.jpg';
import './footer.css';

const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftFooter">
          <h4>Download our app</h4>
          <p>Download our app for Android and ios mobiles </p>
          <img src={playstore} alt="playstore img" />
          <img src={appstore3} alt="appstore img" />
        </div>

        <div className="midFooter">
          <h1>Ecommerce</h1>
          <p>High quality is our motto</p>
          <p>Coryright 2022 &copy; KedarKoshti</p>
        </div>

        <div className="rightFooter">
          <h4>Follow Us</h4>
          <a href="http://www.linkedin.com/in/KedarKoshti">LinkedIn</a>
          <a href="http://www.instgram.com/in/KedarKoshti">Instagram</a>
          <a href="http://www.facebook.com/in/KedarKoshti">Facebook</a>
        </div>

    </footer>
  )
}

export default Footer