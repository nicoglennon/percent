import React from 'react';
import { Route, Link } from 'react-router-dom';
import UserSnapshot from './userSnapshot';

class Main extends React.Component {

  render() {
    return(
      <div>
        <Route path="/@:username" render={(props) => <UserSnapshot {...props} fetchCurrentUserSnapshot={this.props.fetchCurrentUserSnapshot}
        submitNewWeek={this.props.submitNewWeek} currentUser={this.props.currentUser} currentUserSnapshot={this.props.currentUserSnapshot} />} />
      </div>
    )
  }
}

export default Main
