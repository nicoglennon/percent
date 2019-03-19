import React from 'react';
import Dog from '../assets/images/doggy.jpg';

const WelcomePageContentSixthPage = ({}) => (
  <div>
    <h2 className="welcomePageContent-TourPageTitle">Get Started 💫</h2>
    <p>Ready to start using <strong>Percent</strong>? Click below to continue!</p>
    <div className="welcomePageContent-LastPageImageWrapper">
      <img src={Dog} className="WelcomePageContent-GetStarted-Image" />
    </div>
  </div>
);

export default WelcomePageContentSixthPage
