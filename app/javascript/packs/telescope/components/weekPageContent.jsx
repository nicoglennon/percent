import React from 'react';
import GoalLine from './goalLine';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import { Line } from 'rc-progress';
import NoGoals from '../assets/images/cat.jpg';
import WeekPageDropdownMenu from './weekPageDropdownMenu';
import {TwitterShareButton} from 'react-twitter-embed';
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

  onDragEnd(){
    return;
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
    var personalGoals = [];
    var checkedPersonalGoals = [];
    var workGoals = [];
    var checkedWorkGoals = [];
    if (this.props && this.props.week.goals){
      numberOfGoals = this.props.week.goals.length;
      var self = this;
      if (numberOfGoals === 0) {
        goalsToDisplay = <div className="boardPageContent-noGoalsDiv">
        <img className="boardPageContent-noGoalsImg" src={NoGoals} />
        <p className="boardPageContent-noGoalsText">No goals here!</p>
        </div>

      } else {
        personalGoals = this.props.week.goals.filter( goal => goal.category === "Personal");
        checkedPersonalGoals = personalGoals.filter( goal => goal.completed);
        if(personalGoals.length > 0){
          var personalPercentage = Math.round(checkedPersonalGoals.length/personalGoals.length*100);
        }
        
        workGoals = this.props.week.goals.filter( goal => goal.category === "Work");
        checkedWorkGoals = workGoals.filter( goal => goal.completed);
        if(workGoals.length > 0){
          var workPercentage = Math.round(checkedWorkGoals.length/workGoals.length*100);
        }

        goalsToDisplay = this.props.week.goals.map( function(goal, index){
          return(
            <GoalLine goal={goal} 
                      key={goal.id} 
                      index={index} 
                      showCheckbox={true} 
                      showDeleteButton={false} 
                      updateGoal={self.props.updateGoal} 
                      deleteGoal={self.props.deleteGoal} 
                      disabled={true}/>
          )
        })
      }
    }

    return(
      <div className="weekPageContent-wrapper">
        <div className="weekPageContent-goalsdata weekPageData">
          <div className="weekPage-buttonsWrapper">
            <button className="weekPage-closeModal" onClick={this.props.closeModal}>✕</button>
            <WeekPageDropdownMenu deleteWeek={this.props.deleteWeek} />
          </div>
          <p className="weekPageContent-weekOfSubtitle">Week of</p>
          <h2 className="weekPageContent-date">{moment(this.props.week.date).format('ll')}</h2>
          <div className="weekPageContent-twitterButtonWrapper">
          <TwitterShareButton url="https://percent.me" options={{
              text: `I completed ${this.props.week.percentage}% of my goals for the week of ${moment(this.props.week.date).format('MMM Do')} 🌻`,
              via: 'percenthq',
              size: 'large',
            }} />
            </div>
          <div className="weekPageContent-datepicker-wrapper SelectedWeekExample">
            {/* <DayPicker
              selectedDays={selectedDays}
              showOutsideDays
              fixedWeeks
              modifiers={modifiers}
              firstDayOfWeek={1}
              canChangeMonth={false}
              month={selectedDays[0]}
            /> */}
          </div>
          {/* <div className="weekPageContent-percentagesWrapper">
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
                trailColor="white"
              />
            </div>
          </div> */}
          <div className="weekPageContent-progressAndPercentageContainer">
            <div className="weekPageContent-percentagesContainer">
              
              <div>
                <div className="weekPageContent-percentagesText-flex">
                  <p className="weekPageContent-weekOfSubtitle flexGrow-one">Work</p>
                  <p className="weekPageContent-percentageText smallPercentage flexGrow-zero">
                    { workGoals.length > 0 ? 
                      <span><strong>{workPercentage}</strong>{'%'}</span>
                      :
                      <span className="weekPageContent-percentageText-NA flexGrow-zero">N/A</span>                      
                    }
                  </p>

                </div>

                <div className="weekPage-progressLineContainer">
                  <Line
                    percent={workPercentage}
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
                      <span><strong>{personalPercentage}</strong>{'%'}</span>
                      :
                      <span className="weekPageContent-percentageText-NA flexGrow-zero">N/A</span>                      
                    }
                  </p>
                </div>
                <div className="weekPage-progressLineContainer">
                  <Line
                    percent={personalPercentage}
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
                      <strong>{this.props.week.percentage}</strong>
                      {'%'}
                    </p>
                  </div>
                <div className="weekPage-progressLineContainer">
                  <Line
                    percent={this.props.week.percentage}
                    strokeWidth="2"
                    trailWidth="2"
                    strokeLinecap="round"
                    strokeColor={this.state.lineColor}
                    trailColor="#fbfbfb"
                  />
                </div>
              </div>
            </div>                
          </div>
        </div>
        <div className="goalsWrapper weekPageGoalsWrapper">
          <div className="weekPageContent-newGoalFormWrapper">
            <h2 className="newWeekPageContent-GoalsTitle">Goals</h2>
          {/* <form onSubmit={this.handleSubmitNewBoardGoal} className="boardPageContent-newGoalForm">
              <input type="text" name="newGoal" value={this.state.newGoalForm.title} placeholder="Add new goal" onChange={this.handleNewGoalInputChange} className="boardPageContent-newGoalForm-title"/>
              <button className="weekPage-addNewGoalButton" onClick={this.handleSubmitNewBoardGoal}>Add</button>
            </form>*/}
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
          <p className="weekPageContent-numberofgoals">goals&nbsp;<strong>{numberOfGoals}</strong></p>
        </div>
      </div>
    )
  }
}
export default WeekPageContent
