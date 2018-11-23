import React from 'react';
import { Link } from 'react-router-dom';
import EditSVG from '../assets/images/edit.svg';


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
        <Link className="cardWrapper-div goals-card" to={`/@${this.props.username}/goals`} >
          <div className="mainCard-div">
            <p className="mainCardsWrapper-title">GOALS</p>
            {/*<p className="mainCard-date">{this.props.board.title}</p>*/}
            <p className="mainCard-date">Set your Goals</p>
            <p>You have <strong>{goalNumber}</strong> goals to achieve every week.</p>
            <p className="card-button-text goals-button"><strong>EDIT</strong> <img src={EditSVG} className="GoalsCard-button-icon" /></p>
          </div>
        </Link>
    )
  }
}
export default BoardCard
