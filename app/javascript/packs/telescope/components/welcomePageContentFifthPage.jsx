import React from 'react';
import ChartSVG from '../assets/images/bar-chart.svg';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts';

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
      <ResponsiveContainer width="100%" height={150}>
        <AreaChart data={weeksData} layout="vertical" margin={{bottom: 15, right: 20}}>
          <defs>
            <linearGradient id="colorLine" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={'black'} />
            <stop offset="100%" stopColor={'white'} />
            </linearGradient>
          </defs>
          <XAxis domain={[0, 100]} orientation="top" type="number" dataKey="percentage" />
          <YAxis dataKey="date" type="category" reversed={true} interval={0} scale="point" padding={{ top: 20 }}/>
          <Area type="monotone" dataKey="percentage" stroke="black" strokeWidth={3} fill="url(#colorLine)"/>
        </AreaChart>
      </ResponsiveContainer>
    </div>

    <p>See how you measure up to your expectations and which category you need to focus on!</p>
  </div>
);

export default WelcomePageContentFifthPage
