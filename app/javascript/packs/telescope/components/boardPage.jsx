import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import ReactModal from 'react-modal';
import BoardPageContent from './boardPageContent'

class BoardPage extends React.Component {
  constructor(){
    super();
    this.state = ({
      goBack: false
    })
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal(){
    this.setState({
      goBack: true
    });
  }

  render(){
    var board = this.props.board;
    var goBack = this.state.goBack ? <Redirect to={'/@' + this.props.username} /> : undefined;
    var content;
    if (board === undefined || board === null){
      content = <p>Loading...</p>;
    } else {
      content = <BoardPageContent board={board} submitNewBoardGoal={this.props.submitNewBoardGoal} deleteGoal={this.props.deleteGoal} updateGoal ={this.props.updateGoal} />
    }
    return(
      <ReactModal
        isOpen={true}
        contentLabel="onRequestClose Example"
        onRequestClose={this.handleCloseModal}
        shouldCloseOnOverlayClick={true}
        overlayClassName="weekPage-background boardPage-background"
        className="weekPage-container boardPage-container"
        style={{content: {overflow: 'scroll'}}}
        >
        <button className="weekPage-closeModal" onClick={this.handleCloseModal}>✕</button>
        {content}
        {goBack}
      </ReactModal>
    )
  }
}
export default BoardPage
