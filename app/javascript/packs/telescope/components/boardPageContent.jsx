import React from 'react';
import GoalLine from './goalLine';

class BoardPageContent extends React.Component {
  constructor(){
    super();
    this.state = {
      newGoalForm: {
        title: '',
        goalable_id: undefined,
        goalable_type: 'Board'
      }
    }

    this.handleNewGoalInputChange = this.handleNewGoalInputChange.bind(this);
    this.handleSubmitNewBoardGoal = this.handleSubmitNewBoardGoal.bind(this);
    this.clearNewBoardForm = this.clearNewBoardForm.bind(this);
  }

  handleNewGoalInputChange(e){
    e.preventDefault();
    var target = e.target;
    const value = target.value;
    this.setState((prevState, props) => ({
      newGoalForm: {
        title: value,
        goalable_id: props.board.id,
        goalable_type: prevState.newGoalForm.goalable_type
      }
    }));
  }

  handleSubmitNewBoardGoal(e) {
    e.preventDefault();
    if (this.state.newGoalForm.title !== '' ) {
      this.props.submitNewBoardGoal(this.state.newGoalForm);
      this.clearNewBoardForm();
    }
  }

  clearNewBoardForm(){
    this.setState((prevState) => ({
      newGoalForm: {
        title: '',
        goalable_id: prevState.newGoalForm.goalable_id,
        goalable_type: prevState.newGoalForm.goalable_type
      }
    }));
  }

  render(){
    var numberOfGoals = 0;
    var goalsToDisplay;
    if (this.props && this.props.board.goals){
      numberOfGoals = this.props.board.goals.length;
      var self = this;

      if (numberOfGoals === 0) {
        goalsToDisplay = <p>No goals yet.</p>
      } else {
        goalsToDisplay = this.props.board.goals.map( function(goal){
          return(
            <GoalLine goal={goal} key={goal.id} showCheckbox={false} updateGoal={self.props.updateGoal} deleteGoal={self.props.deleteGoal} />
          )
        })
      }
    }

    return(
      <div className="weekPageContent-wrapper">
        <h2 className="weekPageContent-date">{this.props.board.title}</h2>

        <div className="goalsWrapper">
          {goalsToDisplay}
        </div>

        <div className="weekPageContent-goalsdata">
          <p className="weekPageContent-newgoallabel">New Goal</p>
          <form onSubmit={this.handleSubmitNewBoardGoal} className="boardPageContent-newGoalForm">
            <input type="text" name="newGoal" value={this.state.newGoalForm.title} onChange={this.handleNewGoalInputChange} className="boardPageContent-newGoalForm-title"/>
          </form>
          <p className="weekPageContent-numberofgoals">goals&nbsp;<strong>{numberOfGoals}</strong></p>
        </div>
      </div>
    )
  }
}
export default BoardPageContent
