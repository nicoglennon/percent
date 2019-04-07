import React from 'react';

class FaqPageContent extends React.Component {

  render(){
    return(
      <div className="faqPageContent-wrapper">
        <div className="weekPage-buttonsWrapper">
          <button className="weekPage-closeModal" onClick={this.props.closeModal}>✕</button>
        </div>
        <h1>FAQs</h1>
        <div className="faqPageContent-questionWrapper">
          <h3 className="faqPageContent-questionTitle">What is Percent?</h3>
          <p className="faqPageContent-questionText">Percent is a powerful self-improvement system that requires minimal upkeep — you only have to check in with it once a week. The idea behind it is:</p>
          <ol className="faqPageContent-questionOl">
            <li>You create a master list of goals that you want to be accomplishing on a weekly basis.</li>
            <li>Once a week on Sundays, refer to this list and check off what you were able to accomplish that week (Demetri Martin does a good job at describing the general idea of it <a href='https://youtu.be/4qkkQIzQ4VI' target='_blank'>here</a>).</li>
            <li>The data collected each Sunday is parsed by Percent, and overarching trends & analytics are made available to you. The more weeks you record, the better your insights get!</li>
          </ol>
        </div>
        <div className="faqPageContent-questionWrapper">
          <h3 className="faqPageContent-questionTitle">Is Percent a to-do list, then?</h3>
          <p className="faqPageContent-questionText">Nope! Percent is not a to-do list — the goals that you use in Percent are meant to be things you want to repeat over and over every week, not things you want to do only once. Checking off a goal will not remove it from your goal list, but will simply mark is as completed for that week you're currently recording.</p>
          <p className="faqPageContent-questionText">For example, a good goal to use in Percent would be to organize your apartment. This is something you can do every week, and thus track over time. A bad goal to use in Percent would be to apply to graduate school, since you would do this only once.</p>
        </div>
        <div className="faqPageContent-questionWrapper">
          <h3 className="faqPageContent-questionTitle">How many goals should I have?</h3>
          <p className="faqPageContent-questionText">It depends on how fine-grained you want to be with your self-assesment. The more goals, the more robust and reliable your percentages will be. On average, users have about 10 weekly goals, although I recommend having over 20 to get the most out of Percent (I personally track 40 goals each week).</p>
        </div>
        <div className="faqPageContent-questionWrapper">
          <h3 className="faqPageContent-questionTitle">My goals aren't going away after I check them as completed. Why is that?</h3>
          <p className="faqPageContent-questionText">That's because they're not supposed to. Percent is not a to-do list, which means after you check a goal as completed for the week, it does not get removed from your goals list. Goals are the set of things you want to try to complete every week, so they will all be pulled in every time you're recording a week.</p>
          <p className="faqPageContent-questionText">If you want to stop tracking a specific goal or add new ones, you can always do so by adding, editing or removing the goal from the <strong>Set Goals</strong> page.</p>
        </div>
        <hr className="faqPageContent-hr"/>
        <br />
        <div className="faqPageContent-questionWrapper">
          <p className="faqPageContent-questionText">If you have any other questions, feel free to message me directly by clicking on the chat button on the bottom right corner of the screen!</p>
        </div>
      </div>
    )
  }
}
export default FaqPageContent
