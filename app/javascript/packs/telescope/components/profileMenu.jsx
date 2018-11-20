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

    if (!this.dropdownMenu.contains(event.target)) {

      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });

    }
  }

  render() {
    return (
      <div className="nabvar-profileMenu">
        <div className="navbar-username-box" onClick={this.showMenu}>
          <p className="navbar-username">@{this.props.username}</p>
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
                    <p className="navbar-profileMenuOptions">Settings</p>
                    <Link to={`/@${this.props.username}/welcome`}>
                      <p className="navbar-profileMenuOptions">Help</p>
                    </Link>

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
