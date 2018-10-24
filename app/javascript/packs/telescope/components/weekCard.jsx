import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class WeekCard extends React.Component {
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
    var percentage = this.props.weekObj.percentage;
    var hue = Math.round(((355 - (percentage/100)*210)).toString(10));
    var weekDate = moment(this.props.weekObj.date).format('ll');
    var color = ["hsla(",hue,",85%,65%, 1)"].join("");
    var backgroundOpacity = this.state.isHovered ? '0.4' : '0.25';
    var percentageClass = this.state.isHovered ? 'showPercentage' : '';
    return(
      <li className="weekCard-li" key={this.props.weekObj.id} >
        <Link className="weekCard-alink" to={`/@${this.props.username}/weeks/${this.props.weekObj.id}`} style={{border: '1px solid ' + color, backgroundColor: "hsla(" + hue + ",85%,70%, " + backgroundOpacity + ")"}} onMouseOver={this.handleOnMouseHover} onMouseLeave={this.handleOnMouseLeave} >
          <div className="weekCard-div">
            <p className="weekCard-weekOf">Week of</p>
            <p className="weekCard-date">{weekDate}</p>
            <p className={'weekCard-percentage ' + percentageClass }>{percentage + '%'}</p>
          </div>
        </Link>
      </li>
    )
  }
}
export default WeekCard
