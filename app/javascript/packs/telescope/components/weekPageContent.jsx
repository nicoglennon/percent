import React from 'react';
import GoalLine from './goalLine';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import { Line } from 'rc-progress';
import NoGoals from '../assets/images/nogoals.gif';

function getWeekDays(weekStart) {
  const days = [weekStart];
  for (let i = 1; i < 7; i += 1) {
    days.push(
      moment(weekStart)
        .add(i, 'days')
        .toDate()
    );
  }
  return days;
}

function getWeekRange(date) {
  return {
    from: moment(date)
      .startOf('isoWeek')
      .toDate(),
    to: moment(date)
      .endOf('isoWeek')
      .toDate(),
  };
}

class WeekPageContent extends React.Component {

  constructor(){
    super();
    this.state = {
      selectedDays: [],
      lineColor: "hsla(0,100%,40%, 0.8)"
    }
  }

  componentDidMount(){
    var selectedDays = getWeekDays(getWeekRange(this.props.week.date).from);
    var hue = Math.round(((345 - (this.props.week.percentage/100)*200)).toString(10));
    var color = ["hsla(",hue,",100%,40%, 0.8)"].join("");
    this.setState({
      selectedDays: selectedDays,
      lineColor: color
    })
  }


  render(){
    const { selectedDays } = this.state;
    const daysAreSelected = selectedDays.length > 0;

    const modifiers = {
      selectedRange: daysAreSelected && {
        from: selectedDays[0],
        to: selectedDays[6],
      },
      selectedRangeStart: daysAreSelected && selectedDays[0],
      selectedRangeEnd: daysAreSelected && selectedDays[6],
    };

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
            <GoalLine goal={goal} key={goal.id} showCheckbox={true} showDeleteButton={false} updateGoal={self.props.updateGoal} deleteGoal={self.props.deleteGoal} disabled={true}/>
          )
        })
      }
    }

    return(
      <div className="weekPageContent-wrapper">
        <div className="goalsWrapper weekPageGoalsWrapper">
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
          <p className="weekPageContent-weekOfSubtitle">Week of</p>
          <h2 className="weekPageContent-date">{moment(this.props.week.date).format('ll')}</h2>
          <div className="weekPageContent-datepicker-wrapper SelectedWeekExample">
            <DayPicker
              selectedDays={selectedDays}
              showOutsideDays
              fixedWeeks
              modifiers={modifiers}
              firstDayOfWeek={1}
              month={selectedDays[0]}
            />
          </div>
          <div className="weekPageContent-percentagesWrapper">
            <p className="weekPageContent-weekOfSubtitle">Completion</p>
            <p className="weekPageContent-percentageText">
              <strong>{this.props.week.percentage}</strong>
              {'%'}
            </p>
            <div className="weekPage-progressLineContainer">
              <Line
                percent={this.props.week.percentage}
                strokeWidth="2"
                trailWidth="2"
                strokeLinecap="round"
                strokeColor={this.state.lineColor}
                trailColor="#f3f3f3"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default WeekPageContent
