import React from 'react';
import GoalLine from './goalLine';
import NoGoalsDog from '../assets/images/dog.jpg';
import BoardPageTitle from './boardPageTitle';
import shortid from 'shortid';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';

const StyledGoalsWrapper = styled.div``;

class BoardPageContent extends React.Component {
  constructor(){
    super();
    this.state = {
      newGoal: {
        title: '',
        goalable_id: undefined,
        goalable_type: 'Board',
        completed: false,
      },
      goals_attributes: [],
      categories: ['Personal', 'Work']
    }

    this.handleNewGoalInputChange = this.handleNewGoalInputChange.bind(this);
    this.handleSubmitNewBoardGoal = this.handleSubmitNewBoardGoal.bind(this);
    this.handleDeleteGoal = this.handleDeleteGoal.bind(this);
    this.clearNewBoardForm = this.clearNewBoardForm.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    // this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount(){
    this.setState((prevState) => ({
      newGoal: {
        goalable_id: this.props.board.id,
        title: prevState.newGoal.title,
        goalable_type: prevState.newGoal.goalable_type,
        completed: prevState.newGoal.completed,
      },
      goals_attributes: this.props.board.goals
    }))
  }

  componentDidUpdate(prevProps){
    if (prevProps.board.goals != this.props.board.goals) {
      this.setState({
        goals_attributes: this.props.board.goals
      })
    }
  }

  handleNewGoalInputChange(e){
    e.preventDefault();
    var newValue = e.target.value;
    this.setState((prevState)=>({
      newGoal: {
        title: newValue,
        goalable_id: prevState.newGoal.goalable_id,
        goalable_type: prevState.newGoal.goalable_type,
        completed: prevState.newGoal.completed,
      }
    }));
  }

  scrollToBottom() {
    this.bottomOfMessages.scrollIntoView({ behavior: 'smooth' });
  }

  handleSubmitNewBoardGoal(e) {
    e.preventDefault();
    if (this.state.newGoal.title !== '') {
      var newGoal = this.state.newGoal;
      newGoal.shortid = shortid.generate();
      var newGoalsAttributes = this.state.goals_attributes;
      newGoalsAttributes.push(newGoal);
      this.setState({
        goals_attributes: newGoalsAttributes,
      });
      this.props.submitNewBoardGoal(newGoal);
      this.scrollToBottom();
      this.clearNewBoardForm();
    }
  }

  clearNewBoardForm(){
    this.setState((prevState) =>({
      newGoal: {
        title: '',
        goalable_id: this.props.board.id,
        goalable_type: prevState.newGoal.goalable_type,
        completed: prevState.newGoal.completed,
      }
    }));
  }

  handleDeleteGoal(deletedGoal){
    this.props.deleteGoal(deletedGoal);
    var newGoalsAttributes = this.state.goals_attributes.filter( goal => goal.shortid != deletedGoal.shortid);
    this.setState((prevState)=>({
      goals_attributes: newGoalsAttributes,
    }));
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.index === source.index) {
      return;
    }
    this.props.reorderGoals(result)
  }

  render(){
    var numberOfGoals = 0;
    var goalsToDisplay;
    var categoriesArray = this.state.categories;
    var goalsInState = this.state.goals_attributes;
    if (goalsInState){
      numberOfGoals = goalsInState.length;
      var self = this;

      if (numberOfGoals === 0) {
        goalsToDisplay = <div className="boardPageContent-noGoalsDiv">
        <img className="boardPageContent-noGoalsImg" src={NoGoalsDog} />
        <p className="boardPageContent-noGoalsText">No goals yet!<br />Add a new one above.</p>
        </div>

      } else {
        goalsToDisplay = goalsInState.map( function(goal, index){
          return(
            <GoalLine goal={goal} 
              key={goal.shortid} 
              index={index}
              showCheckbox={false} 
              showDeleteButton={true} 
              updateGoal={self.props.updateGoal} 
              deleteGoal={self.handleDeleteGoal} 
              disabled={false} 
              category="Personal"
              categories={categoriesArray}
            />
          )
        })
      }
    }

    return(
      <div className="weekPageContent-wrapper">
        <div className="weekPageContent-goalsdata boardPageData">
          <div className="weekPage-buttonsWrapper">
            <button className="weekPage-closeModal" onClick={this.props.closeModal}>✕</button>
          </div>
          <BoardPageTitle title={this.props.board.title} editTitle={this.props.editBoardTitle}/>
          <div className="boardPageContent-goalInstructionsWrapper">
            <p className="boardPageContent-goalInstructionsText">Goals are things you want to <strong>repeatedly achieve every week</strong>, not things you want to do only once!</p>
            <p className="boardPageContent-goalInstructionsText">Categorize a goal by clicking on the <strong>gray circle</strong> to its left.</p>
            <p className="boardPageContent-goalInstructionsText">For best data analysis, keep <strong>at least 20 goals</strong> you want to track weekly.</p>
          </div>
        </div>
        <div className="goalsWrapper">
          <div className="weekPageContent-newGoalFormWrapper">
            <form onSubmit={this.handleSubmitNewBoardGoal} className="boardPageContent-newGoalForm">
              <input type="text" name="newGoal" value={this.state.newGoal.title} placeholder="Add new goal" onChange={this.handleNewGoalInputChange} className="boardPageContent-newGoalForm-title"/>
              <button className="weekPage-addNewGoalButton" onClick={this.handleSubmitNewBoardGoal}>Add</button>
            </form>
          </div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId={this.props.board.id.toString()}>
              {provided => (
                <StyledGoalsWrapper ref={provided.innerRef} {...provided.droppableProps}>
                  {goalsToDisplay}
                  {provided.placeholder}
                </StyledGoalsWrapper>
              )}
            </Droppable>
          </DragDropContext>
          { (numberOfGoals > 0) && <p className="weekPageContent-numberofgoals">goals&nbsp;<strong>{numberOfGoals}</strong></p>}
          <div ref={el => { this.bottomOfMessages = el; }} />
        </div>
      </div>
    )
  }
}
export default BoardPageContent
