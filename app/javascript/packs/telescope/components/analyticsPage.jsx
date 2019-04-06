import React from 'react';
import { Redirect } from 'react-router-dom';
import ReactModal from 'react-modal';
import AnalyticsPageContent from './analyticsPageContent';

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
    var content = <AnalyticsPageContent weeks={this.props.weeks} closeModal={this.handleCloseModal}/>
    return(
      <ReactModal
        isOpen={true}
        contentLabel="onRequestClose Example"
        onRequestClose={this.handleCloseModal}
        shouldCloseOnOverlayClick={true}
        overlayClassName="weekPage-background boardPage-background"
        className="weekPage-container analyticsPage-container"
        >
        {content}
        {goBack}
      </ReactModal>
    )
  }
}
export default BoardPage
