import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import ReactModal from 'react-modal';
import GoalLine from './goalLine';
import shortid from 'shortid';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import { Line } from 'rc-progress';
import NoGoalsCat from '../assets/images/cat.jpg';
import sanitizeHtml from 'sanitize-html-react';
import {formatDate, parseDate} from 'react-day-picker/moment';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';

const StyledGoalsWrapper = styled.div``;


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
      personalPercentage: 0,
      workPercentage: 0,
      goBack: false,
      categories: ['Personal', 'Work']
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
      goal.shortid = goal.shortid;
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
    var newWeek = this.state.newWeek;
    var dirtyGoals = newWeek.goals_attributes;
    if (dirtyGoals.length > 0) {
      var cleanGoals = [];
      dirtyGoals.forEach(function(dirtyGoal){
        var temp = JSON.parse(JSON.stringify(dirtyGoal));
        delete temp.id;
        delete temp.shortid;
        cleanGoals.push(temp);
      })
      var weekToSubmit = JSON.parse(JSON.stringify(newWeek));
      weekToSubmit.goals_attributes = cleanGoals;
      this.props.submitNewWeek(weekToSubmit);
    }
  }

  handleNewGoalInputChange(e){
    e.preventDefault();
    var inputValue = e.target.value;
    this.setState((prevState) => ({
      newGoalForm: {
        title: inputValue,
        goalable_type: prevState.newGoalForm.goalable_type
      }
    }));
  }

  scrollToBottom() {
    this.bottomOfMessages.scrollIntoView({ behavior: 'smooth' });
  }

  sanitizeHtmlTwice(html){
    var once = sanitizeHtml(html, {
      allowedTags: [],
      allowedAttributes: []
    });

    return sanitizeHtml(once, {
      allowedTags: [],
      allowedAttributes: []
    }).trim();
  }

  submitNewWeekGoal(newWeekGoal){
    var goals_attributes = this.state.newWeek.goals_attributes;
    newWeekGoal.id = goals_attributes.length;
    newWeekGoal.shortid = shortid.generate();
    newWeekGoal.completed = false;
    goals_attributes.push(newWeekGoal);
    this.updateState(goals_attributes);
    this.setState({
      newGoalForm: {
        title: '',
        goalable_type: 'Week'
      }
    });
    this.scrollToBottom();
  }

  handleSubmitNewWeekGoal(e) {
    e.preventDefault();
    var newWeekGoal = this.state.newGoalForm;
    var sanitizedGoalTitle = this.sanitizeHtmlTwice(newWeekGoal.title);
    newWeekGoal.title = sanitizedGoalTitle;
    if (sanitizedGoalTitle !== '') {
      this.submitNewWeekGoal(newWeekGoal);
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
    var personalGoals = currentGoals.filter((goal) => goal.category == 'Personal');
    var checkedPersonalGoals = personalGoals.filter((goal) => goal.completed);
    var personalPercent = 0;

    var workGoals = currentGoals.filter((goal) => goal.category == 'Work');
    var checkedWorkGoals = workGoals.filter((goal) => goal.completed);
    var workPercent = 0;

    if(personalGoals.length > 0){
      personalPercent = Math.round(checkedPersonalGoals.length/personalGoals.length*100);
    }

    if(workGoals.length > 0){
      workPercent = Math.round(checkedWorkGoals.length/workGoals.length*100);
    }

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
      lineColor: color,
      personalPercentage: personalPercent,
      workPercentage: workPercent
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

  // END Daypicker functions

  onDragEnd(){
    return;
  }

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
    var personalGoals = [];
    var workGoals = [];
    if (this.state.newWeek && this.state.newWeek.goals_attributes){
      numberOfGoals = this.state.newWeek.goals_attributes.length;
      var self = this;
      
      if (numberOfGoals === 0) {
        goalsToDisplay = <div className="boardPageContent-noGoalsDiv">
        <img className="boardPageContent-noGoalsImg" src={NoGoalsCat} />
        <p className="boardPageContent-noGoalsText">No goals yet! <br />Add some <Link className="newWeekPage-noGoalsText-LinkToBoard" to={`/@${this.props.currentUser.username}/goals`}>here</Link>.</p>
        </div>
      } else {
        personalGoals = this.state.newWeek.goals_attributes.filter( goal => goal.category === "Personal");
        workGoals = this.state.newWeek.goals_attributes.filter( goal => goal.category === "Work");

        goalsToDisplay = this.state.newWeek.goals_attributes.map( function(goal, index){
          return(
            <GoalLine categories={self.state.categories} 
                      goal={goal} key={goal.shortid} 
                      index={index}
                      showCheckbox={true} 
                      showDeleteButton={false} 
                      updateGoal={self.updateGoalLine} 
                      deleteGoal={self.deleteGoalLine} 
                      updateCheckbox={self.updateCheckbox} 
                      disabled={true} />
            )
          })
        }
      }

      var weekInputValue = selectedDays.length > 0 ? '🗓 Week of ' + moment(selectedDays[0]).format('MMM Do, YYYY') : undefined;
      
      return(
        <ReactModal
        isOpen={true}
        contentLabel="onRequestClose Example"
        onRequestClose={this.handleCloseModal}
        shouldCloseOnOverlayClick={true}
        overlayClassName="weekPage-background"
        className="weekPage-container"
        style={{content: {zIndex: '300'}, overlay: {backgroundColor: this.state.lineColor, zIndex: '200'}}}
        >
        <div className="weekPageContent-wrapper">
          <div className="weekPageContent-goalsdata weekPageData newWeekPageData">
            <div className="weekPage-buttonsWrapper">
              <button className="weekPage-closeModal" onClick={this.handleCloseModal}>✕</button>
            </div>
            <h2 className="weekPageContent-date">Record Week</h2>
            <div className="weekPageContent-datepicker-wrapper SelectedWeekExample">
              <DayPickerInput
                inputProps={{
                  readOnly: true
                }}
                onDayChange={this.handleDayChange}
                value={weekInputValue}
                placeholder='🗓 Select week date'
                dayPickerProps={{
                  disabledDays: selectedDays,
                  selectedDays: selectedDays,
                  showOutsideDays: true,
                  fixedWeeks: true,
                  modifiers: modifiers,
                  onDayMouseEnter: this.handleDayEnter,
                  onDayMouseLeave: this.handleDayLeave,
                  firstDayOfWeek: 1
                }}
              />
            </div>
            <div className="weekPageContent-progressAndPercentageContainer">
              <div className="weekPageContent-percentagesContainer">
                
                <div>
                  <div className="weekPageContent-percentagesText-flex">
                    <p className="weekPageContent-weekOfSubtitle flexGrow-one">Work</p>
                    <p className="weekPageContent-percentageText smallPercentage flexGrow-zero">
                      { workGoals.length > 0 ? 
                        <span><strong>{this.state.workPercentage}</strong>{'%'}</span>
                        :
                        <span className="weekPageContent-percentageText-NA flexGrow-zero">N/A</span>                      
                      }
                    </p>

                  </div>

                  <div className="weekPage-progressLineContainer">
                    <Line
                      percent={this.state.workPercentage}
                      strokeWidth="2"
                      trailWidth="2"
                      strokeLinecap="round"
                      strokeColor="rgb(132, 116, 255)"
                      trailColor="#fbfbfb"
                    />
                  </div>
                </div>
                

                
                <div>
                  <div className="weekPageContent-percentagesText-flex">
                    <p className="weekPageContent-weekOfSubtitle flexGrow-one">Personal</p>
                    <p className="weekPageContent-percentageText smallPercentage flexGrow-zero">
                    { personalGoals.length > 0 ? 
                        <span><strong>{this.state.personalPercentage}</strong>{'%'}</span>
                        :
                        <span className="weekPageContent-percentageText-NA flexGrow-zero">N/A</span>                      
                      }
                    </p>
                  </div>
                  <div className="weekPage-progressLineContainer">
                    <Line
                      percent={this.state.personalPercentage}
                      strokeWidth="2"
                      trailWidth="2"
                      strokeLinecap="round"
                      strokeColor="rgb(255, 118, 167)"
                      trailColor="#fbfbfb"
                    />
                  </div>
                </div>
                
            
                <div className="weekPageContent-percentagesWrapper">
                    <div className="weekPageContent-percentagesText-flex">
                      <p className="weekPageContent-weekOfSubtitle flexGrow-one">Total</p>
                      <p className="weekPageContent-percentageText flexGrow-zero">
                        <strong>{this.state.newWeek.percentage}</strong>
                        {'%'}
                      </p>
                    </div>
                  <div className="weekPage-progressLineContainer">
                    <Line
                      percent={this.state.newWeek.percentage}
                      strokeWidth="2"
                      trailWidth="2"
                      strokeLinecap="round"
                      strokeColor={this.state.lineColor}
                      trailColor="#fbfbfb"
                    />
                  </div>
              
                </div>
              </div>               
              
              <button className="newWeekPage-submitNewWeekButton" onClick={this.handleSubmitNewWeek} disabled={this.state.newWeek.goals_attributes.length === 0}>Save Week</button>
            </div>
          </div>

          <div className="goalsWrapper weekPageGoalsWrapper">
            <div className="weekPageContent-newGoalFormWrapper">
              <h2 className="newWeekPageContent-GoalsTitle">Goals</h2>
              <p className="newWeekPageContent-GoalsSubtitle">Check off what you completed this past week.</p>
              {/* <form onSubmit={this.handleSubmitNewWeekGoal} className="boardPageContent-newGoalForm">
                <input type="text" name="newGoal" placeholder="Add a goal" value={this.state.newGoalForm.title} onChange={this.handleNewGoalInputChange} className="boardPageContent-newGoalForm-title"/>
                <button className="weekPage-addNewGoalButton" onClick={this.handleSubmitNewWeekGoal}>Add</button>
              </form> */}
            </div>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId={'droppable'}>
                {provided => (
                  <StyledGoalsWrapper ref={provided.innerRef} {...provided.droppableProps}>
                    {goalsToDisplay}
                    {provided.placeholder}
                  </StyledGoalsWrapper>
                )}
              </Droppable>
            </DragDropContext>
            { (numberOfGoals > 0) && <p className="weekPageContent-numberofgoals"> goals <strong>{numberOfGoals}</strong></p> }
            <div ref={el => { this.bottomOfMessages = el; }} />
          </div>
        </div>
        {goBack}
      </ReactModal>
    )
  }
}
export default NewWeekPage
