import React from 'react';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html-react';

class GoalLine extends React.Component {
  constructor(){
    super();
    this.state = {
      isHovered: false,
      goalInput: '',
      isChecked: false
    }

    this.handleDeleteGoal = this.handleDeleteGoal.bind(this);
    this.handleHoverGoal = this.handleHoverGoal.bind(this);
    this.handleUnhoverGoal = this.handleUnhoverGoal.bind(this);
    this.handleGoalInputChange = this.handleGoalInputChange.bind(this);
    this.handleGoalInputBlur = this.handleGoalInputBlur.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
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

  handleGoalInputBlur(){
    var sanitizedGoal = this.sanitizeHtmlTwice(this.state.goalInput);
    if(sanitizedGoal === ''){
      this.setState({
        goalInput: this.props.goal.title
      })
    } else {
      if (sanitizedGoal !== this.props.goal.title){
        this.props.updateGoal(this.props.goal, sanitizedGoal)
      }
      this.setState({
        goalInput: sanitizedGoal,
      })
    }
  }

  handleKeyPress(e){
    // blur on pressing enter on the boardTitle
    if(e.charCode == 13) {
      e.preventDefault();
      e.target.blur();
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

  handleCheckboxChange(e){
    this.setState({
      isChecked: e.target.checked
    });
    if (this.props.updateCheckbox){
      this.props.updateCheckbox(this.props.goal, e.target.checked);
    }
  }

  render(){

    var goalLineWrapperStyling = '';
    var checkbox;
    var deleteGoalButton;
    if (this.props.showDeleteButton && this.state.isHovered === true) {
      deleteGoalButton = <span className="goalLine-deletebuttonspan" onClick={this.handleDeleteGoal}>✕</span>
    }

    if (this.props && this.props.showCheckbox) {
      checkbox = <input className="goalLineCheck" type="checkbox" checked={this.props.goal.completed} onChange={this.handleCheckboxChange} />
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
          onKeyPress={this.handleKeyPress}
          html={this.state.goalInput}
          disabled={this.props.disabled}

        />
        {deleteGoalButton}
      </div>
    )
  }
}
export default GoalLine
