import React from 'react';
import GoalLine from './goalLine';

class WeekPageContent extends React.Component {
  render(){
    var goalsToDisplay;
    if (this.props && this.props.week.goals){
      var goalsToDisplay = this.props.week.goals.map( function(goal){
        return(
          <GoalLine goal={goal} key={goal.id}/>
        )
      })
    }

    return(
      <div className="weekPageContent-wrapper">
        <h2 className="weekPageContent-date">{this.props.week.date}</h2>
        <div className="goalsWrapper">
          {goalsToDisplay}
        </div>
        <div className="weekPageContent-goalsdata">
          <p className="weekPageContent-percentage">{this.props.week.percentage}</p>
        </div>
      </div>
    )
  }
}
export default WeekPageContent
