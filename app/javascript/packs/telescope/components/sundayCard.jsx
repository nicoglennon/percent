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
    return(
      <div className="sunday-card-wrapper">
        <Link className="sunday-card-link" to={`/@${this.props.username}/weeks/new`} >
          <div className="sundayCard-div">
            {/*<p className="mainCard-date">{this.props.board.title}</p>*/}
            <p className="sunday-card-message">⏰ <strong>It's Sunday!</strong> Time to record this week →</p>
          </div>
        </Link>
        </div>
    )
  }
}
export default BoardCard
