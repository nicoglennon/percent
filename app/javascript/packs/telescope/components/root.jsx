import React from 'react';
import Main from './main';
import Navbar from './navbar';
import axios from 'axios';
import ReactNotification from 'react-notifications-component';

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


    this.notificationDOMRef = React.createRef();
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
    axios.post(`/api/v1/users/${currentUserId}/weeks`, week)
    .then(function (response) {
      console.log(response);
      var errorString = '';
      if (response.status === 200 && response.data.status ==='error'){
        if (response.data.error_messages && response.data.error_messages.length > 0) {

          response.data.error_messages.forEach(function(errorMessage){
            errorString += errorMessage + ', ';
          })
        }
        self.addNotification('danger', 'Oops!','We found the following errors before saving: ' + errorString.slice(0,-2) + '.');
      } else if (response.status === 200){
        self.addNotification('success', 'Success!','Your new week was saved.');
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
      console.log(response);
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
    console.log(cleanGoalType);
    axios.delete(`/api/v1/users/${currentUserId}/${cleanGoalType}/${goal.goalable_id}/goals/${goal.id}`)
    .then(function (response) {
      console.log(response);
      var currentUsername = self.state.currentUserSnapshot.username;
      self.fetchCurrentUserSnapshot(currentUsername);
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
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeInRight"],
      animationOut: ["animated", "fadeOutRight"],
      dismiss: { duration: 5000 },
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
          />
        </div>
        <ReactNotification ref={this.notificationDOMRef} />
      </div>
    )
  }
}
export default Root
