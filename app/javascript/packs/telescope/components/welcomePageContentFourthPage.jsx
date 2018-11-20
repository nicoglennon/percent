import React from 'react';
import { Line } from 'rc-progress';

const WelcomePageContentFourthPage = ({}) => (
  <div>
    <h2 className="welcomePageContent-TourPageTitle"><span className="welcomePageContent-TourPageTitle-Lighter">2. Track your</span> Weeks <span className="welcomePageContent-emoji">🗓</span></h2>
    <p>Your Completion will increase as you check off your goals.</p>
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
    <p>Save your Week once you're done – do this once a week (ideally on Sunday evenings)!</p>
    <p>Once you have some Weeks on record, go ahead and check your Analytics.</p>

  </div>
);

export default WelcomePageContentFourthPage
