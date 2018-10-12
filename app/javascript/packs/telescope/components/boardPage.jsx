import React from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';

class BoardPage extends React.Component {
  constructor(){
    super();
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal(){
    this.props.history.goBack();
  }

  render(){
    var boards = this.props.boards;
    var goals = [];
    if (boards && boards.length > 0) {
      var board = boards[0];
      board.goals.forEach(function(goal){
        goals.push(<p>{goal.title}</p>);
      });
    }
    return(
      <ReactModal
           isOpen={true}
           contentLabel="onRequestClose Example"
           onRequestClose={this.handleCloseModal}
           shouldCloseOnOverlayClick={true}
           overlayClassName="weekPage-background"
           className="weekPage-container"
           style={{content: {overflow: 'scroll'}}}
        >
          <div>
            {goals}
          </div>
        </ReactModal>
    )
  }
}
export default BoardPage
