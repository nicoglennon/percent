import React from 'react';
import Telescope from '../assets/images/telescope-emoji.png';

class Navbar extends React.Component {
  render() {
    return(
      <div>
        <img src={Telescope} className="telescope-logo" />
        <h1>Navbar</h1>
      </div>
    )
  }
}
export default Navbar
