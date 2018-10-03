import React from 'react';

class GoalLine extends React.Component {
  render(){
    var goalLineWrapperStyling = '';
    console.log(this.props);
    if (this.props && this.props.goal.completed) {
      goalLineWrapperStyling = ' goalLineWrapper-completed';
    }
    return(
      <div className={'goalLineWrapper' + goalLineWrapperStyling} >
        {this.props.goal.title}&nbsp;&nbsp;
        <input className="goalLineInput" type="checkbox" checked={this.props.goal.completed} disabled />
      </div>
    )
  }
}
export default GoalLine
