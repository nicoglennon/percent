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
    var overlayColor = 'hsla(0,100%,75%, 0.75)';
    if (week === undefined || week === null){
      content = <p>Loading...</p>;
    } else {
      content = <WeekPageContent week={week} deleteGoal={this.props.deleteGoal} updateGoal={this.props.updateGoal} />
      var hue = Math.round(((345 - (week.percentage/100)*200)).toString(10));
      overlayColor = ["hsla(",hue,",100%,75%, 0.75)"].join("");
    }
    return(

      <ReactModal
           isOpen={true}
           contentLabel="onRequestClose Example"
           onRequestClose={this.handleCloseModal}
           shouldCloseOnOverlayClick={true}
           overlayClassName="weekPage-background"
           className="weekPage-container"
           style={{content: {overflow: 'scroll'}, overlay: {backgroundColor: overlayColor, transition: 'background-color 500ms ease-out'}}}
        >
        <button className="weekPage-closeModal" onClick={this.handleCloseModal}>✕</button>
        {content}
      </ReactModal>
    )
  }
}
export default WeekPage
