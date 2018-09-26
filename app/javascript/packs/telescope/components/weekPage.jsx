import React from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import WeekPageContent from './weekPageContent'

class WeekPage extends React.Component {
  constructor(){
    super();
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal(){
    this.props.history.goBack();
  }

  render(){
    var week = this.props.week;
    var content;
    if (week === undefined || week === null){
      content = <p>Loading...</p>;
    } else {
      content = <WeekPageContent week={week} />
    }
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
          {content}
        </ReactModal>
    )
  }
}
export default WeekPage
