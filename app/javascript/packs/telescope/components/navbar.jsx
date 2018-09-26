import React from 'react';
import Telescope from '../assets/images/telescope-emoji.png';

class Navbar extends React.Component {
  render() {
    return(
      <div className='navbar-wrapper'>
        <img src={Telescope} className="navbar-telescope-logo" />
        &nbsp;
        <p className="navbar-username-box">@{this.props.currentUser.username}</p>
      </div>
    )
  }
}
export default Navbar
