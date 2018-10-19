import React from 'react';
import ContentEditable from 'react-contenteditable';

class GoalLine extends React.Component {
  constructor(){
    super();
    this.state = {
      isHovered: false,
      goalInput: ''
    }

    this.handleDeleteGoal = this.handleDeleteGoal.bind(this);
    this.handleHoverGoal = this.handleHoverGoal.bind(this);
    this.handleUnhoverGoal = this.handleUnhoverGoal.bind(this);
    this.handleGoalInputChange = this.handleGoalInputChange.bind(this);
    this.handleGoalInputBlur = this.handleGoalInputBlur.bind(this);
  }

  componentDidMount(){
    this.setState({
      goalInput: this.props.goal.title
    })
  }

  handleGoalInputChange(e){
    this.setState({
      goalInput: e.target.value
    })
  }

  handleGoalInputBlur(){
    console.log(this.props.goal.title);
    console.log(this.state.goalInput);

    if (this.state.goalInput !== this.props.goal.title){
      this.props.updateGoal(this.props.goal, this.state.goalInput)
    }
  }

  handleDeleteGoal() {
    this.props.deleteGoal(this.props.goal);
  }

  handleHoverGoal() {
    this.setState({
      isHovered: true
    })
  }

  handleUnhoverGoal() {
    this.setState({
      isHovered: false
    })
  }

  render(){

    var goalLineWrapperStyling = '';
    var checkbox;
    var deleteGoalButton;
    if (this.state.isHovered === true) {
      deleteGoalButton = <span className="goalLine-deletebuttonspan" onClick={this.handleDeleteGoal}>✕</span>
    }

    if (this.props && this.props.showCheckbox) {
      checkbox = <input className="goalLineCheck" type="checkbox" checked={this.props.goal.completed} />
      if (this.props && this.props.goal.completed) {
        goalLineWrapperStyling = ' goalLineWrapper-completed';
      }
    }
    return(
      <div className={'goalLineWrapper' + goalLineWrapperStyling} onMouseOver={this.handleHoverGoal} onMouseLeave={this.handleUnhoverGoal}>
        {checkbox}
        <ContentEditable
          className="goalLineInput"
          onChange={this.handleGoalInputChange}
          onBlur={this.handleGoalInputBlur}
          html={this.state.goalInput}
        />
        {deleteGoalButton}
      </div>
    )
  }
}
export default GoalLine
