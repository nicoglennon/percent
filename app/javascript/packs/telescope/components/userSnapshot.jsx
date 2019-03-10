import React from 'react';
import Spinner from '../assets/images/spinner.gif';
import WeekCardsWrapper from './weekCardsWrapper';
import MainCardsWrapper from './mainCardsWrapper';
import { Route, Switch } from 'react-router-dom';
import WeekPage from './weekPage';
import BoardPage from './boardPage';
import NewWeekPage from './newWeekPage';
import AnalyticsPage from './analyticsPage';
import WelcomePage from './welcomePage';
import SundayCard from './sundayCard';



import { Transition } from 'react-spring';


class UserSnapshot extends React.Component {

  componentDidMount(){
    this.props.fetchCurrentUserSnapshot(this.props.match.params.username);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      this.props.fetchCurrentUserSnapshot(this.props.match.params.username);
    }
  }

  render(){
    var displayUserInfo;
    var currentUserSnapshot = this.props.currentUserSnapshot;
    if (currentUserSnapshot === undefined){ // this means you're in the wrong username and server call failed
     displayUserInfo = <div className="userSnapshot-noAccessMessage">
                        <p>This page is not accesible to you.</p>
                        <a href="/">Back to Profile</a>

                      </div>
   } else if (currentUserSnapshot.username === null) {
     displayUserInfo =  <Transition
                          items={true}
                          from={{ opacity: 0, transform: 'translateY(10px)' }}
                          enter={{ opacity: 1, transform: 'translateY(0px)' }}>
                          {
                            show => props => <img className="userSnapshot-spinner" src={Spinner} style={props} />
                          }
                        </Transition>
   } else {
      var weeks = this.props.currentUserSnapshot.weeks;
      var boards = this.props.currentUserSnapshot.boards;
      var today = new Date();
      console.log(today.getDay());
      displayUserInfo =
                        <div>
                        <Transition
                          items={true}
                          from={{ opacity: 0, transform: 'translateY(10px)' }}
                          enter={{ opacity: 1, transform: 'translateY(0px)' }}>
                            {
                              show => show && (props => (
                                <div style={props}>
                                  { today.getDay() === 0 && <SundayCard username={currentUserSnapshot.username}/>}
                                  <MainCardsWrapper board={boards[0]} username={currentUserSnapshot.username} weeks={weeks}/>
                                  <WeekCardsWrapper currentUser={currentUserSnapshot} weekCards={weeks} />
                                </div>
                              )
                            )
                            }
                          </Transition>
                          <Switch>
                            <Route exact path="/@:username/weeks/new"
                              render={(props) => <NewWeekPage {...props}
                                                  currentUser={currentUserSnapshot}
                                                  board={currentUserSnapshot.boards[0]}
                                                  template={'template'}
                                                  submitNewWeek={this.props.submitNewWeek}
                                                  />}
                            />

                            <Route exact path="/@:username/weeks/:weekId"
                              render={(props) => <WeekPage {...props}
                                                  username={currentUserSnapshot.username}
                                                  week={weeks.filter(week => String(week.id) === props.match.params.weekId)[0]}
                                                  deleteGoal={this.props.deleteGoal}
                                                  updateGoal={this.props.updateGoal}
                                                  deleteWeek={this.props.deleteWeek}
                                                />}
                            />
                            <Route exact path="/@:username/goals"
                              render={(props) => <BoardPage {...props}
                                username={currentUserSnapshot.username}
                                board={currentUserSnapshot.boards[0]}
                                submitNewBoardGoal={this.props.submitNewBoardGoal}
                                deleteGoal={this.props.deleteGoal}
                                updateGoal ={this.props.updateGoal}
                                editBoardTitle={this.props.editBoardTitle}
                              />}
                            />
                            <Route exact path="/@:username/analytics"
                              render={(props) => <AnalyticsPage {...props}
                                username={currentUserSnapshot.username}
                                weeks={weeks}
                              />}
                            />
                            <Route exact path="/@:username/welcome"
                              render={(props) => <WelcomePage {...props}
                                username={currentUserSnapshot.username}
                              />}
                            />
                          </Switch>
                        </div>
    }
    return(
      <div>{displayUserInfo}</div>
    )
  }
}
export default UserSnapshot
