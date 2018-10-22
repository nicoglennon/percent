import React from 'react';
import { Link } from 'react-router-dom';

class WeekCard extends React.Component {
  render(){
    var color = "hsla(0,100%,50%, 1)";
    var percentage = this.props.weekObj.percentage;
    var hue=Math.round(((345 - (percentage/100)*200)).toString(10));
    color = ["hsla(",hue,",100%,75%, 1)"].join("");
    return(
      <li className="weekCard-li" key={this.props.weekObj.id}>
        <Link className="weekCard-alink" to={`/@${this.props.username}/weeks/${this.props.weekObj.id}`} style={{backgroundColor: color}} >
          <div className="weekCard-div">
            <p className="weekCard-date">{this.props.weekObj.date}</p>
            <p className="weekCard-percentage">{percentage}</p>
          </div>
        </Link>
      </li>
    )
  }
}
export default WeekCard
