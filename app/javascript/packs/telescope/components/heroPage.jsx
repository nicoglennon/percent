import React from 'react';

class HeroPage extends React.Component {
  render(){
    return(
      <div className="heropage-main">
        <div className="heropage-firstdiv">
          <div className="heropage-firstdiv-left">
            <h1 className="heropage-title">Break your simulation</h1>
            <p className="heropage-subheader">Stop reliving the same day over and over. Join <span className="heropage-subheader-telescope-span">Telescope</span> today to start tracking and improving your life each week.</p>
            <div>
              <form action="/signup" method="GET" className="heropage-form">
                <input type="email" name="email" placeholder="Enter your email address" className="heropage-form-input-email"></input>
                <input type="submit" name="submit" value="Get Started" className="heropage-form-input-submit"/>
              </form>
            </div>
            <p className="heropage-alreadymember">Already on Telescope? <a href="/login" className="heropage-alreadymember-login">Sign in</a>.</p>
          </div>
          <div className="heropage-firstdiv-right">
            {/* Image here? */}
          </div>
        </div>
      </div>
    )
  }
}
export default HeroPage
