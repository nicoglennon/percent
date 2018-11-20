import React from 'react';

const WelcomePageContentThirdPage = ({}) => (
  <div>
    <h2 className="welcomePageContent-TourPageTitle"><span className="welcomePageContent-TourPageTitle-Lighter">2. Track your</span> Weeks <span className="welcomePageContent-emoji">🗓</span></h2>
    <p>Create a week by clicking the 'New Week' button. </p>
    <p>All your goals will be pulled in, and you can check off what you've completed that week.</p>
    <div className="goalLineWrapper"><input className="goalLineCheck" type="checkbox" checked={true} readOnly={true}/>Read this week's <i>New Yorker</i></div>
    <div className="goalLineWrapper"><input className="goalLineCheck" type="checkbox" checked={false} readOnly={true}/>Work on my side project on the weekend</div>
    <div className="goalLineWrapper"><input className="goalLineCheck" type="checkbox" checked={true} readOnly={true}/>FaceTime Mom</div>
  </div>
);

export default WelcomePageContentThirdPage
