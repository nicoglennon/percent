import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class WeekCard extends React.Component {
  render(){
    var percentage = this.props.weekObj.percentage;
    var hue = Math.round(((355 - (percentage/100)*210)).toString(10));
    var weekDate = moment(this.props.weekObj.date).format('ll');
    var color = ["hsla(",hue,",85%,70%, 1)"].join("");
    return(
      <li className="weekCard-li" key={this.props.weekObj.id}>
        <Link className="weekCard-alink" to={`/@${this.props.username}/weeks/${this.props.weekObj.id}`} style={{border: '4px solid ' + color}} >
          <div className="weekCard-div">
            <p className="weekCard-weekOf">Week of</p>
            <p className="weekCard-date">{weekDate}</p>
            <p className="weekCard-percentage">{percentage + '%'}</p>
          </div>
        </Link>
      </li>
    )
  }
}
export default WeekCard
