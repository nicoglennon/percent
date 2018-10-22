import React from 'react';
import GoalLine from './goalLine';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import { Line } from 'rc-progress';
import NoGoals from '../assets/images/nogoals.gif';

class WeekPageContent extends React.Component {
  render(){
    var numberOfGoals = 0;
    var goalsToDisplay;
    if (this.props && this.props.week.goals){
      numberOfGoals = this.props.week.goals.length;
      var self = this;
      if (numberOfGoals === 0) {
        goalsToDisplay = <div className="boardPageContent-noGoalsDiv">
        <img className="boardPageContent-noGoalsImg" src={NoGoals} />
        <p className="boardPageContent-noGoalsText">No goals yet! <br />Add a new one above.</p>
        </div>

      } else {
        goalsToDisplay = this.props.week.goals.map( function(goal){
          return(
            <GoalLine goal={goal} key={goal.id} showCheckbox={false} updateGoal={self.props.updateGoal} deleteGoal={self.props.deleteGoal} />
          )
        })
      }
    }

    return(
      <div className="weekPageContent-wrapper">
        <div className="goalsWrapper">
          {/* <div className="weekPageContent-newGoalFormWrapper">
            <form onSubmit={this.handleSubmitNewBoardGoal} className="boardPageContent-newGoalForm">
              <input type="text" name="newGoal" value={this.state.newGoalForm.title} placeholder="Add new goal" onChange={this.handleNewGoalInputChange} className="boardPageContent-newGoalForm-title"/>
              <button className="weekPage-addNewGoalButton" onClick={this.handleSubmitNewBoardGoal}>Add</button>
            </form>
          </div> */}
          {goalsToDisplay}
          <p className="weekPageContent-numberofgoals">goals&nbsp;<strong>{numberOfGoals}</strong></p>
        </div>
        <div className="weekPageContent-goalsdata">
          <h2 className="weekPageContent-date">{this.props.week.date}</h2>
        </div>
      </div>
      // <div className="weekPageContent-wrapper">
      //   <h2 className="weekPageContent-date">{this.props.week.date}</h2>
      //   <div className="goalsWrapper">
      //     {goalsToDisplay}
      //   </div>
      //   <div className="weekPageContent-goalsdata">
      //     <p className="weekPageContent-percentage">{this.props.week.percentage}</p>
      //   </div>
      // </div>
    )
  }
}
export default WeekPageContent
