import React from 'react';
import Main from './main';
import Navbar from './navbar';
import axios from 'axios';


class Root extends React.Component {
  constructor () {
    super();
    this.state = {
      currentUser: { username: null },
      currentUserSnapshot: {
        username: null,
        weeks: []
      }
    };

    this.fetchCurrentUserSnapshot = this.fetchCurrentUserSnapshot.bind(this);
  }

  fetchCurrentUserSnapshot (username) {
    axios.get( `/api/v1/users/${username}` )
        .then(response => {
          console.log(response.data);
          this.setState({ currentUserSnapshot: response.data, currentUser: { username: response.data.username } });
        })
        .catch(error => {
          console.error(error);
        });
  }

  render() {
    return(
      <div>
        <Navbar currentUser={this.state.currentUser}/>
        <Main currentUser={this.state.currentUser}
              fetchCurrentUserSnapshot={this.fetchCurrentUserSnapshot}
              currentUserSnapshot={this.state.currentUserSnapshot}
        />
      </div>
    )
  }
}
export default Root
