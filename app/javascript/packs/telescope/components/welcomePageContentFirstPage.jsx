import React from 'react';

const WelcomePageContentFirstPage = ({username}) => (
  <div>
    <h2 className="welcomePageContent-TourPageTitle">Welcome 👋</h2>
    <p>Hey, <strong>@{username}</strong>!</p>
    <p>Welcome to <strong>Percent</strong>, a place where thousands of people come to self-assess each week.</p>
    <p>In one sentence, Percent is a unique way to track & visualize your quantified self. You'll set goals, collect data on yourself once a week and use it to iterate & improve!</p>
    <p>Let's do a quick tour.</p>
  </div>
);

export default WelcomePageContentFirstPage
