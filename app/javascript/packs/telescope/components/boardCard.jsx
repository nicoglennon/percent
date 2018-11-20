import React from 'react';
import { Link } from 'react-router-dom';

class BoardCard extends React.Component {
  constructor(){
    super();
    this.state = {
      isHovered: false
    }

    this.handleOnMouseHover = this.handleOnMouseHover.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);

  }

  handleOnMouseHover(){
    this.setState({
      isHovered: true
    })
  }

  handleOnMouseLeave(){
    this.setState({
      isHovered: false
    })
  }

  render(){
    var goalsClass = this.state.isHovered ? 'showPercentage' : '';
    var goalNumber = this.props.board.goals.length;
    return(
      <li className="weekCard-li" >
        <Link className="weekCard-alink boardCard" to={`/@${this.props.username}/board`} onMouseOver={this.handleOnMouseHover} onMouseLeave={this.handleOnMouseLeave}>
          <div className="weekCard-div">
            <p className="weekCard-date">{this.props.board.title}</p>
            <p className={'weekCard-percentage ' + goalsClass }>{goalNumber}</p>
          </div>
        </Link>
      </li>
    )
  }
}
export default BoardCard
