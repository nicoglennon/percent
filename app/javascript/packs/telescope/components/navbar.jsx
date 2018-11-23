import React from 'react';
import Telescope from '../assets/images/telescope-emoji.png';
import LogoSVG from '../assets/images/percent.svg';
import { Link } from 'react-router-dom';
import ProfileMenu from './profileMenu';

class Navbar extends React.Component {
  render() {
    var username = this.props.currentUser.username;
    var iconLink = username ? `/@${username}` : `/`;

    var topRight;
    if(username === null){
      topRight =  <div className="navbar-float-box">
                    <p className="navbar-wrap-box">...</p>
                  </div>

    } else if (username != undefined) {
      topRight = <div className="navbar-float-box">
                    <div className="navbar-weekLinkWrapper">
                      <Link className="navbar-newWeek-link"
                        to={`/@${this.props.currentUser.username}/weeks/new`}>
                        ＋ New Week
                      </Link>
                    </div>
                    <ProfileMenu username={this.props.currentUser.username} />
                  </div>
    }
    return(
      <div className='navbar-wrapper'>
        <a href={iconLink} className="navbar-telescope-logo-link">
          {/* <img src={Telescope} className="navbar-telescope-logo" /> */}

          <img src={LogoSVG} className="navbar-wrap-box navbar-logosvg" />
          {/*<p className="navbar-telescope-logotitle">Datascope</p>*/}
        </a>
        {topRight}
      </div>
    )
  }
}
export default Navbar
