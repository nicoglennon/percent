import React from 'react';
import CategoryPill from './categoryPill';

const WelcomePageContentSecondPage = ({}) => (
  <div>
    <h2 className="welcomePageContent-TourPageTitle"><span className="welcomePageContent-TourPageTitle-Lighter">1. Set your</span> Goals  ✍️</h2>
    <p>First and foremost, create the set of weekly goals you want to be  <strong>repeatedly accomplishing</strong>.</p>
    <p>Here are some examples of weekly goals:</p>
    <div className="goalLineWrapper"><CategoryPill edit={true} category={null} /><span className="goalLineInput">Read this week's&nbsp;<i>New Yorker</i></span></div>
    <div className="goalLineWrapper"><CategoryPill edit={true} category={null} /><span className="goalLineInput">FaceTime Mom</span></div>
    <div className="goalLineWrapper"><CategoryPill edit={true} category={null} /><span className="goalLineInput">Work on my side project</span></div>
  </div>
);

export default WelcomePageContentSecondPage
