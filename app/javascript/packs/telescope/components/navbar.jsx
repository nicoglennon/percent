import React from 'react';
import Telescope from '../assets/images/telescope-emoji.png';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    var username = this.props.currentUser.username;
    var iconLink = username === null ? '/' : `/@${username}`;

    var topRight;
    if(username === null){
      topRight = <Link to='/login'><p className="navbar-username-box">Login</p></Link>
    } else if (username != undefined) {
      topRight = <Link to={`/@${username}`}><p className="navbar-username-box">@{this.props.currentUser.username}</p></Link>
    }
    return(
      <div className='navbar-wrapper'>
        <Link to={iconLink}>
          <img src={Telescope} className="navbar-telescope-logo" />
        </Link>
        &nbsp;
        {topRight}
      </div>
    )
  }
}
export default Navbar
