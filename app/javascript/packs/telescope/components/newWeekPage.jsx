import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import ReactModal from 'react-modal';
import GoalLine from './goalLine';
import shortid from 'shortid';
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
      lineColor: 'rgba(70,70,70, 0.85)',
      goBack: false
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
    this.scrollToBottom = this.scrollToBottom.bind(this);
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
    this.setState({
      goBack: true
    });
  }

  handleSubmitNewWeek(e){
    e.preventDefault();
    var dirtyGoals = this.state.newWeek.goals_attributes;
    var cleanGoals = [];
    dirtyGoals.forEach(function(dirtyGoal){
      var temp = dirtyGoal;
      delete temp.id;
      delete temp.shortid;
      cleanGoals.push(temp);
    })
    var weekToSubmit = this.state.newWeek;
    weekToSubmit.goals_attributes = cleanGoals;
    this.props.submitNewWeek(weekToSubmit);
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

  scrollToBottom() {
    this.bottomOfMessages.scrollIntoView({ behavior: 'smooth' });
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
    this.scrollToBottom();
  }

  handleSubmitNewWeekGoal(e) {
    e.preventDefault();
    if (this.state.newGoalForm.title !== '' ) {
      this.submitNewWeekGoal(this.state.newGoalForm);
    }
  }

  updateGoalLine(updatedGoal, updatedlInput){
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
  }

  updateCheckbox(updatedGoal, checkboxValue){
    var goalsAttributes = this.state.newWeek.goals_attributes;

    var updatedGoals = goalsAttributes.map((goal) => {
      if(updatedGoal.shortid === goal.shortid){
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
      var hue=Math.round(((345 - (percent/100)*200)).toString(10));
      color = ["hsla(",hue,",80%,65%, 0.85)"].join("");
    }
    this.setState( (prevState) => ({
      newWeek: {
        date: prevState.newWeek.date,
        goals_attributes: currentGoals,
        percentage: percent
      },
      lineColor: color
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
    var goBack = this.state.goBack ? <Redirect to={'/@' + this.props.currentUser.username} /> : undefined;
    var numberOfGoals = 0;
    var goalsToDisplay;
    if (this.state.newWeek && this.state.newWeek.goals_attributes){
      numberOfGoals = this.state.newWeek.goals_attributes.length;
      var self = this;

      if (numberOfGoals === 0) {
        goalsToDisplay = <div className="boardPageContent-noGoalsDiv">
        <img className="boardPageContent-noGoalsImg" src={NoGoals} />
        <p className="boardPageContent-noGoalsText">No goals yet! <br />Add a new one above.</p>
        </div>
      } else {
        goalsToDisplay = this.state.newWeek.goals_attributes.map( function(goal){
          return(
            <GoalLine goal={goal} key={goal.shortid} showCheckbox={true} showDeleteButton={true} updateGoal={self.updateGoalLine} deleteGoal={self.deleteGoalLine} updateCheckbox={self.updateCheckbox} />
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
        style={{content: {overflow: 'scroll'}, overlay: {backgroundColor: this.state.lineColor, transition: 'background-color 500ms ease-out'}}}
        >
        <button className="weekPage-closeModal" onClick={this.handleCloseModal}>✕</button>
        <div className="weekPageContent-wrapper">
          <div className="weekPageContent-goalsdata">
            <h2 className="weekPageContent-date">New Week</h2>
            <div className="weekPageContent-datepicker-wrapper SelectedWeekExample">
              <DayPicker
                selectedDays={selectedDays}
                showOutsideDays
                todayButton="Go to Today"
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
                  strokeWidth="2"
                  trailWidth="2"
                  strokeLinecap="round"
                  strokeColor={this.state.lineColor}
                  trailColor="#f3f3f3"
                />
              </div>
            </div>
            <button className="newWeekPage-submitNewWeekButton" onClick={this.handleSubmitNewWeek}>Save Week</button>
          </div>

          <div className="goalsWrapper">
            <div className="weekPageContent-newGoalFormWrapper">
              <form onSubmit={this.handleSubmitNewWeekGoal} className="boardPageContent-newGoalForm">
                <input type="text" name="newGoal" placeholder="Add a goal" value={this.state.newGoalForm.title} onChange={this.handleNewGoalInputChange} className="boardPageContent-newGoalForm-title"/>
                <button className="weekPage-addNewGoalButton" onClick={this.handleSubmitNewWeekGoal}>Add</button>
              </form>
            </div>
            {goalsToDisplay}
            <div ref={el => { this.bottomOfMessages = el; }} />
            <p className="weekPageContent-numberofgoals"> goals <strong>{numberOfGoals}</strong></p>
          </div>
        </div>
        {goBack}
      </ReactModal>
    )
  }
}
export default NewWeekPage
