import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import UserSnapshot from './userSnapshot';
import HeroPage from './heroPage';
import LoginPage from './loginPage';
import RegisterPage from './registerPage';
import NoMatch from './noMatch';

class Main extends React.Component {

  render() {
    return(
      <div>
        <Switch>
          <Route exact path="/" component={HeroPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route path="/@:username" render={(props) => <UserSnapshot {...props}
              fetchCurrentUserSnapshot={this.props.fetchCurrentUserSnapshot}
              submitNewWeek={this.props.submitNewWeek}
              submitNewBoardGoal={this.props.submitNewBoardGoal}
              deleteGoal={this.props.deleteGoal}
              updateGoal={this.props.updateGoal}
              deleteWeek={this.props.deleteWeek}
              currentUserSnapshot={this.props.currentUserSnapshot} />} />

          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}

export default Main
