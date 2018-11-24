import React from 'react';
import WeekSVG from '../assets/images/calendar.svg';

const WelcomePageContentThirdPage = ({}) => (
  <div>
    <h2 className="welcomePageContent-TourPageTitle"><span className="welcomePageContent-TourPageTitle-Lighter">2. Track your</span> Weeks <img src={WeekSVG} className="welcomePageContent-bigiconsvg"/></h2>
    <p>Create a week by clicking the 'New Week' button. </p>
    <p>All your goals will be pulled in, and you can check off what you've completed that week:</p>
    <div className="goalLineWrapper goalLineWrapper-completed "><input className="goalLineCheck" type="checkbox" checked={true} readOnly={true}/>Read this week's <i>New Yorker</i></div>
    <div className="goalLineWrapper"><input className="goalLineCheck" type="checkbox" checked={false} readOnly={true}/>Work on my side project on the weekend</div>
    <div className="goalLineWrapper goalLineWrapper-completed "><input className="goalLineCheck" type="checkbox" checked={true} readOnly={true}/>FaceTime Mom</div>
  </div>
);

export default WelcomePageContentThirdPage
