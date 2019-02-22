import React from 'react';
import FlagSVG from '../assets/images/flag.svg';
import CategoryPill from './categoryPill';

const WelcomePageContentSecondPage = ({}) => (
  <div>
    <h2 className="welcomePageContent-TourPageTitle"><span className="welcomePageContent-TourPageTitle-Lighter">1. Set your</span> Goals <img src={FlagSVG} className="welcomePageContent-bigiconsvg"/></h2>
    <p>Create the set of goals you want to achieve every week.</p>
    <p>Here are some examples of weekly goals:</p>
    <div className="goalLineWrapper"><CategoryPill edit={true} category={null} /><span className="goalLineInput">Read this week's&nbsp;<i>New Yorker</i></span></div>
    <div className="goalLineWrapper"><CategoryPill edit={true} category={null} /><span className="goalLineInput">FaceTime Mom</span></div>
    <div className="goalLineWrapper"><CategoryPill edit={true} category={null} /><span className="goalLineInput">Launch my side project</span></div>
  </div>
);

export default WelcomePageContentSecondPage
