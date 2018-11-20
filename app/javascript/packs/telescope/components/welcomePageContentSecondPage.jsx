import React from 'react';
import { Transition } from 'react-spring';

const WelcomePageContentSecondPage = ({}) => (
    <div>
      <h2 className="welcomePageContent-TourPageTitle"><span className="welcomePageContent-TourPageTitle-Lighter">1. Set your</span> Goals <span className="welcomePageContent-emoji">📝</span></h2>
      <p>Create the set of goals you want to achieve every single week.</p>
      <p>Here are some examples of weekly goals:</p>
      <div className="goalLineWrapper">Read this week's <i>New Yorker</i></div>
      <div className="goalLineWrapper">Work on my side project on the weekend</div>
      <div className="goalLineWrapper">FaceTime Mom</div>
    </div>
);

export default WelcomePageContentSecondPage
