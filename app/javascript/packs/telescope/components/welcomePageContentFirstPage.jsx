import React from 'react';

const WelcomePageContentFirstPage = ({username}) => (
  <div>
    <p>Hey, <strong>@{username}</strong>! <span className="welcomePageContent-emoji">👋</span></p>
    <p>Welcome to <strong>Datascope</strong>, a place where hundreds of people come to self-optimize every week.</p>
    <p>Here's a quick tour:</p>
    <p className="welcomePageContent-threefeatures">1. Your  <strong>Board</strong> <span className="welcomePageContent-emoji">🗺</span></p>
    <p className="welcomePageContent-threefeatures">2. Your <strong>Weeks</strong> <span className="welcomePageContent-emoji">🗓</span></p>
    <p className="welcomePageContent-threefeatures">3. Your <strong>Analytics</strong> <span className="welcomePageContent-emoji">📈</span></p>
    <p>Let's start with your <strong>Board</strong>.</p>
  </div>
);

export default WelcomePageContentFirstPage
