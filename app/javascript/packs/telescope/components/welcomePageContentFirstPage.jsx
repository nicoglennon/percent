import React from 'react';
import { Transition } from 'react-spring';


const WelcomePageContentFirstPage = ({username}) => (
  <div>
    <h2 className="welcomePageContent-TourPageTitle">Welcome <span className="welcomePageContent-emoji">👋</span></h2>
    <p>Hey, <strong>@{username}</strong>!</p>
    <p>Welcome to <strong>Datascope</strong>, a place where hundreds of people come to self-optimize every week.</p>
    <p>Here's how to get started:</p>
    <p className="welcomePageContent-threefeatures">1. Set your  <strong>Goals</strong> <span className="welcomePageContent-emoji">📝</span></p>
    <p className="welcomePageContent-threefeatures">2. Track your <strong>Weeks</strong> <span className="welcomePageContent-emoji">🗓</span></p>
    <p className="welcomePageContent-threefeatures">3. View your <strong>Analytics</strong> <span className="welcomePageContent-emoji">📈</span></p>
    <p>Let's do a quick tour.</p>
  </div>
);

export default WelcomePageContentFirstPage
