import React from 'react';
import WelcomePageContentFirstPage from './welcomePageContentFirstPage';
import WelcomePageContentSecondPage from './welcomePageContentSecondPage';
import WelcomePageContentCategoryPage from './welcomePageContentCategoryPage';
import WelcomePageContentThirdPage from './welcomePageContentThirdPage';
import WelcomePageContentFourthPage from './welcomePageContentFourthPage';
import WelcomePageContentFifthPage from './welcomePageContentFifthPage';
import WelcomePageContentSixthPage from './welcomePageContentSixthPage';

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
    const pages = [
      <WelcomePageContentFirstPage username={this.props.username} />,
      <WelcomePageContentSecondPage />,
      <WelcomePageContentCategoryPage />,
      <WelcomePageContentThirdPage />,
      <WelcomePageContentFourthPage />,
      <WelcomePageContentFifthPage />,
      <WelcomePageContentSixthPage />
    ]
    switch (index) {
      case 6:
        buttonName = 'Get Started';
        buttonFunct = this.props.closeModal;
        style = {backgroundColor: "hsl(0, 0%, 20%)", color: "white"};
        break;
      default:
        buttonName = 'Next';
        break;
    }

    return(
      <div className="welcomePageContent-wrapper">
        <div className="welcomePageContent-content">
          {pages[index]}
        </div>
        <div className="welcomePageContent-buttons"> 
          {index === 0 ? <div /> : <p className="welcomePageContent-nextButton welcomePageContent-backButton" onClick={this.handleDecreaseIndex}>Back</p> }
          <p className="welcomePageContent-nextButton" onClick={buttonFunct} style={style}>{buttonName}</p>
        </div>
        <p className="welcomePageContent-index">{this.state.index + 1}/7</p>
      </div>
    )
  }
}
export default WelcomePageContent
