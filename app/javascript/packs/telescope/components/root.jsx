import React from 'react';
import Main from './main';
import Navbar from './navbar';
import axios from 'axios';
import ReactNotification from 'react-notifications-component';
import ReactModal from 'react-modal';

let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'

class Root extends React.Component {
  constructor () {
    super();
    this.state = {
      currentUser: { username: null },
      currentUserSnapshot: {
        username: null,
        weeks: [],
        boards: null
      }
    };

    this.fetchCurrentUserSnapshot = this.fetchCurrentUserSnapshot.bind(this);
    this.submitNewWeek = this.submitNewWeek.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.submitNewBoardGoal = this.submitNewBoardGoal.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);
    this.updateGoal = this.updateGoal.bind(this);
    this.deleteWeek = this.deleteWeek.bind(this);


    this.notificationDOMRef = React.createRef();
  }

  componentDidMount(){
    ReactModal.setAppElement('body');
  }

  fetchCurrentUserSnapshot(username) {
    axios.get( `/api/v1/users/${username}` )
        .then(response => {
          if(response.data){
            this.setState({ currentUserSnapshot: response.data, currentUser: { username: response.data.username } });
          } else if (response.data === null){
            this.setState({ currentUserSnapshot: undefined, currentUser: { username: undefined } });
          }
        })
        .catch(error => {
          this.setState({ currentUserSnapshot: undefined, currentUser: { username: undefined } });
          console.error(error);
        });
  }

  submitNewWeek(week) {
    var currentUserId = this.state.currentUserSnapshot.id;
    var currentUserUsername = this.state.currentUserSnapshot.username;
    week['user_id'] = currentUserId;
    var self = this;
    axios.post(`/api/v1/users/${currentUserId}/weeks`, {week: week})
    .then(function (response) {
      var errorString = '';
      if (response.status === 200 && response.data.status ==='error'){
        if (response.data.error_messages && response.data.error_messages.length > 0) {

          response.data.error_messages.forEach(function(errorMessage){
            errorString += errorMessage + ', ';
          })
        }
        self.addNotification('danger', 'Oops! Error while saving.', errorString.slice(0,-2) + '.');
      } else if (response.status === 200){
        self.addNotification('success', 'New week recorded!','Your new week was saved sucessfully.');
        self.props.history.goBack();
        self.fetchCurrentUserSnapshot(currentUserUsername);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  submitNewBoardGoal(newBoardGoal){
    var currentUserId = this.state.currentUserSnapshot.id;
    var self = this;
    axios.post(`/api/v1/users/${currentUserId}/boards/${newBoardGoal.goalable_id}/goals`, newBoardGoal)
    .then(function (response) {
      var currentUsername = self.state.currentUserSnapshot.username;
      self.fetchCurrentUserSnapshot(currentUsername);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateGoal(goal, newHtml){
    var currentUserId = this.state.currentUserSnapshot.id;
    var self = this;
    var goalType = goal.goalable_type;
    var cleanGoalType = goalType.toLowerCase() + 's';
    axios.put(`/api/v1/users/${currentUserId}/${cleanGoalType}/${goal.goalable_id}/goals/${goal.id}`, {title: newHtml})
    .then(function (response) {
      var currentUsername = self.state.currentUserSnapshot.username;
      self.fetchCurrentUserSnapshot(currentUsername);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  deleteGoal(goal) {
    var currentUserId = this.state.currentUserSnapshot.id;
    var self = this;
    var goalType = goal.goalable_type;
    var cleanGoalType = goalType.toLowerCase() + 's';
    axios.delete(`/api/v1/users/${currentUserId}/${cleanGoalType}/${goal.goalable_id}/goals/${goal.id}`)
    .then(function (response) {
      var currentUsername = self.state.currentUserSnapshot.username;
      self.fetchCurrentUserSnapshot(currentUsername);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  deleteWeek(week) {
    var currentUserId = this.state.currentUserSnapshot.id;
    var self = this;
    axios.delete(`/api/v1/users/${currentUserId}/weeks/${week.id}`)
    .then(function (response) {
      var currentUsername = self.state.currentUserSnapshot.username;
      self.fetchCurrentUserSnapshot(currentUsername);
      self.addNotification('default', 'Deletion complete!','Your week has been deleted successfully.');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  addNotification(type, title, message) {
    this.notificationDOMRef.current.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animated", "slow", "jackInTheBox"],
      animationOut: ["animated", "zoomOut"],
      dismiss: { duration: 6000 },
      dismissable: { click: true }
    });
  }

  render() {
    return(
      <div className="rootOuterWrapper">
        <div className="rootInnerWrapper">
          <Navbar currentUser={this.state.currentUser}/>
          <Main currentUserSnapshot={this.state.currentUserSnapshot}
            fetchCurrentUserSnapshot={this.fetchCurrentUserSnapshot}
            submitNewWeek={this.submitNewWeek}
            submitNewBoardGoal={this.submitNewBoardGoal}
            deleteGoal={this.deleteGoal}
            updateGoal ={this.updateGoal}
            deleteWeek={this.deleteWeek}
          />
        </div>
        <ReactNotification ref={this.notificationDOMRef} />
      </div>
    )
  }
}
export default Root
