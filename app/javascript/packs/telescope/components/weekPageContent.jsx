import React from 'react';

class WeekPageContent extends React.Component {
  render(){
    return(
      <div className="weekPageContent-wrapper">
        <h2 className="weekPageContent-date">{this.props.week.date}</h2>
        <p className="weekPageContent-percentage">{this.props.week.percentage}</p>
      </div>
    )
  }
}
export default WeekPageContent
