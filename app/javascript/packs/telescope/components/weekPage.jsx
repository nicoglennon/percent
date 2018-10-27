import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import ReactModal from 'react-modal';
import WeekPageContent from './weekPageContent';
import WeekPageDropdownMenu from './weekPageDropdownMenu';


class WeekPage extends React.Component {
  constructor(){
    super();
    this.state = ({
      goBack: false
    })
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleDeleteWeek = this.handleDeleteWeek.bind(this);
  }

  handleCloseModal(){
    this.setState({
      goBack: true
    });
  }

  handleDeleteWeek(){
    this.handleCloseModal();
    this.props.deleteWeek(this.props.week);
  }

  render(){
    var week = this.props.week;
    var goBack = this.state.goBack ? <Redirect to={'/@' + this.props.username} /> : undefined;
    var content;
    var overlayColor = 'hsla(0,80%,65%, 0.85)';
    if (week === undefined || week === null){
      content = <p>Loading...</p>;
    } else {
      content = <WeekPageContent week={week} deleteGoal={this.props.deleteGoal} updateGoal={this.props.updateGoal} />
      var hue = Math.round(((345 - (week.percentage/100)*200)).toString(10));
      overlayColor = ["hsla(",hue,",80%,70%, 0.85)"].join("");
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
        <WeekPageDropdownMenu deleteWeek={this.handleDeleteWeek} />
        <button className="weekPage-closeModal" onClick={this.handleCloseModal}>✕</button>
        {content}
        {goBack}
      </ReactModal>
    )
  }
}
export default WeekPage
