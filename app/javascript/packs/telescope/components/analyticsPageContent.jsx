import React from 'react';
import { AreaChart, Area, Tooltip, XAxis, YAxis, ReferenceLine } from 'recharts';
import moment from 'moment';

function cleanWeeksDataForChart(weeks){
  var weeksToClean = [...weeks];
  var cleanWeeks = weeksToClean.map(function(week){
    var newWeek = {...week};
    var weekMoment = moment(newWeek.date);
    newWeek.date = moment(newWeek.date).format('MMM D');
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
    return(
      <div className="AnalyticsPageWrapper">
        {/* <h2>Analytics</h2> */}
        <div className="AnalyticsPageContent-Chart">
          <AreaChart width={weeks.length < 10 ? 790 : weeks.length*80} height={300} data={cleanDat} >
            <defs>
              <linearGradient id="colorLine" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={maxColor} />
              <stop offset="50%" stopColor={midColor} />
            <stop offset="100%" stopColor={minColor} />
              </linearGradient>
              <linearGradient id="colorUv" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={maxColor} stopOpacity={0.6} />
              <stop offset="50%" stopColor={midZeroColor} stopOpacity={0.4}/>
            <stop offset="100%" stopColor={zeroColor} stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" padding={{left: 30, right: 30}} />
            <YAxis domain={[0, 100]} />
            <Area type="monotone" dataKey="percentage" stroke="url(#colorLine)" strokeWidth={3} fill="url(#colorUv)"/>
          <Tooltip contentStyle={{color: 'white', backgroundColor: 'black', border: 'none', borderRadius: '6px', opacity: '0.8'}} separator={': '} />
          </AreaChart>
        </div>
      </div>
    )
  }
}

export default AnalyticsPageContent
