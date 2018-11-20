import React from 'react';
import WelcomePageContentFirstPage from './welcomePageContentFirstPage';
import WelcomePageContentSecondPage from './welcomePageContentSecondPage';
import WelcomePageContentThirdPage from './welcomePageContentThirdPage';
import WelcomePageContentFourthPage from './welcomePageContentFourthPage';
import WelcomePageContentFifthPage from './welcomePageContentFifthPage';
import WelcomePageContentSixthPage from './welcomePageContentSixthPage';
import { Transition } from 'react-spring';

class WelcomePageContent extends React.Component {

  constructor(){
    super();
    this.state = {
      index: 0,
    }
    this.changeIndex = this.changeIndex.bind(this);
    this.handleIncreaseIndex = this.handleIncreaseIndex.bind(this);
    this.handleDecreaseIndex = this.handleDecreaseIndex.bind(this);
  }

  changeIndex(increase){
    this.setState((prevState) =>({
      index: prevState.index + increase,
    }))
  }

  handleIncreaseIndex(){
    this.changeIndex(1);
  }

  handleDecreaseIndex(){
    this.changeIndex(-1);
  }

  render(){
    var content;
    var buttonName;
    var buttonFunct = this.handleIncreaseIndex;
    var index = this.state.index;
    var style;
    switch (index) {
      case 0:
        content = <WelcomePageContentFirstPage username={this.props.username} />
        buttonName = 'Next';
        break;
      case 1:
        content = <WelcomePageContentSecondPage />
        buttonName = 'Next';
        break;
      case 2:
        content = <WelcomePageContentThirdPage />
        buttonName = 'Next';
        break;
      case 3:
        content = <WelcomePageContentFourthPage />
        buttonName = 'Next';
        break;
      case 4:
        content = <WelcomePageContentFifthPage />
        buttonName = 'Next';
        break;
      case 5:
        content = <WelcomePageContentSixthPage />
        buttonName = 'Get Started';
        buttonFunct = this.props.closeModal;
        style = {backgroundColor: "hsl(0, 0%, 20%)", color: "white"};
        break;
      default:
        content = <WelcomePageContentFirstPage username={this.props.username} />
        buttonName = 'Next';
        break;
    }

    return(
      <div className="welcomePageContent-wrapper">
        <div className="welcomePageContent-content">
          {content}
        </div>
        {index === 0 ? null : <p className="welcomePageContent-nextButton welcomePageContent-backButton" onClick={this.handleDecreaseIndex}>Back</p> }
        <p className="welcomePageContent-nextButton" onClick={buttonFunct} style={style}>{buttonName}</p>
        <p className="welcomePageContent-index">{this.state.index + 1}/6</p>
      </div>
    )
  }
}
export default WelcomePageContent
