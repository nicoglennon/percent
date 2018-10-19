import React from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import GoalLine from './goalLine';
import shortid from 'shortid';

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
      }
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleNewGoalInputChange = this.handleNewGoalInputChange.bind(this);
    this.handleSubmitNewWeekGoal = this.handleSubmitNewWeekGoal.bind(this);
    this.handleSubmitNewWeek = this.handleSubmitNewWeek.bind(this);
    this.updateGoalLine = this.updateGoalLine.bind(this);
    this.deleteGoalLine = this.deleteGoalLine.bind(this);
    this.submitNewWeekGoal = this.submitNewWeekGoal.bind(this);
  }

  componentDidMount(){
    console.log("component mounted");
    var goals = this.props.board.goals;
    var newGoals = goals.map((goal, index) => {
      goal.id = index;
      goal.shortid = shortid.generate();
      return goal;
    })
    this.setState((prevState) =>({
      newWeek: {
        date: prevState.newGoalForm.date,
        goals_attributes: newGoals,
        percentage: 0
      },
      newGoalForm: {
        title: '',
        goalable_type: 'Week'
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
    this.setState((prevState) =>({
      newWeek: {
        date: prevState.newGoalForm.date,
        goals_attributes: goals_attributes,
        percentage: 0
      },
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

  updateGoalLine(goal, goalInput){
    // edit the goalLine with the same key?
  }

  deleteGoalLine(goal){
    var goalsAttributes = this.state.newWeek.goals_attributes;
    goalsAttributes.splice(goal.id, 1);
    var indexedGoals = goalsAttributes.map((goal, index) => {
      goal.id = index;
      return goal;
    })
    this.setState((prevState) =>({
      newWeek: {
        date: prevState.newWeek.date,
        goals_attributes: indexedGoals,
        percentage: prevState.newWeek.percentage
      },
      newGoalForm: {
        title: prevState.newGoalForm.title,
        goalable_type: 'Week'
      }
    }));
  }

  render(){
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
            <GoalLine goal={goal} key={goal.shortid} showCheckbox={true} updateGoal={self.updateGoalLine} deleteGoal={self.deleteGoalLine} />
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
        overlayClassName="weekPage-background"
        className="newWeekPage-container"
        style={{content: {overflow: 'scroll'}}}
        >
        <button className="weekPage-closeModal" onClick={this.handleCloseModal}>✕</button>

        <div className="weekPageContent-wrapper">
          <div className="goalsWrapper">
            {goalsToDisplay}
          </div>

          <div className="weekPageContent-goalsdata">
            <p className="weekPageContent-newgoallabel">New Goal</p>
            <form onSubmit={this.handleSubmitNewWeekGoal} className="boardPageContent-newGoalForm">
              <input type="text" name="newGoal" value={this.state.newGoalForm.title} onChange={this.handleNewGoalInputChange} className="boardPageContent-newGoalForm-title"/>
            </form>
            <p className="weekPageContent-numberofgoals">goals&nbsp;<strong>{numberOfGoals}</strong></p>
          </div>
        </div>
      </ReactModal>
    )
  }
}
export default NewWeekPage
