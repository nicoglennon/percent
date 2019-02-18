import React from 'react';
import { Transition } from 'react-spring';

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
      <div className="weekPageDropdownMenu-wrapper">
        <button className="weekPage-moreInfoModal" onClick={this.showMenu}>⋯</button>
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
                    className="weekPageDropdownMenu-menuContents"
                    ref={(element) => {
                      this.dropdownMenu = element;
                    }}
                  >
                    <p className="navbar-profileMenuOptions" onClick={this.props.deleteWeek}>Delete Week</p>
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

export default WeekPageDropdownMenu
