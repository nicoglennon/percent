import React from 'react';
import Telescope from '../assets/images/telescope-emoji.png';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    var username = this.props.currentUser.username;
    var iconLink = username ? `/@${username}` : `/`;

    var topRight;
    if(username === null){
      topRight =  <div className="navbar-float-box">
                    <p>Loading...</p>
                  </div>

    } else if (username != undefined) {
      topRight = <div className="navbar-float-box"><Link to={`/@${username}`}><p className="navbar-wrap-box">@{this.props.currentUser.username}</p></Link></div>
    }
    return(
      <div className='navbar-wrapper'>
        <Link to={iconLink} className="navbar-telescope-logo-link">
          {/* <img src={Telescope} className="navbar-telescope-logo" /> */}
          <p className="navbar-telescope-logotitle">Telescope</p>

        </Link>
        &nbsp;
        {topRight}
      </div>
    )
  }
}
export default Navbar
