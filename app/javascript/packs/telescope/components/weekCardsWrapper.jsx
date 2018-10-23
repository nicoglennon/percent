import React from 'react';
import WeekCard from './weekCard'
import { Link } from 'react-router-dom';


class WeekCardsWrapper extends React.Component {

  render(){
    var weeks = this.props.weekCards;
    var weekCards;
    if (weeks === null) {
      weekCards = <p>Loading...</p>;
    } else if (weeks && weeks.length < 1) {
      weekCards = <p>No cards yet!</p>;
    } else if(weeks != undefined){
      var username = this.props.currentUser.username;
      weekCards = weeks.map(function(week){
                        return <WeekCard weekObj={week} key={week.id} username={username}/>;
                      });
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
