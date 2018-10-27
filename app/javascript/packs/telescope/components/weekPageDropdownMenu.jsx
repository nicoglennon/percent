import React from 'react';

class WeekPageDropdownMenu extends React.Component {
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
      <div className="weekPageDropdownMenu-wrapper">
        <button className="weekPage-moreInfoModal" onClick={this.showMenu}>⋯</button>
        {
          this.state.showMenu
            ? (
              <div
                className="weekPageDropdownMenu-menuContents"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <p className="navbar-profileMenuOptions" onClick={this.props.deleteWeek}>Delete</p>
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

export default WeekPageDropdownMenu
