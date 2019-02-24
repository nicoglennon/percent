import React from 'react';
import WeekSVG from '../assets/images/calendar.svg';
import CategoryPill from './categoryPill';

const WelcomePageContentThirdPage = ({}) => (
  <div>
    <h2 className="welcomePageContent-TourPageTitle"><span className="welcomePageContent-TourPageTitle-Lighter">2. Track your</span> Weeks 🗓</h2>
    <p>Once a week, click on the <strong>New Week</strong> button. </p>
    <p>All your goals will be pulled in, and you can check off what you've completed that week:</p>
    <div className="goalLineWrapper"><input className="goalLineCheck" type="checkbox" checked={false} readOnly={true}/><span className="goalLineInput">Read this week's&nbsp;<i>New Yorker</i></span><CategoryPill edit={false} category={"Personal"} /></div>
    <div className="goalLineWrapper goalLineWrapper-completed"><input className="goalLineCheck" type="checkbox" checked={true} readOnly={true}/><span className="goalLineInput">FaceTime Mom</span><CategoryPill edit={false} category={"Personal"} /></div>
    <div className="goalLineWrapper goalLineWrapper-completed"><input className="goalLineCheck" type="checkbox" checked={true} readOnly={true}/><span className="goalLineInput">Launch my side project</span><CategoryPill edit={false} category={"Work"} /></div>
  </div>
);

export default WelcomePageContentThirdPage
