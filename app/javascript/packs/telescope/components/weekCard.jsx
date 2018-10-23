import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class WeekCard extends React.Component {
  render(){
    var color = "hsla(0,100%,70%, 1)";
    var percentage = this.props.weekObj.percentage;
    var hue=Math.round(((345 - (percentage/100)*200)).toString(10));
    var weekDate = moment(this.props.weekObj.date).format('ll');
    color = ["hsla(",hue,",100%,70%, 1)"].join("");
    return(
      <li className="weekCard-li" key={this.props.weekObj.id}>
        <Link className="weekCard-alink" to={`/@${this.props.username}/weeks/${this.props.weekObj.id}`} style={{backgroundColor: color}} >
          <div className="weekCard-div">
            <p className="weekCard-date">{weekDate}</p>
            <p className="weekCard-percentage">{percentage + '%'}</p>
          </div>
        </Link>
      </li>
    )
  }
}
export default WeekCard
