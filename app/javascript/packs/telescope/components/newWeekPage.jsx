import React from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';

class NewWeekPage extends React.Component {
  constructor(){
    super();
    this.state = {};
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitNewWeek = this.handleSubmitNewWeek.bind(this);
  }

  handleCloseModal(){
    this.props.history.goBack();
  }

  handleInputChange(e){
    e.preventDefault();
    var target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  }

  handleSubmitNewWeek(e){
    e.preventDefault();
    this.props.submitNewWeek(this.state);
  }

  render(){
    return(
      <ReactModal
        isOpen={true}
        contentLabel="onRequestClose Example"
        onRequestClose={this.handleCloseModal}
        shouldCloseOnOverlayClick={true}
        overlayClassName="weekPage-background"
        className="newWeekPage-container">
        <button className="weekPage-closeModal" onClick={this.handleCloseModal}>✕</button>
        <form onSubmit={this.handleSubmitNewWeek} className="newWeekPage-form">
            <input type="text" name="date" placeholder="Date" onChange={this.handleInputChange} className="newWeekPage-form-date"/><br />
            <input type="text" name="percentage" placeholder="Percentage" onChange={this.handleInputChange} className="newWeekPage-form-percentage"/><br />
            <input type="submit" value="Save" className="newWeekPage-form-submit" />
        </form>
      </ReactModal>
    )
  }
}
export default NewWeekPage
