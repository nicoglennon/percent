import React from 'react';
import BoardCard from './boardCard'
import { Link } from 'react-router-dom';


class BoardWrapper extends React.Component {

  render(){
    var boards = this.props.boards;
    var boardCard;
    if (boards === null) {
      boardCard = <p>Loading...</p>;
    } else if (boards && boards.length < 1) {
      boardCard = <p>No board yet!</p>;
    } else if(boards != undefined){
      var board = this.props.currentUser.boards[0];
      boardCard = <BoardCard board={board} username={this.props.currentUser.username}/>;
    } else {
      boardCard = <p>Error!</p>;
    }
    return (
      <div className="weekCardsWrapper-div">
        <p className="weekCardsWrapper-title">Board</p>
        <ul className="weekCardsWrapper-ul">
          {boardCard}
        </ul>
      </div>
    )
  }
}
export default BoardWrapper
