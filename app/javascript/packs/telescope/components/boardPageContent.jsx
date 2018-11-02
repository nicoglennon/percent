import React from 'react';
import GoalLine from './goalLine';
import NoGoals from '../assets/images/nogoals.gif';
import BoardPageTitle from './boardPageTitle';

class BoardPageContent extends React.Component {
  constructor(){
    super();
    this.state = {
      title: '',
      goalable_id: undefined,
      goalable_type: 'Board',
      completed: false,
    }

    this.handleNewGoalInputChange = this.handleNewGoalInputChange.bind(this);
    this.handleSubmitNewBoardGoal = this.handleSubmitNewBoardGoal.bind(this);
    this.clearNewBoardForm = this.clearNewBoardForm.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount(){
    this.setState({
      goalable_id: this.props.board.id,
    })
  }

  handleNewGoalInputChange(e){
    e.preventDefault();
    this.setState({
      title: e.target.value,
    });
  }

  scrollToBottom() {
    this.bottomOfMessages.scrollIntoView({ behavior: 'smooth' });
  }

  handleSubmitNewBoardGoal(e) {
    e.preventDefault();
    if (this.state.title !== '' ) {
      this.props.submitNewBoardGoal(this.state);
      this.scrollToBottom();
      this.clearNewBoardForm();
    }
  }

  clearNewBoardForm(){
    this.setState({
        title: '',
      });
  }

  render(){
    var numberOfGoals = 0;
    var goalsToDisplay;
    if (this.props && this.props.board.goals){
      numberOfGoals = this.props.board.goals.length;
      var self = this;

      if (numberOfGoals === 0) {
        goalsToDisplay = <div className="boardPageContent-noGoalsDiv">
        <img className="boardPageContent-noGoalsImg" src={NoGoals} />
        <p className="boardPageContent-noGoalsText">No goals yet! <br />Add a new one above.</p>
        </div>

      } else {
        goalsToDisplay = this.props.board.goals.map( function(goal){
          return(
            <GoalLine goal={goal} key={goal.id} showCheckbox={false} showDeleteButton={true} updateGoal={self.props.updateGoal} deleteGoal={self.props.deleteGoal} disabled={false} />
          )
        })
      }
    }

    return(
      <div className="weekPageContent-wrapper">
        <div className="goalsWrapper">
          <div className="weekPageContent-newGoalFormWrapper">
            <form onSubmit={this.handleSubmitNewBoardGoal} className="boardPageContent-newGoalForm">
              <input type="text" name="newGoal" value={this.state.title} placeholder="Add new goal" onChange={this.handleNewGoalInputChange} className="boardPageContent-newGoalForm-title"/>
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
