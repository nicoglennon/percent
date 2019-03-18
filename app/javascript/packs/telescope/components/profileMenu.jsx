import React from 'react';
import { Transition } from 'react-spring';
import UserSVG from '../assets/images/user.svg';
import { Link } from 'react-router-dom';

class ProfileMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    if(this.dropdownMenu === null){
      document.removeEventListener('click', this.closeMenu);
    }

    else if (!this.dropdownMenu.contains(event.target)) {

      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });

    }
  }

  render() {
    return (
      <div className="nabvar-profileMenu">
        <div className="navbar-username-box" onClick={this.showMenu}>
          {/* <p className="navbar-username">@{this.props.username}</p> */}
          <img src={UserSVG} className="navbar-usersvg" />
        </div>

        {/* <a href="/logout" data-confirm="Are you sure?" data-method="delete" rel="nofollow">
          <p className="navbar-wrap-box">@{this.props.username}</p>
        </a> */}

        {
          this.state.showMenu
            ? (
              <Transition
                items={this.state.showMenu}
                from={{ opacity: 0, transform: 'translateY(-10px)' }}
                enter={{ opacity: 1, transform: 'translateY(0px)' }}>
                { show => props =>
                  <div
                    style={props}
                    className="navbar-profileMenuContents"
                    ref={(element) => {
                      this.dropdownMenu = element;
                    }}
                  >
                    <p className="navbar-profileMenuUsername">@{this.props.username}</p>
                    <Link to={`/@${this.props.username}/welcome`}>
                      <p className="navbar-profileMenuOptions">Help</p>
                    </Link>
                    <a href="/settings" className="navbar-profileMenuOptionLink">
                      <p className="navbar-profileMenuOptions">Settings</p>
                    </a>
                    <a href="https://www.notion.so/nicoglennon/404ab2f97bf54e728cdbe8f552ca9ffc?v=3e5fe998eebd4524bc1babd185c71e86" className="navbar-profileMenuOptionLink" target="_blank">
                      <p className="navbar-profileMenuOptions">Roadmap</p>
                    </a>
                    <a href="/logout" data-method="delete" rel="nofollow" className="navbar-profileMenuOptionLink">
                      <p className="navbar-profileMenuOptions">
                        Logout
                      </p>
                    </a>
                  </div>
                }
              </Transition>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

export default ProfileMenu
