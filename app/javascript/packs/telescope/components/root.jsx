import React from 'react';
import Main from './main';
import Navbar from './navbar';


class Root extends React.Component {
  render() {
    return(
      <div>
        <Navbar />
        <Main />
      </div>
    )
  }
}
export default Root
