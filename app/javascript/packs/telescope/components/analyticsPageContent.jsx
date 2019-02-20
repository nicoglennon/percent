import React from 'react';
import { ComposedChart, Area, Line, Tooltip, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import NoGoalsGif from '../assets/images/boy.jpg';
import moment from 'moment';

function cleanWeeksDataForChart(weeks){
  var weeksToClean = [...weeks];
  var cleanWeeks = weeksToClean.map(function(week){
    var newWeek = {...week};
    newWeek.date = moment(newWeek.date).format('MMM D');
    newWeek.Overall = Number(week.percentage);
    newWeek.Personal = getCategoryPercentage(week, "Personal");
    newWeek.Work = getCategoryPercentage(week, "Work");
    return newWeek;
  })
  return cleanWeeks.reverse();
}

function getCategoryPercentage(week, category){
  var categoryGoals = week.goals.filter(goal => goal.category === category);
  var completedCategoryGoals = categoryGoals.filter(categoryGoal => categoryGoal.completed);
  if (categoryGoals.length === 0){
    return null;
  }
  else {
    return (Math.round(completedCategoryGoals.length / categoryGoals.length * 100));

  }
}

function getColor(percent){
  var hue = Math.round(((345 - (percent/100)*200)).toString(10));
  var color = ["hsla(",hue,",80%,65%, 0.85)"].join("");
  return color;
}

function getMinColor(percentagesArray){
  return getColor(Math.min(...percentagesArray));
}

function getMidColor(percentagesArray){
  var max = Math.max(...percentagesArray);
  var min = Math.min(...percentagesArray);
  var mid = (max + min) / 2;
  return getColor(mid);
}

function getMidZeroColor(percentagesArray){
  var max = Math.max(...percentagesArray);
  var mid = (max) / 2;
  return getColor(mid);
}

function getPercentagesArray(weeks){
  var percentages = [];
  weeks.forEach(function(week){
    percentages.push(week.percentage);
  })
  return percentages;
}

function getMaxColor(percentagesArray){
  return getColor(Math.max(...percentagesArray));
}


class AnalyticsPageContent extends React.Component {
  render(){
    var weeks = this.props.weeks;
    var cleanDat = cleanWeeksDataForChart(weeks);

    var percentagesArray = getPercentagesArray(weeks);
    var maxColor = getMaxColor(percentagesArray);
    var minColor = getMinColor(percentagesArray);
    var midColor = getMidColor(percentagesArray);
    var midZeroColor = getMidZeroColor(percentagesArray);
    var zeroColor = getColor(0);

    var content = weeks.length == 0 ?
        <div className="AnalyticsPageContent-Chart">
          <button className="weekPage-closeModal" onClick={this.props.closeModal}>✕</button>
          <div className="analyticsPageContent-noWeeksDiv">
            <img className="analyticsPageContent-noWeeksImg" src={NoGoalsGif} />
            <p><strong>You have no weeks to analyze yet!</strong><br />Come back after recording a few weeks.</p>
          </div>
        </div>
        :
          <div className="AnalyticsPageContent-Chart">
            <button className="weekPage-closeModal" onClick={this.props.closeModal}>✕</button>

            <h2 className="analyticsPageContent-title">Analytics</h2>
            <div className="analyticsPageContent-legend">
              <span className="analyticsPageContent-lineDiv overall">Overall</span>
              <span className="analyticsPageContent-lineDiv work">Work</span>
              <span className="analyticsPageContent-lineDiv personal">Personal</span>
            </div>
            <ResponsiveContainer width="100%" height={weeks.length > 4 ? weeks.length * 120 : '75%'} >
              <ComposedChart 
                data={cleanDat} 
                layout="vertical"
                margin={{bottom: 15, right: 10}}
              >
                <defs>
                  <linearGradient id="colorLine" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor={maxColor} />
                    <stop offset="50%" stopColor={midColor} />
                    <stop offset="100%" stopColor={minColor} />
                  </linearGradient>
                  <linearGradient id="colorUv" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor={maxColor} stopOpacity={0.6} />
                    <stop offset="50%" stopColor={midZeroColor} stopOpacity={0.4}/>
                    <stop offset="100%" stopColor={zeroColor} stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <XAxis domain={[0, 100]} tickCount={5} orientation="top" type="number" dataKey="percentage" />
                <YAxis dataKey="date" type="category" reversed={true} interval={0} scale="point" padding={{ top: 50 }} />
                <Area type="monotone" dataKey="Overall" stroke="url(#colorUv)" strokeWidth={0} fill="url(#colorUv)" />
                <Line type="monotone" dataKey="Work" stroke="rgb(132, 116, 255)" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="Personal" stroke="rgb(255, 105, 168)" strokeWidth={3} dot={false}  />
                <Tooltip contentStyle={{color: 'white', backgroundColor: 'black', border: 'none', borderRadius: '6px', opacity: '0.8'}} separator={': '} formatter={function(value){ return value.toString() + '%' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        ;
    return(
      <div className="AnalyticsPageWrapper">
        {content}
      </div>
    )
  }
}

export default AnalyticsPageContent
