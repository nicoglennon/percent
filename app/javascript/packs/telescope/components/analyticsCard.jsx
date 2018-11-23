import React from 'react';
import { Link } from 'react-router-dom';
import EyeSVG from '../assets/images/tv.svg';


class AnalyticsCard extends React.Component {
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
    var numberOfWeeks = this.props.weeks.length;
    return(
        <Link className="cardWrapper-div analytics-card" to={`/@${this.props.username}/analytics`} onMouseOver={this.handleOnMouseHover} onMouseLeave={this.handleOnMouseLeave}>
          <div className="mainCard-div">
            <p className="mainCardsWrapper-title">ANALYTICS</p>
            <p className="mainCard-date">View your Analytics</p>
            <p>You have <strong>{numberOfWeeks}</strong> weeks available for analysis.</p>
            <p className="card-button-text analytics-button"><strong>VIEW</strong> <img src={EyeSVG} className="GoalsCard-button-icon" /></p>
          </div>
        </Link>
    )
  }
}
export default AnalyticsCard
