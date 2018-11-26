import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import ReactModal from 'react-modal';

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
    var goBack = this.state.goBack ? <Redirect to={'/@' + this.props.username} /> : undefined;
    return(
      <ReactModal
        isOpen={true}
        contentLabel="onRequestClose Example"
        onRequestClose={this.handleCloseModal}
        shouldCloseOnOverlayClick={true}
        overlayClassName="weekPage-background boardPage-background"
        className="weekPage-container"
        >
        Analytics or something
        {goBack}
      </ReactModal>
    )
  }
}
export default BoardPage
