import React from 'react';
import { Line } from 'rc-progress';
import WeekSVG from '../assets/images/calendar.svg';

const WelcomePageContentFourthPage = ({}) => (
  <div>
    <h2 className="welcomePageContent-TourPageTitle"><span className="welcomePageContent-TourPageTitle-Lighter">2. Track your</span> Weeks <img src={WeekSVG} className="welcomePageContent-bigiconsvg"/></h2>
    <p>Watch your completion rate will increase as you check off your goals:</p>
    <div className="weekPageContent-percentagesWrapper">
      <p className="weekPageContent-weekOfSubtitle">Completion</p>
      <p className="weekPageContent-percentageText">
        <strong>{"85"}</strong>
        {'%'}
      </p>
      <div className="weekPage-progressLineContainer">
        <Line
          percent={85}
          strokeWidth="2"
          trailWidth="2"
          strokeLinecap="round"
          strokeColor="hsla(160,100%,40%, 0.8)"
          trailColor="#f3f3f3"
        />
      </div>
    </div>
      <p>Don't forget to select the date range using the calendar!</p>
    <p>Save your Week once you're done – do this once a week (ideally on Sunday evenings).</p>
  </div>
);

export default WelcomePageContentFourthPage
