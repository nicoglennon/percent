import React from 'react';

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
        <div onClick={this.showMenu}>
            <p className="navbar-wrap-box">@{this.props.username}</p>
        </div>

        {/* <a href="/logout" data-confirm="Are you sure?" data-method="delete" rel="nofollow">
          <p className="navbar-wrap-box">@{this.props.username}</p>
        </a> */}

        {
          this.state.showMenu
            ? (
              <div
                className="navbar-profileMenuContents"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <p className="navbar-profileMenuOptions">Profile Settings</p><br />
                <p className="navbar-profileMenuOptions">
                  <a href="/logout" data-confirm="Are you sure?" data-method="delete" rel="nofollow">
                    Logout
                  </a>
                </p>
              </div>
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
