import React from 'react';
import ChartSVG from '../assets/images/bar-chart.svg';
import { AreaChart, Area, Tooltip, XAxis, YAxis, ReferenceLine } from 'recharts';

var weeksData = [
  {date: "Jan 1", percentage: "10"},
  {date: "Jan 8", percentage: "25"},
  {date: "Jan 15", percentage: "75"}
]

const WelcomePageContentFifthPage = ({}) => (
  <div>
    <h2 className="welcomePageContent-TourPageTitle"><span className="welcomePageContent-TourPageTitle-Lighter">3. View your</span> Analytics <img src={ChartSVG} className="welcomePageContent-bigiconsvg"/></h2>
    <p>Aggregate data from all your recorded Weeks will be available in your Analytics.</p>
    <div className="AnalyticsPageContent-Chart">
      <AreaChart width={375} height={175} data={weeksData} >
        <defs>
          <linearGradient id="colorLine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={'black'} />
          <stop offset="100%" stopColor={'white'} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" padding={{left: 30, right: 30}} />
        <YAxis domain={[0, 100]} />
      <Area type="monotone" dataKey="percentage" stroke="black" strokeWidth={3} fill="url(#colorLine)"/>
      </AreaChart>
    </div>

    <p>See how you measure up to your expectations!</p>
  </div>
);

export default WelcomePageContentFifthPage
