import React from 'react';
import Dog from '../assets/images/doggy.jpg';

const WelcomePageContentSixthPage = ({}) => (
  <div>
    <h2 className="welcomePageContent-TourPageTitle">Get Started 💫</h2>
    <p>If you want to run this tour again later, click on <strong>Tour</strong> in the user icon dropdown menu.</p>
    <p>Ready to start using <strong>Percent</strong>? Click below to continue!</p>
    <div className="welcomePageContent-LastPageImageWrapper">
      <img src={Dog} className="WelcomePageContent-GetStarted-Image" />
    </div>
  </div>
);

export default WelcomePageContentSixthPage
