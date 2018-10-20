import React from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import GoalLine from './goalLine';
import shortid from 'shortid';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import { Line } from 'rc-progress';

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

class NewWeekPage extends React.Component {
  constructor(){
    super();
    this.state = {
      newWeek: {
        date: null,
        goals_attributes: [],
        percentage: 0
      },
      newGoalForm: {
        title: '',
        goalable_type: 'Week'
      },
      hoverRange: undefined,
      selectedDays: [],
      circleColor: '#FE8C6A'
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleNewGoalInputChange = this.handleNewGoalInputChange.bind(this);
    this.handleSubmitNewWeekGoal = this.handleSubmitNewWeekGoal.bind(this);
    this.handleSubmitNewWeek = this.handleSubmitNewWeek.bind(this);
    this.updateGoalLine = this.updateGoalLine.bind(this);
    this.deleteGoalLine = this.deleteGoalLine.bind(this);
    this.submitNewWeekGoal = this.submitNewWeekGoal.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount(){
    var goals = this.props.board.goals;
    var newGoals = goals.map((goal, index) => {
      goal.id = index;
      goal.shortid = shortid.generate();
      goal.completed = false;
      return goal;
    })
    this.setState((prevState) =>({
      newWeek: {
        date: prevState.newGoalForm.date,
        goals_attributes: newGoals,
        percentage: 0
      }
    }));
  }

  handleCloseModal(){
    this.props.history.goBack();
  }

  handleSubmitNewWeek(e){
    e.preventDefault();
    this.props.submitNewWeek(this.state);
  }

  handleNewGoalInputChange(e){
    e.preventDefault();
    var target = e.target;
    const value = target.value;
    this.setState((prevState) => ({
      newGoalForm: {
        title: value,
        goalable_type: prevState.newGoalForm.goalable_type
      }
    }));
  }

  submitNewWeekGoal(newGoalForm){
    var goals_attributes = this.state.newWeek.goals_attributes;
    newGoalForm.id = goals_attributes.length;
    newGoalForm.shortid = shortid.generate();
    goals_attributes.push(newGoalForm);
    this.updateState(goals_attributes);
    this.setState((prevState) =>({
      newGoalForm: {
        title: '',
        goalable_type: 'Week'
      }
    }));
  }

  handleSubmitNewWeekGoal(e) {
    e.preventDefault();
    if (this.state.newGoalForm.title !== '' ) {
      this.submitNewWeekGoal(this.state.newGoalForm);
    }
  }

  updateGoalLine(updatedGoal, updatedlInput){
    // edit the goalLine with the same key?
    var goalsAttributes = this.state.newWeek.goals_attributes;
    var editedGoals = goalsAttributes.map((goal) => {
      if(goal.shortid === updatedGoal.shortid){
        goal.title = updatedlInput;
      }
      return goal;
    })
    this.setState((prevState) =>({
      newWeek: {
        date: prevState.newWeek.date,
        goals_attributes: editedGoals,
        percentage: prevState.newWeek.percentage
      }
    }));
    console.log(this.state.newWeek.goals_attributes);
  }

  updateCheckbox(updatedGoal, checkboxValue){
    var goalsAttributes = this.state.newWeek.goals_attributes;

    var updatedGoals = goalsAttributes.map((goal) => {
      if(updatedGoal.id === goal.id){
        goal.completed = checkboxValue;
      }
      return goal;
    });
    this.updateState(updatedGoals);
  }

  updateState(currentGoals){
    var checkedGoals = currentGoals.filter((goal) => goal.completed);
    var percent = 0;
    var color;
    if(currentGoals.length > 0){
      percent = Math.round(checkedGoals.length/currentGoals.length*100);
      if(percent < 33){
        color = '#FE8C6A';
      } else if(percent >= 33 && percent < 66){
        color = '#3FC7FA';
      } else {
        color = '#85D262'
      }
    }
    this.setState( (prevState) => ({
      newWeek: {
        date: prevState.newWeek.date,
        goals_attributes: currentGoals,
        percentage: percent
      },
      circleColor: color
    }));
  }

  deleteGoalLine(goal){
    var goalsAttributes = this.state.newWeek.goals_attributes;
    goalsAttributes.splice(goal.id, 1);
    var indexedGoals = goalsAttributes.map((goal, index) => {
      goal.id = index;
      return goal;
    })
    this.updateState(indexedGoals);
  }

  // DayPicker functions

  handleDayChange = date => {
    var selectedDays = getWeekDays(getWeekRange(date).from);
   this.setState((prevState)=>({
     newWeek: {
       date: selectedDays[0],
       goals_attributes: prevState.newWeek.goals_attributes,
       percentage: prevState.newWeek.percentage
     },
     selectedDays: selectedDays,
   }));
 };

 handleDayEnter = date => {
   this.setState({
     hoverRange: getWeekRange(date),
   });
 };

 handleDayLeave = () => {
   this.setState({
     hoverRange: undefined,
   });
 };

 handleWeekClick = (weekNumber, days, e) => {
   console.log(days);
   this.setState({
     selectedDays: days,
   });
 };

 // END Daypicker functions

  render(){
    const { hoverRange, selectedDays } = this.state;

    const daysAreSelected = selectedDays.length > 0;

    const modifiers = {
      hoverRange,
      selectedRange: daysAreSelected && {
        from: selectedDays[0],
        to: selectedDays[6],
      },
      hoverRangeStart: hoverRange && hoverRange.from,
      hoverRangeEnd: hoverRange && hoverRange.to,
      selectedRangeStart: daysAreSelected && selectedDays[0],
      selectedRangeEnd: daysAreSelected && selectedDays[6],
    };

    var numberOfGoals = 0;
    var goalsToDisplay;
    if (this.state.newWeek && this.state.newWeek.goals_attributes){
      numberOfGoals = this.state.newWeek.goals_attributes.length;
      var self = this;

      if (numberOfGoals === 0) {
        goalsToDisplay = <p>No goals yet.</p>
      } else {
        goalsToDisplay = this.state.newWeek.goals_attributes.map( function(goal){
          return(
            <GoalLine goal={goal} key={goal.shortid} showCheckbox={true} updateGoal={self.updateGoalLine} deleteGoal={self.deleteGoalLine} updateCheckbox={self.updateCheckbox} />
          )
        })
      }
    }

    return(
      <ReactModal
        isOpen={true}
        contentLabel="onRequestClose Example"
        onRequestClose={this.handleCloseModal}
        shouldCloseOnOverlayClick={true}
        overlayClassName="newWeekPage-background"
        className="newWeekPage-container"
        style={{content: {overflow: 'scroll'}}}
        >
        <button className="weekPage-closeModal" onClick={this.handleCloseModal}>✕</button>
        <div className="weekPageContent-wrapper">
          <div className="weekPageContent-goalsdata">
            <h2 className="weekPageContent-date">New Week</h2>
            <div className="weekPageContent-datepicker-wrapper SelectedWeekExample">
              <DayPicker
                selectedDays={selectedDays}
                showOutsideDays
                modifiers={modifiers}
                onDayClick={this.handleDayChange}
                onDayMouseEnter={this.handleDayEnter}
                onDayMouseLeave={this.handleDayLeave}
                onWeekClick={this.handleWeekClick}
                firstDayOfWeek={1}
              />
            </div>
            <div className="weekPageContent-percentagesWrapper">
              <p className="weekPageContent-percentageText">
                <strong>{this.state.newWeek.percentage}</strong>
                {'%'}
              </p>
              <div className="weekPage-progressLineContainer">
                <Line
                  percent={this.state.newWeek.percentage}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeColor={this.state.circleColor}
                />
              </div>
            </div>
          </div>

          <div className="goalsWrapper">
            <div className="weekPageContent-newGoalFormWrapper">
              <form onSubmit={this.handleSubmitNewWeekGoal} className="boardPageContent-newGoalForm">
                <input type="text" name="newGoal" placeholder="Add a goal" value={this.state.newGoalForm.title} onChange={this.handleNewGoalInputChange} className="boardPageContent-newGoalForm-title"/>
                <button className="weekPage-addNewGoalButton" onClick={this.handleSubmitNewWeekGoal}>Add</button>
              </form>
            </div>
            {goalsToDisplay}
            <p className="weekPageContent-numberofgoals"><strong>{numberOfGoals}</strong> goals</p>
          </div>
        </div>
      </ReactModal>
    )
  }
}
export default NewWeekPage
