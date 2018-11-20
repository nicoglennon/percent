import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import ReactModal from 'react-modal';
import WelcomePageContent from './welcomePageContent';

class WelcomePage extends React.Component {
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
        className="welcomePage-container"
        style={{content: {overflow: 'scroll'}}}
        >
        <WelcomePageContent username={this.props.username} closeModal={this.handleCloseModal}/>
        {goBack}
      </ReactModal>
    )
  }
}
export default WelcomePage
