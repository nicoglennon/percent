import React from 'react';
import BoardCard from './boardCard';
import AnalyticsCard from './analyticsCard';
import { Trail } from 'react-spring';

class MainCardsWrapper extends React.Component {

  render(){
    var indexArray = [-1, -2]; // only way I could think of to render the BoardCard & AnalyticsCard components inside the spring (needs an array)
    return (
      <div className="userSnapshot-gridWrapper">
        <Trail
          items={indexArray} keys={index => index}
          from={{ transform: 'translate3d(0,25px,0)'}}
          to={{ transform: 'translate3d(0,0px,0)', transition: '.6s cubic-bezier(.2,.8,.2,1)'}}
          >
          {index => props => 
            index == -1
            ? 
            <BoardCard style={props} board={this.props.board} username={this.props.username} key={index} />
            :
            <AnalyticsCard style={props} weeks={this.props.weeks} username={this.props.username} key={index} />
          }
        </Trail>
      </div>
    )
  }
}
export default MainCardsWrapper
