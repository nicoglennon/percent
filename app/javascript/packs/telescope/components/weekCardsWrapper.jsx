import React from 'react';
import WeekCard from './weekCard'
import { Link } from 'react-router-dom';
import BandSketch from '../assets/images/band.png';

import { Trail } from 'react-spring';


class WeekCardsWrapper extends React.Component {

  render(){
    var weeks = this.props.weekCards;
    var weekCards;
    if (weeks === null) {
      weekCards = <p>Loading...</p>;
    } else if (weeks && weeks.length < 1) {
      weekCards = <div className="weekCardsWrapper-noWeeksDiv">
                    <img className="weekCardsWrapper-noWeeksImage" src={BandSketch} />
                    <p>No weeks yet! Add a new one above.</p>
                  </div>;
    } else if(weeks != undefined){
      var username = this.props.currentUser.username;
      // weekCards = weeks.map(function(week){
      //                   return <WeekCard weekObj={week} key={week.id} username={username}/>;
      //                 });

      weekCards = <Trail
                    items={weeks} keys={week => week.id}
                    from={{ transform: 'translate3d(0,-30px,0)', display: 'inline-block' }}
                    to={{ transform: 'translate3d(0,0px,0)', display: 'inline-block' }}
                    >
                    {week => props =>
                      <div style={props}><WeekCard weekObj={week} key={week.id} username={username}/></div>
                    }
                  </Trail>

    } else {
      weekCards = <p>Error!</p>;
    }
    return (
      <div className="weekCardsWrapper-div">
        <p className="weekCardsWrapper-title">Weeks</p>
        <ul className="weekCardsWrapper-ul">
          {weekCards}
        </ul>
      </div>
    )
  }
}
export default WeekCardsWrapper
