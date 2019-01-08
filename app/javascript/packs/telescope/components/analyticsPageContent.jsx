import React from 'react';
import { AreaChart, Area, Tooltip, XAxis, YAxis, ResponsiveContainer, Label, LabelList } from 'recharts';
import NoGoalsGif from '../assets/images/balloonsketch.jpg';
import moment from 'moment';

function cleanWeeksDataForChart(weeks){
  var weeksToClean = [...weeks];
  var cleanWeeks = weeksToClean.map(function(week){
    var newWeek = {...week};
    newWeek.date = moment(newWeek.date).format('MMM D');
    newWeek.percentage = Number(week.percentage);
    return newWeek;
  })
  return cleanWeeks.reverse();
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
            <ResponsiveContainer width="100%" height={weeks.length > 4 ? weeks.length * 120 : '80%'} >
              <AreaChart data={cleanDat} layout="vertical" >
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
                <YAxis hide={true} dataKey="date" type="category" padding={{top: 30, bottom: 5}} reversed={true} interval={0}/>
                <Area type="monotone" dataKey="percentage" stroke="url(#colorLine)" strokeWidth={3} fill="url(#colorUv)" >
                  <LabelList dataKey="date" position="right" />
                </Area>
              <Tooltip contentStyle={{color: 'white', backgroundColor: 'black', border: 'none', borderRadius: '6px', opacity: '0.8'}} separator={': '} formatter={function(value){ return value.toString() + '%' }} />
              </AreaChart>
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
