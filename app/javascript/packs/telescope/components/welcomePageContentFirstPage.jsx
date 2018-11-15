import React from 'react';

const WelcomePageContentFirstPage = ({username}) => (
  <div>
    <br />
    <p>Hey, <strong>@{username}</strong>!<span className="welcomePageContent-emoji"> 👋</span></p>
    <p>Welcome to <strong>Datascope</strong>, a place where hundreds of people come to self-optimize every week.</p>
    <p>Here's how to get started:</p>
    <p className="welcomePageContent-threefeatures">1. Build your  <strong>Board</strong> <span className="welcomePageContent-emoji">🗺</span></p>
    <p className="welcomePageContent-threefeatures">2. Create your <strong>Weeks</strong> <span className="welcomePageContent-emoji">🗓</span></p>
    <p className="welcomePageContent-threefeatures">3. Watch your <strong>Analytics</strong> <span className="welcomePageContent-emoji">📈</span></p>
    <p>Let's start with your <strong>Board</strong>.</p>
  </div>
);

export default WelcomePageContentFirstPage
