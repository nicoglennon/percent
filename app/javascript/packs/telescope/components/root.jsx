import React from 'react';
import Main from './main';
import Navbar from './navbar';
import axios from 'axios';
import ReactNotification from 'react-notifications-component';
import sanitizeHtml from 'sanitize-html-react';
import {TwitterShareButton} from 'react-twitter-embed';
import moment from 'moment';

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
    this.editBoardTitle = this.editBoardTitle.bind(this);
    this.reorderGoals = this.reorderGoals.bind(this);
    this.updateBoardGoals = this.updateBoardGoals.bind(this);


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
        self.addNotification('success', 'Week recorded!',`You scored ${week.percentage}% for the week of ${moment(week.date).format('MMMM Do')}! 🐝`, week);
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
    newBoardGoal.title = this.sanitizeHtmlTwice(newBoardGoal.title);
    axios.post(`/api/v1/users/${currentUserId}/boards/${newBoardGoal.goalable_id}/goals`, newBoardGoal)
    .then(function (response) {
      var currentUsername = self.state.currentUserSnapshot.username;
      self.fetchCurrentUserSnapshot(currentUsername);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateGoal(goal, newHtml, goalCategory){
    var currentUserId = this.state.currentUserSnapshot.id;
    var self = this;
    var goalType = goal.goalable_type;
    var cleanGoalType = goalType.toLowerCase() + 's';
    axios.put(`/api/v1/users/${currentUserId}/${cleanGoalType}/${goal.goalable_id}/goals/${goal.shortid}`, {title: newHtml, category: goalCategory})
    .then(function (response) {
      var currentUsername = self.state.currentUserSnapshot.username;
      self.fetchCurrentUserSnapshot(currentUsername);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  reorderGoals(result){
    const { source, destination } = result;
    const board = this.state.currentUserSnapshot.boards[0];
    const goals = board.goals;
    let reorderedGoals = Array.from(goals);

    // check if order hasn't been set
    if(reorderedGoals[0].order === null) {
      reorderedGoals = reorderedGoals.map((goal, index) => ({...goal, order: index}));
    }
    const movedGoals = reorderedGoals.splice(source.index, 1)
    reorderedGoals.splice(destination.index, 0, movedGoals[0])

    // change order property of the goals
    reorderedGoals = reorderedGoals.map(goal => {
      if (goal.id === movedGoals[0].id) {
        return {...goal, order: destination.index};
      } else if (source.index < destination.index && goal.order >= source.index && goal.order <= destination.index) {
        return {...goal, order: goal.order - 1};
      }  else if (source.index > destination.index && goal.order <= source.index && goal.order >= destination.index) {
          return {...goal, order: goal.order + 1};
      } else {
        return goal;
      }
    });
    const newState = {
      ...this.state,
      currentUserSnapshot: {
        ...this.state.currentUserSnapshot,
        boards: {
          ...this.state.currentUserSnapshot.boards,
          [0]: {
            ...this.state.currentUserSnapshot.boards[0],
            goals: reorderedGoals,
          }
        }
      }
    }
    this.setState(newState);
    this.updateBoardGoals(board.id, reorderedGoals)
  }

  updateBoardGoals(boardId, goals){
    var currentUserId = this.state.currentUserSnapshot.id;
    const board = {
      goals_attributes: goals,
    }
    axios.put(`/api/v1/users/${currentUserId}/boards/${boardId}`, {board: board})
      .then(function (response) {
        // var currentUsername = self.state.currentUserSnapshot.username;
        // self.fetchCurrentUserSnapshot(currentUsername);
        // console.log(response);
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
    axios.delete(`/api/v1/users/${currentUserId}/${cleanGoalType}/${goal.goalable_id}/goals/${goal.shortid}`)
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
      self.addNotification('success', 'Deletion complete!',`The week of ${moment(week.date).format('MMMM Do')} was deleted successfully.`);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  addNotification(type, title, message, week = null) {
    if(week !== null){
      var twitterButton = <div className="tweetButton-notificationWrapper"><TwitterShareButton url="https://percent.me" options={{
        text: `I completed ${week.percentage}% of my goals for the week of ${moment(week.date).format('MMM Do')} 🌻`,
        via: 'percenthq',
        size: 'large',
      }} /></div>

      var customNotification = 
        <div className="notification-item notification-success notification-item-child">
          <div className="notification-content">
            <div className="notification-close">
              <span>×</span>
            </div>
            <h4 className="notification-title">{title}</h4>
            <p className="notification-message">{message}</p>
            {twitterButton}
          </div>
        </div>

      this.notificationDOMRef.current.addNotification({
        type: type,
        content: customNotification,
        insert: "bottom",
        container: "top-right",
        animationIn: ["animated", "slow", "jackInTheBox"],
        animationOut: ["animated", "zoomOut"],
        dismiss: { duration: 9000 },
        dismissable: { click: true }
      });
    } else {
      this.notificationDOMRef.current.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "bottom",
        container: "top-right",
        animationIn: ["animated", "slow", "jackInTheBox"],
        animationOut: ["animated", "zoomOut"],
        dismiss: { duration: 6000 },
        dismissable: { click: true }
      });
    } 
  }

  sanitizeHtmlTwice(html){
    var once = sanitizeHtml(html, {
      allowedTags: [],
      allowedAttributes: []
    });

    return sanitizeHtml(once, {
      allowedTags: [],
      allowedAttributes: []
    }).trim();
  }

  editBoardTitle(newTitle) {
    var currentUserId = this.state.currentUserSnapshot.id;
    var self = this;
    var boardId = this.state.currentUserSnapshot.boards[0].id;
    console.log(boardId);
    axios.put(`/api/v1/users/${currentUserId}/boards/${boardId}`, {title: newTitle})
    .then(function (response) {
      var currentUsername = self.state.currentUserSnapshot.username;
      self.fetchCurrentUserSnapshot(currentUsername);
    })
    .catch(function (error) {
      console.log(error);
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
            reorderGoals={this.reorderGoals}
            deleteWeek={this.deleteWeek}
            editBoardTitle={this.editBoardTitle}
          />
        </div>
        <ReactNotification ref={this.notificationDOMRef} />
      </div>
    )
  }
}
export default Root
