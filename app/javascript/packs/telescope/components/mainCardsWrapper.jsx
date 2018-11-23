import React from 'react';
import BoardCard from './boardCard';
import AnalyticsCard from './analyticsCard';

class MainCardsWrapper extends React.Component {

  render(){
    return (
      <div className="userSnapshot-gridWrapper">
        <BoardCard board={this.props.board} username={this.props.username}/>
        <AnalyticsCard weeks={this.props.weeks} username={this.props.username}/>
      </div>
    )
  }
}
export default MainCardsWrapper
