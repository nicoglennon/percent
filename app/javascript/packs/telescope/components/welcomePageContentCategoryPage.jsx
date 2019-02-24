import React from 'react';
import CategoryPill from './categoryPill';
import FlagSVG from '../assets/images/flag.svg';

const WelcomePageContentCategoryPage = ({}) => (
  <div>
    <h2 className="welcomePageContent-TourPageTitle"><span className="welcomePageContent-TourPageTitle-Lighter">1. Set your</span> Goals  ✍️</h2>
    <p>Categorize each goal by clicking on the circle next to it and choosing <strong className="welcomePageContent-boldWordWork">Work</strong> or <strong  className="welcomePageContent-boldWordPersonal">Personal</strong>.</p>
    <p>Here's our goals already categorized:</p>
    <div className="goalLineWrapper"><CategoryPill edit={true} category={"Personal"} /><span className="goalLineInput">Read this week's&nbsp;<i>New Yorker</i></span></div>
    <div className="goalLineWrapper"><CategoryPill edit={true} category={"Personal"} /><span className="goalLineInput">FaceTime Mom</span></div>
    <div className="goalLineWrapper"><CategoryPill edit={true} category={"Work"} /><span className="goalLineInput">Launch my side project</span></div>
  </div>
);

export default WelcomePageContentCategoryPage
