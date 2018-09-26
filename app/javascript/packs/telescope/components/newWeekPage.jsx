import React from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';

class NewWeekPage extends React.Component {
  constructor(){
    super();
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal(){
    this.props.history.goBack();
  }

  render(){
    return(
      <ReactModal
           isOpen={true}
           contentLabel="onRequestClose Example"
           onRequestClose={this.handleCloseModal}
           shouldCloseOnOverlayClick={true}
           overlayClassName="weekPage-background"
           className="weekPage-container"
        >
          <button className="weekPage-closeModal" onClick={this.handleCloseModal}>✕</button>
          <p>Modal text!</p>
        </ReactModal>
    )
  }
}
export default NewWeekPage
