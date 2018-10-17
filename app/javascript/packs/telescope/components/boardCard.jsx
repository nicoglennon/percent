import React from 'react';
import { Link } from 'react-router-dom';

class BoardCard extends React.Component {
  render(){
    return(
      <li className="weekCard-li" >
        <Link className="weekCard-alink boardCard" to={`/@${this.props.username}/board`} >
          <div className="weekCard-div">
            <p className="weekCard-date">{this.props.board.title}</p>
          </div>
        </Link>
      </li>
    )
  }
}
export default BoardCard
