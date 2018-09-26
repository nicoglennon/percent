import React from 'react';
import { Link } from 'react-router-dom';

class WeekCard extends React.Component {
  render(){
    return(
      <li className="weekCard-li" key={this.props.weekObj.id}>
        <Link className="weekCard-alink" to={`/@${this.props.username}/weeks/${this.props.weekObj.id}`} >
          <div className="weekCard-div">
            <p className="weekCard-date">{this.props.weekObj.date}</p>
            <p className="weekCard-percentage">{this.props.weekObj.percentage}</p>
          </div>
        </Link>
      </li>
    )
  }
}
export default WeekCard
