import React from 'react';
import GoalLine from './goalLine';
import NoGoals from '../assets/images/nogoals.gif';
import BoardPageTitle from './boardPageTitle';
import shortid from 'shortid';

class BoardPageContent extends React.Component {
  constructor(){
    super();
    this.state = {
      newGoal: {
        title: '',
        goalable_id: undefined,
        goalable_type: 'Board',
        completed: false,
      },
      goals_attributes: []
    }

    this.handleNewGoalInputChange = this.handleNewGoalInputChange.bind(this);
    this.handleSubmitNewBoardGoal = this.handleSubmitNewBoardGoal.bind(this);
    this.handleDeleteGoal = this.handleDeleteGoal.bind(this);
    this.clearNewBoardForm = this.clearNewBoardForm.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount(){
    console.log(this.state);
    this.setState((prevState) => ({
      newGoal: {
        goalable_id: this.props.board.id,
        title: prevState.newGoal.title,
        goalable_type: prevState.newGoal.goalable_type,
        completed: prevState.newGoal.completed,
      },
      goals_attributes: this.props.board.goals
    }))
  }

  componentDidUpdate(prevProps){
    if (prevProps.board.goals != this.props.board.goals) {
      this.setState({
        goals_attributes: this.props.board.goals
      })
    }
  }

  handleNewGoalInputChange(e){
    e.preventDefault();
    var newValue = e.target.value;
    this.setState((prevState)=>({
      newGoal: {
        title: newValue,
        goalable_id: prevState.newGoal.goalable_id,
        goalable_type: prevState.newGoal.goalable_type,
        completed: prevState.newGoal.completed,
      }
    }));
  }

  scrollToBottom() {
    this.bottomOfMessages.scrollIntoView({ behavior: 'smooth' });
  }

  handleSubmitNewBoardGoal(e) {
    e.preventDefault();
    if (this.state.title !== '' ) {
      var newGoal = this.state.newGoal;
      newGoal.shortid = shortid.generate();
      var newGoalsAttributes = this.state.goals_attributes;
      newGoalsAttributes.push(newGoal);
      this.setState({
        goals_attributes: newGoalsAttributes,
      });
      this.props.submitNewBoardGoal(newGoal);
      this.scrollToBottom();
      this.clearNewBoardForm();
    }
  }

  clearNewBoardForm(){
    this.setState((prevState) =>({
      newGoal: {
        title: '',
        goalable_id: this.props.board.id,
        goalable_type: prevState.newGoal.goalable_type,
        completed: prevState.newGoal.completed,
      }
    }));
  }

  handleDeleteGoal(deletedGoal){
    this.props.deleteGoal(deletedGoal);
    var newGoalsAttributes = this.state.goals_attributes.filter( goal => goal.shortid != deletedGoal.shortid);
    this.setState((prevState)=>({
      goals_attributes: newGoalsAttributes,
    }));
  }

  render(){
    var numberOfGoals = 0;
    var goalsToDisplay;
    var goalsInState = this.state.goals_attributes;
    if (goalsInState){
      numberOfGoals = goalsInState.length;
      var self = this;

      if (numberOfGoals === 0) {
        goalsToDisplay = <div className="boardPageContent-noGoalsDiv">
        <img className="boardPageContent-noGoalsImg" src={NoGoals} />
        <p className="boardPageContent-noGoalsText">No goals yet!<br />Add a new one above.</p>
        </div>

      } else {
        goalsToDisplay = goalsInState.map( function(goal){
          return(
            <GoalLine goal={goal} key={goal.shortid} showCheckbox={false} showDeleteButton={true} updateGoal={self.props.updateGoal} deleteGoal={self.handleDeleteGoal} disabled={false} />
          )
        })
      }
    }

    return(
      <div className="weekPageContent-wrapper">
        <div className="goalsWrapper">
          <div className="weekPageContent-newGoalFormWrapper">
            <form onSubmit={this.handleSubmitNewBoardGoal} className="boardPageContent-newGoalForm">
              <input type="text" name="newGoal" value={this.state.newGoal.title} placeholder="Add new goal" onChange={this.handleNewGoalInputChange} className="boardPageContent-newGoalForm-title"/>
              <button className="weekPage-addNewGoalButton" onClick={this.handleSubmitNewBoardGoal}>Add</button>
            </form>
          </div>
          {goalsToDisplay}
          <p className="weekPageContent-numberofgoals">goals&nbsp;<strong>{numberOfGoals}</strong></p>
          <div ref={el => { this.bottomOfMessages = el; }} />
        </div>
        <div className="weekPageContent-goalsdata">
          <BoardPageTitle title={this.props.board.title} editTitle={this.props.editBoardTitle}/>
        </div>
      </div>
    )
  }
}
export default BoardPageContent
